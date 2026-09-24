import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Serves /api/* from the same files Vercel deploys as serverless functions, so
// `npm run dev` works without the Vercel CLI. Only GEMINI_*, ANTHROPIC_* and AI_PROVIDER vars are copied into
// process.env; nothing here is exposed to the browser bundle.
function localApi(mode) {
  return {
    name: 'local-api',
    configureServer(server) {
      const env = loadEnv(mode, process.cwd(), '')
      for (const k of Object.keys(env)) if (/^(GEMINI_|ANTHROPIC_|AI_PROVIDER$)/.test(k) && !(k in process.env)) process.env[k] = env[k]
      server.middlewares.use('/api/chat', async (req, res) => {
        try {
          const mod = await server.ssrLoadModule('/api/chat.js')
          await mod.default(req, res)
        } catch (err) {
          server.config.logger.error(String(err?.stack || err))
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Local API error — see the terminal.' }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), localApi(mode)],
  // For GitHub Pages under a repo path, set base: '/<repo-name>/'
  base: '/',
}))
