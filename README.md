# Anirudh Singh — Portfolio

Personal portfolio built with **React 18 + Vite**. Ten switchable UI styles, dark theme by default with a light mode, no UI library — every surface is driven by CSS custom properties.

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the build locally
npm run lint      # eslint
```

## Project structure

```
index.html                     Vite entry (fonts, meta, no-flash theme script)
public/
  favicon.svg
  Resume_Anirudh_Singh.pdf     linked from the "Download résumé" buttons
src/
  main.jsx                     mounts <App> inside <AppearanceProvider>
  App.jsx                      page layout: sections in order
  data/
    profile.js                 ALL content — name, links, experience, projects, skills…
    styles.js                  the ten UI styles (id, name, note)
  context/
    appearance-context.js      React context object
    AppearanceContext.jsx      provider: theme + style state, localStorage, keyboard shortcuts
  hooks/
    useAppearance.js           hook to read/change theme + style from any component
  components/
    Header.jsx                 sticky nav, theme toggle, mobile menu, active-section highlight
    Hero.jsx                   headline, CTAs, socials, profile.json card
    StyleDock.jsx              floating "Change UI" panel (theme segment + 10 style buttons)
    Backdrop.jsx               wallpaper + colour blobs (shown/hidden per style)
    Footer.jsx
    Icons.jsx                  inline SVG icons
    sections/                  About, Experience, Projects, Skills, Education, Contact
    ui/                        SectionHead, Tags, TimelineRow
  styles/
    tokens.css                 design tokens: one block per style, dark + light each
    global.css                 layout, components, per-style structural overrides
```

## Editing content

Everything on the page comes from `src/data/profile.js`. Change text, add a project or a job there — no component edits needed.

## Appearance

- **Theme:** dark by default. Toggle with the header button, the Appearance panel, or press `T`.
- **UI style:** "Change UI" (bottom-right) opens the panel; press `[` / `]` to cycle.
  Glassmorphism (default) · Neumorphism · Liquid Glass · Spatial UI · Bento Grid · Claymorphism · Skeuomorphism · Minimalism · Maximalism · Brutalism
- Both choices persist in `localStorage` and are applied before first paint (see the inline script in `index.html`).

### Adding a style

1. Add a dark block `:root[data-style="myStyle"] { … }` and a light block `:root[data-theme="light"][data-style="myStyle"] { … }` in `src/styles/tokens.css` (copy an existing pair).
2. Add `{ id: 'myStyle', name: '…', note: '…' }` to `src/data/styles.js`.
3. Add a `.sw-myStyle` swatch rule in `src/styles/global.css` for the panel button.

## Deploy

Any static host works (Vercel, Netlify, Cloudflare Pages, GitHub Pages). Build output is `dist/`.
For GitHub Pages under a repository path, set `base: '/<repo-name>/'` in `vite.config.js`.

## AI assistant ("Ask me" widget)

A floating chat on the right that answers questions about Anirudh using the content of this site. It runs on Google Gemini's free tier, or on Claude if `ANTHROPIC_API_KEY` is set.

```
api/
  chat.js          Vercel serverless function — POST /api/chat, calls Gemini, rate-limited
  _knowledge.js    builds the system prompt from src/data/profile.js + src/data/bio.js
src/data/bio.js    extra facts (location, notice period, strengths…) + starter questions
src/components/ChatWidget.jsx
```

Setup:

1. Create a free key at https://aistudio.google.com/apikey
2. Local: copy `.env.example` to `.env` and paste the key. `npm run dev` serves `/api/chat` too.
3. Vercel: Project → Settings → Environment Variables → add `GEMINI_API_KEY` or `ANTHROPIC_API_KEY` (optional: `GEMINI_MODEL`, `ANTHROPIC_MODEL`, `AI_PROVIDER`), then redeploy.
4. Fill in the `TODO` fields in `src/data/bio.js`. Anything still marked `TODO` is simply unknown to the assistant.

The key is read only on the server; it is never shipped to the browser.
