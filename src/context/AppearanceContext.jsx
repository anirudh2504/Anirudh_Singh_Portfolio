import { useCallback, useEffect, useMemo, useState } from 'react'
import { STYLES } from '../data/styles'
import { AppearanceContext } from './appearance-context'

const DEFAULT_THEME = 'dark'
const DEFAULT_STYLE = 'glass'
const THEME_KEY = 'as-theme'
const STYLE_KEY = 'as-style'

function read(key) {
  try { return localStorage.getItem(key) } catch { return null }
}
function write(key, value) {
  try { localStorage.setItem(key, value) } catch { /* private mode etc. */ }
}
const isStyle = (id) => STYLES.some((s) => s.id === id)

export function AppearanceProvider({ children }) {
  const [theme, setThemeState] = useState(() => (read(THEME_KEY) === 'light' ? 'light' : DEFAULT_THEME))
  const [style, setStyleState] = useState(() => {
    const saved = read(STYLE_KEY)
    return isStyle(saved) ? saved : DEFAULT_STYLE
  })

  // Reflect state onto <html> so the CSS tokens switch.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    write(THEME_KEY, theme)
  }, [theme])

  useEffect(() => {
    if (style === DEFAULT_STYLE) document.documentElement.removeAttribute('data-style')
    else document.documentElement.setAttribute('data-style', style)
    write(STYLE_KEY, style)
  }, [style])

  const setTheme = useCallback((t) => setThemeState(t === 'light' ? 'light' : 'dark'), [])
  const toggleTheme = useCallback(() => setThemeState((t) => (t === 'dark' ? 'light' : 'dark')), [])
  const setStyle = useCallback((id) => setStyleState(isStyle(id) ? id : DEFAULT_STYLE), [])
  const stepStyle = useCallback((dir) => {
    setStyleState((current) => {
      const idx = STYLES.findIndex((s) => s.id === current)
      return STYLES[(idx + dir + STYLES.length) % STYLES.length].id
    })
  }, [])

  // Keyboard: [ ] cycle styles, T toggles theme.
  useEffect(() => {
    function onKey(e) {
      const tag = (e.target.tagName || '').toLowerCase()
      if (['input', 'textarea', 'select'].includes(tag) || e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key === '[') stepStyle(-1)
      else if (e.key === ']') stepStyle(1)
      else if (e.key === 't' || e.key === 'T') toggleTheme()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [stepStyle, toggleTheme])

  const value = useMemo(() => {
    const current = STYLES.find((s) => s.id === style)
    return { theme, style, styleName: current.name, styleNote: current.note, setTheme, toggleTheme, setStyle, stepStyle }
  }, [theme, style, setTheme, toggleTheme, setStyle, stepStyle])

  return <AppearanceContext.Provider value={value}>{children}</AppearanceContext.Provider>
}

