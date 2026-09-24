// POST /api/chat  →  { reply: string }
// Vercel serverless function. Also mounted by the Vite dev server (see vite.config.js)
// so `npm run dev` works without the Vercel CLI. Uses only Node's raw req/res API so
// the same handler runs in both places.
//
// Provider: set ANTHROPIC_API_KEY to use Claude, or GEMINI_API_KEY to use Gemini.
// If both are set, Claude wins unless AI_PROVIDER=gemini.
import Anthropic from '@anthropic-ai/sdk'
import { buildSystemPrompt } from './_knowledge.js'

// Flash-Lite answers in ~1-2s on the free tier; 3.8 Flash measured 17-34s per answer.
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite'
const CLAUDE_MODEL = process.env.ANTHROPIC_MODEL || 'claude-opus-5'

// Guard rails — keep quota and spend from being drained by one visitor.
const MAX_MESSAGES = 12          // history turns sent to the model
const MAX_MESSAGE_CHARS = 1000   // per message
const PER_IP_PER_MINUTE = 8
const PER_INSTANCE_PER_DAY = 600 // soft cap; serverless instances do not share memory
const REQUEST_TIMEOUT_MS = 25000

const SYSTEM_PROMPT = buildSystemPrompt() // built once per instance
const OFF_TOPIC_REPLY = "I can't help with that one. Try asking about Anirudh's work, projects or skills."

// ---- tiny in-memory rate limiter (best effort) -------------------------------
const perIp = new Map()
let dayKey = ''
let dayCount = 0

function rateLimited(ip) {
  const now = Date.now()
  const today = new Date(now).toISOString().slice(0, 10)
  if (today !== dayKey) { dayKey = today; dayCount = 0 }
  if (dayCount >= PER_INSTANCE_PER_DAY) return true

  const hits = (perIp.get(ip) || []).filter((t) => now - t < 60_000)
  if (hits.length >= PER_IP_PER_MINUTE) { perIp.set(ip, hits); return true }
  hits.push(now)
  perIp.set(ip, hits)
  if (perIp.size > 5000) perIp.clear() // never let the map grow unbounded
  dayCount += 1
  return false
}

// ---- helpers ------------------------------------------------------------------
class ChatError extends Error {
  constructor(status, message) { super(message); this.status = status }
}

function send(res, status, body) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(body))
}

async function readJson(req) {
  if (req.body !== undefined) {
    return typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  }
  let raw = ''
  for await (const chunk of req) {
    raw += chunk
    if (raw.length > 64_000) throw new Error('payload too large')
  }
  return raw ? JSON.parse(raw) : {}
}

function clientIp(req) {
  const fwd = req.headers['x-forwarded-for']
  return (Array.isArray(fwd) ? fwd[0] : fwd || '').split(',')[0].trim() || req.socket?.remoteAddress || 'unknown'
}

function sanitise(messages) {
  if (!Array.isArray(messages)) return null
  const clean = messages
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.text === 'string')
    .map((m) => ({ role: m.role, text: m.text.trim().slice(0, MAX_MESSAGE_CHARS) }))
    .filter((m) => m.text !== '')
    .slice(-MAX_MESSAGES)
  // Drop leading assistant turns: both APIs expect the conversation to start with the user.
  while (clean.length && clean[0].role !== 'user') clean.shift()
  if (clean.length === 0 || clean[clean.length - 1].role !== 'user') return null
  return clean
}

function pickProvider() {
  const forced = (process.env.AI_PROVIDER || '').toLowerCase()
  if (forced === 'gemini' && process.env.GEMINI_API_KEY) return 'gemini'
  if (forced === 'claude' && process.env.ANTHROPIC_API_KEY) return 'claude'
  if (process.env.ANTHROPIC_API_KEY) return 'claude'
  if (process.env.GEMINI_API_KEY) return 'gemini'
  return null
}

// ---- Claude -------------------------------------------------------------------
let anthropic = null
function claudeClient() {
  if (!anthropic) {
    anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY, timeout: REQUEST_TIMEOUT_MS, maxRetries: 1 })
  }
  return anthropic
}

// Server-side refusal fallback is supported on Claude Opus 5 / Claude Fable 5.1.
const supportsFallbacks = (model) => model === 'claude-opus-5' || model === 'claude-fable-5-1'

async function askClaude(messages) {
  const params = {
    model: CLAUDE_MODEL,
    max_tokens: 16000,
    // Short factual Q&A: low effort keeps latency and cost down.
    output_config: { effort: 'low' },
    // The system prompt is identical for every visitor, so cache it.
    system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
    messages: messages.map((m) => ({ role: m.role, content: m.text })),
  }

  let response
  try {
    response = supportsFallbacks(CLAUDE_MODEL)
      ? await claudeClient().beta.messages.create({
        ...params,
        betas: ['server-side-fallback-2026-07-01'],
        fallbacks: 'default',
      })
      : await claudeClient().messages.create(params)
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) throw new ChatError(429, 'The assistant is busy right now. Please try again in a minute.')
    if (err instanceof Anthropic.AuthenticationError) {
      console.error('Claude auth failed — check ANTHROPIC_API_KEY')
      throw new ChatError(500, 'Assistant is not configured correctly.')
    }
    if (err instanceof Anthropic.APIConnectionTimeoutError) throw new ChatError(504, 'The assistant took too long to reply. Please try again.')
    if (err instanceof Anthropic.APIError) {
      console.error('Claude error', err.status, err.message)
      throw new ChatError(502, 'The assistant could not answer right now. Please try again shortly.')
    }
    throw err
  }

  if (response.stop_reason === 'refusal') return { text: OFF_TOPIC_REPLY }
  const text = response.content.filter((b) => b.type === 'text').map((b) => b.text).join('').trim()
  return { text, truncated: response.stop_reason === 'max_tokens' }
}

// ---- Gemini -------------------------------------------------------------------
async function askGemini(messages) {
  const payload = {
    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: messages.map((m) => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.text }] })),
    // maxOutputTokens includes any thinking tokens, so leave headroom beyond the short reply.
    generationConfig: { temperature: 0.4, maxOutputTokens: 1024 },
  }

  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), REQUEST_TIMEOUT_MS)
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': process.env.GEMINI_API_KEY },
      body: JSON.stringify(payload),
      signal: ctrl.signal,
    })
    if (r.status === 429) throw new ChatError(429, 'The assistant is busy right now. Please try again in a minute.')
    if (!r.ok) {
      const detail = await r.text().catch(() => '')
      console.error('Gemini error', r.status, detail.slice(0, 500))
      throw new ChatError(502, 'The assistant could not answer right now. Please try again shortly.')
    }
    const data = await r.json()
    const cand = data?.candidates?.[0]
    if (data?.promptFeedback?.blockReason) return { text: OFF_TOPIC_REPLY }
    const text = (cand?.content?.parts || []).map((p) => p.text || '').join('').trim()
    return { text, truncated: cand?.finishReason === 'MAX_TOKENS' }
  } catch (err) {
    if (err?.name === 'AbortError') throw new ChatError(504, 'The assistant took too long to reply. Please try again.')
    throw err
  } finally {
    clearTimeout(timer)
  }
}

// ---- handler ------------------------------------------------------------------
export default async function handler(req, res) {
  // Status probe for the widget: tells the robot whether to show "no API key".
  if (req.method === 'GET') return send(res, 200, { configured: pickProvider() !== null })

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST')
    return send(res, 405, { error: 'Method not allowed' })
  }

  if (rateLimited(clientIp(req))) {
    return send(res, 429, { error: 'Too many questions in a short time. Please wait a minute and try again.' })
  }

  let body
  try { body = await readJson(req) } catch { return send(res, 400, { error: 'Invalid JSON body.' }) }

  const messages = sanitise(body.messages)
  if (!messages) return send(res, 400, { error: 'Send { messages: [{ role: "user" | "assistant", text }] } ending with a user message.' })

  const provider = pickProvider()
  if (!provider) return send(res, 500, { error: 'Assistant is not configured (set ANTHROPIC_API_KEY or GEMINI_API_KEY).' })

  try {
    const { text, truncated } = provider === 'claude' ? await askClaude(messages) : await askGemini(messages)
    return send(res, 200, { reply: text || OFF_TOPIC_REPLY, truncated: Boolean(truncated) })
  } catch (err) {
    if (err instanceof ChatError) return send(res, err.status, { error: err.message })
    console.error('chat handler failed', err)
    return send(res, 500, { error: 'Something went wrong. Please try again.' })
  }
}
