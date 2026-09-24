import { useCallback, useEffect, useRef, useState } from 'react'
import { assistant, starterQuestions } from '../data/bio'
import { CloseIcon, SendIcon, TrashIcon } from './Icons'
import Robot from './Robot'

const STORAGE_KEY = 'as-chat'
const CLOSE_MS = 280 // keep in sync with the chat-out animation in global.css
const GULP_MS = 450  // robot bounce after it swallows the panel
const MAX_STORED = 30

function loadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.slice(-MAX_STORED) : []
  } catch { return [] }
}
function saveHistory(messages) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_STORED))) } catch { /* private mode etc. */ }
}

// Plain-text reply → paragraphs and "- " bullets. No markdown parser needed.
function Reply({ text }) {
  const blocks = []
  let bullets = []
  const flush = () => { if (bullets.length) { blocks.push(<ul key={blocks.length}>{bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>); bullets = [] } }
  text.split('\n').forEach((line) => {
    const t = line.trim()
    if (!t) return flush()
    if (/^[-•*]\s+/.test(t)) bullets.push(t.replace(/^[-•*]\s+/, ''))
    else { flush(); blocks.push(<p key={blocks.length}>{t}</p>) }
  })
  flush()
  return blocks
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState(loadHistory)
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  // null = still checking, true = key configured, false = no key / API unreachable
  const [online, setOnline] = useState(null)
  const [hint, setHint] = useState(false)
  const logRef = useRef(null)
  const inputRef = useRef(null)
  const panelRef = useRef(null)
  const rootRef = useRef(null)
  const [closing, setClosing] = useState(false)
  const [gulp, setGulp] = useState(false)
  const timers = useRef([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  // Close with the "fly back into the robot" animation, then hide the panel.
  const close = useCallback(() => {
    if (!open || closing) return
    setClosing(true)
    timers.current.push(setTimeout(() => {
      setOpen(false)
      setClosing(false)
      setGulp(true)
      timers.current.push(setTimeout(() => setGulp(false), GULP_MS))
    }, CLOSE_MS))
  }, [open, closing])

  // Any click or tap outside the widget sends the chat back into the robot.
  useEffect(() => {
    if (!open) return undefined
    const onPointerDown = (e) => { if (rootRef.current && !rootRef.current.contains(e.target)) close() }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open, close])

  useEffect(() => { saveHistory(messages) }, [messages])

  // Ask the server whether an AI key is configured. Anything but a clear "yes"
  // (error, static hosting without functions) counts as offline.
  useEffect(() => {
    let cancelled = false
    fetch('/api/chat', { method: 'GET', headers: { Accept: 'application/json' } })
      .then((r) => (r.ok ? r.json() : { configured: false }))
      .then((d) => { if (!cancelled) setOnline(Boolean(d?.configured)) })
      .catch(() => { if (!cancelled) setOnline(false) })
    return () => { cancelled = true }
  }, [])

  // Greet once per visit with a speech bubble, then tuck it away.
  useEffect(() => {
    if (online !== true || open) return undefined
    let seen = false
    try { seen = sessionStorage.getItem('as-chat-hint') === '1' } catch { /* ignore */ }
    if (seen) return undefined
    const show = setTimeout(() => setHint(true), 1200)
    const hide = setTimeout(() => {
      setHint(false)
      try { sessionStorage.setItem('as-chat-hint', '1') } catch { /* ignore */ }
    }, 7200)
    return () => { clearTimeout(show); clearTimeout(hide) }
  }, [online, open])

  // Keep the newest message in view.
  useEffect(() => {
    if (open && logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [messages, busy, open])

  // Focus the input when opened; close on Escape.
  useEffect(() => {
    if (!open) return undefined
    inputRef.current?.focus()
    const onKey = (e) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, close])

  async function ask(question) {
    const text = question.trim()
    if (!text || busy || online === false) return
    const history = [...messages, { role: 'user', text }]
    setMessages(history)
    setInput('')
    setBusy(true)
    try {
      const r = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history.filter((m) => !m.error).slice(-12) }),
      })
      const data = await r.json().catch(() => ({}))
      if (r.status === 500 && /not configured/i.test(data.error || '')) setOnline(false)
      if (!r.ok) throw new Error(data.error || 'Something went wrong. Please try again.')
      setMessages((m) => [...m, { role: 'assistant', text: data.reply }])
    } catch (err) {
      setMessages((m) => [...m, { role: 'assistant', text: err.message || 'Something went wrong. Please try again.', error: true }])
    } finally {
      setBusy(false)
      inputRef.current?.focus()
    }
  }

  const onSubmit = (e) => { e.preventDefault(); ask(input) }
  const offline = online === false
  const mood = offline ? 'offline' : busy ? 'busy' : open ? 'open' : 'idle'
  const toggle = () => {
    setHint(false)
    if (open) close()
    else setOpen(true)
  }
  const clear = () => { setMessages([]); inputRef.current?.focus() }

  return (
    <div className="chat" ref={rootRef}>
      <div className={`chat-panel panel${closing ? ' is-closing' : ''}`} id="chat-panel" ref={panelRef} hidden={!open} role="dialog" aria-label={assistant.name}>
        <div className="chat-head">
          <div>
            <h3>{assistant.name}</h3>
            <span className={`sub${offline ? ' sub--offline' : ''}`}>
              {offline ? 'Offline · no API key configured' : 'AI assistant · answers from this site'}
            </span>
          </div>
          <div className="chat-head-actions">
            {messages.length > 0 && (
              <button type="button" className="icon-btn" onClick={clear} aria-label="Clear conversation" title="Clear conversation"><TrashIcon /></button>
            )}
            <button type="button" className="icon-btn" onClick={close} aria-label="Close chat"><CloseIcon /></button>
          </div>
        </div>

        <div className="chat-log" ref={logRef} aria-live="polite">
          <div className="msg bot"><p>{assistant.greeting}</p></div>
          {offline && (
            <div className="msg bot error" role="status">
              <p>I&apos;m offline right now because no AI API key is configured. You can still reach Anirudh by email or WhatsApp from the Contact section.</p>
            </div>
          )}
          {messages.length === 0 && !offline && (
            <div className="chat-sugg" aria-label="Suggested questions">
              {starterQuestions.map((q) => (
                <button type="button" key={q} onClick={() => ask(q)}>{q}</button>
              ))}
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`msg ${m.role === 'user' ? 'user' : 'bot'}${m.error ? ' error' : ''}`}>
              {m.role === 'user' ? <p>{m.text}</p> : <Reply text={m.text} />}
            </div>
          ))}
          {busy && <div className="msg bot typing" aria-label="Assistant is typing"><span /><span /><span /></div>}
        </div>

        <form className="chat-form" onSubmit={onSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={offline ? 'Assistant offline — no API key' : 'Ask about Anirudh…'}
            maxLength={1000}
            autoComplete="off"
            aria-label="Your question"
            disabled={busy || offline}
          />
          <button type="submit" className="btn primary chat-send" aria-label="Send" disabled={busy || offline || !input.trim()}><SendIcon /></button>
        </form>
        <p className="chat-foot">{assistant.footnote}</p>
      </div>

      <div className="robot-dock">
        {offline && !open && (
          <span className="robot-bubble robot-bubble--alert" role="status">NO API KEY currently</span>
        )}
        {!offline && hint && !open && (
          <span className="robot-bubble">Hi! Ask me about Anirudh 👋</span>
        )}
        <button
          type="button" className={`robot-btn${gulp ? ' is-gulping' : ''}`} id="chat-toggle"
          aria-expanded={open} aria-controls="chat-panel" onClick={toggle}
          aria-label={offline ? 'AI assistant (offline: no API key configured)' : open ? 'Close AI assistant' : 'Open AI assistant'}
          title={offline ? 'AI assistant offline: no API key configured' : 'Ask me about Anirudh'}
        >
          <Robot mood={mood} />
        </button>
      </div>
    </div>
  )
}
