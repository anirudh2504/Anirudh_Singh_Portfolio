import { useEffect, useState } from 'react'
import { nav, profile } from '../data/profile'
import { useAppearance } from '../hooks/useAppearance'
import { MenuIcon, CloseIcon, MoonIcon, SunIcon } from './Icons'

export default function Header() {
  const { theme, toggleTheme } = useAppearance()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  // Highlight the section currently in view.
  useEffect(() => {
    const targets = nav.map(([href]) => document.querySelector(href)).filter(Boolean)
    if (!('IntersectionObserver' in window) || !targets.length) return undefined
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive('#' + e.target.id)),
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [])

  return (
    <header className="top wrap">
      <div className="bar panel sm">
        <a className="logo" href="#top"><i />{profile.name}</a>
        <nav
          className={`nav${open ? ' open' : ''}`}
          id="nav"
          aria-label="Sections"
          onClick={(e) => e.target.tagName === 'A' && setOpen(false)}
        >
          {nav.map(([href, label]) => (
            <a key={href} href={href} className={active === href ? 'active' : undefined}>{label}</a>
          ))}
        </nav>
        <div className="top-actions">
          <button
            className="icon-btn" id="theme-toggle" type="button" onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            title="Toggle theme (T)"
          >
            {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
          </button>
          <button
            className="icon-btn" id="menu-toggle" type="button" onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="nav"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
    </header>
  )
}
