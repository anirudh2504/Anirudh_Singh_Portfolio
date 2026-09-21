# Anirudh Singh — Portfolio

Static portfolio site (plain HTML / CSS / JS, no build step) with a switchable UI style and a dark/light theme.

## Run it

Open `index.html` directly, or serve the folder:

```bash
npx serve .
```

## Structure

```
index.html        page content (edit your details here)
css/tokens.css    design tokens — one block per UI style, dark + light each
css/styles.css    layout, components, and per-style structural overrides
js/main.js        theme toggle, style switcher, mobile menu, active nav
assets/           résumé PDF
```

## Appearance

- **Theme:** dark by default. Toggle with the sun/moon button, the Appearance panel, or press `T`.
- **UI style:** the "Change UI" button (bottom-right) opens a panel with ten styles. Press `[` / `]` to cycle.
  Glassmorphism (default) · Neumorphism · Liquid Glass · Spatial UI · Bento Grid · Claymorphism · Skeuomorphism · Minimalism · Maximalism · Brutalism
- Choices are remembered in `localStorage`.

## Customising

Every surface reads from the CSS custom properties in `css/tokens.css`. To retune a style, edit its `:root[data-style="…"]` block (dark) and `:root[data-theme="light"][data-style="…"]` block (light). To add a style, copy one of those pairs and add a button in the Appearance panel in `index.html` plus its name/note in `js/main.js`.

## Deploy

Any static host works: GitHub Pages, Netlify, Vercel, Cloudflare Pages. Push the folder and point the host at the root.
