import { useEffect, useRef, useState } from 'react'
import { STYLES } from '../data/styles'
import { useAppearance } from '../hooks/useAppearance'
import { MoonIcon, PaletteIcon, SunIcon } from './Icons'

// Floating "Change UI" control: theme segment + one button per UI style.
export default function StyleDock() {
  const { theme, setTheme, style, setStyle, styleNote } = useAppearance()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return undefined
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="dock" ref={ref}>
      <div className="dock-panel panel" id="dock-panel" hidden={!open}>
        <div className="dock-head">
          <h3>Appearance</h3>
          <div className="seg well" role="group" aria-label="Theme">
            <button type="button" aria-pressed={theme === 'dark'} onClick={() => setTheme('dark')}><MoonIcon />Dark</button>
            <button type="button" aria-pressed={theme === 'light'} onClick={() => setTheme('light')}><SunIcon />Light</button>
          </div>
        </div>
        <div className="styles-grid" role="group" aria-label="UI style">
          {STYLES.map((s) => (
            <button type="button" className="style-btn" key={s.id} aria-pressed={style === s.id} onClick={() => { setStyle(s.id); setOpen(false) }}>
              <span className={`sw sw-${s.id}`} />{s.name}
            </button>
          ))}
        </div>
        <p className="dock-note">{styleNote}</p>
      </div>
      <button
        type="button" className="btn primary dock-toggle" id="dock-toggle"
        aria-expanded={open} aria-controls="dock-panel" onClick={() => setOpen((o) => !o)}
      >
        <PaletteIcon />Change UI
      </button>
    </div>
  )
}
