import { useEffect, useRef, useState } from 'react'
import Tags from './ui/Tags'
import { ArrowIcon, CloseIcon, GitHubIcon } from './Icons'

const EXIT_MS = 320

// Full-screen project view. Slides in over the page; closes on Esc, the × or the Close button.
// Keeps rendering the last project during the exit animation, then unmounts.
export default function ProjectDialog({ project, onClose }) {
  const [current, setCurrent] = useState(project)
  const closeRef = useRef(null)
  const closing = !project && !!current

  useEffect(() => {
    if (project) { setCurrent(project); return undefined }
    if (!current) return undefined
    const t = setTimeout(() => setCurrent(null), EXIT_MS)
    return () => clearTimeout(t)
  }, [project, current])

  // Esc + scroll lock while open.
  useEffect(() => {
    if (!project) return undefined
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [project, onClose])

  if (!current) return null
  const p = current

  return (
    <div className={`takeover${closing ? ' is-closing' : ''}`} role="dialog" aria-modal="true" aria-labelledby={`dlg-${p.id}-title`}>
      <div className="takeover-bar">
        <div className="wrap takeover-bar-in">
          <span className="kind">{p.kind}</span>
          <button ref={closeRef} type="button" className="icon-btn" onClick={onClose} aria-label="Close project"><CloseIcon /></button>
        </div>
      </div>

      <div className="takeover-scroll">
        <div className="wrap takeover-body">
          <header className="takeover-head">
            <div className={`monogram lg hue-${p.hue}`} aria-hidden="true">{p.monogram}</div>
            <div className="takeover-titles">
              <h2 id={`dlg-${p.id}-title`}>{p.title}</h2>
              <p className="muted">{p.subtitle}</p>
            </div>
            <div className="takeover-actions">
              {p.link && (
                <a className="btn primary" href={p.link.url} target="_blank" rel="noopener noreferrer">
                  Visit {p.link.label}<ArrowIcon />
                </a>
              )}
              {p.repo && (
                <a className="btn" href={p.repo.url} target="_blank" rel="noopener noreferrer"><GitHubIcon />Source</a>
              )}
            </div>
          </header>

          <div className="takeover-grid">
            <div className="takeover-main">
              <section className="panel">
                <h4>Overview</h4>
                {p.overview.map((para) => <p key={para.slice(0, 32)}>{para}</p>)}
              </section>

              {p.scale && (
                <div className="scale">
                  {p.scale.map(([n, label]) => (
                    <div className="stat well" key={label}><b>{n}</b><span>{label}</span></div>
                  ))}
                  <span className="scale-src">Platform figures from meetribbon.com</span>
                </div>
              )}

              <section className="panel">
                <h4>{p.id === 'ribbon' ? 'What I work on' : 'What I built'}</h4>
                <ul className="bullets">{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
              </section>

              {p.details?.map((d) => (
                <section className="panel" key={d.title}>
                  <h4>{d.title}</h4>
                  <ul className="bullets">{d.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                </section>
              ))}
            </div>

            <aside className="takeover-side">
              {p.tenants && (
                <section className="panel">
                  <h4>Shows &amp; agencies on the platform</h4>
                  <div className="chips">{p.tenants.map((t) => <span className="chip" key={t}>{t}</span>)}</div>
                </section>
              )}
              {p.modules && (
                <section className="panel">
                  <h4>Modules</h4>
                  <div className="chips">{p.modules.map((m) => <span className="chip" key={m}>{m}</span>)}</div>
                </section>
              )}
              <section className="panel">
                <h4>Stack</h4>
                <Tags items={p.stack} />
              </section>
              {(p.link || p.repo) && (
                <section className="panel">
                  <h4>Links</h4>
                  <div className="side-links">
                    {p.link && <a href={p.link.url} target="_blank" rel="noopener noreferrer">{p.link.label}<ArrowIcon /></a>}
                    {p.repo && <a href={p.repo.url} target="_blank" rel="noopener noreferrer">{p.repo.label}<ArrowIcon /></a>}
                  </div>
                </section>
              )}
            </aside>
          </div>

          <footer className="takeover-foot">
            <button type="button" className="btn" onClick={onClose}><CloseIcon />Back to projects</button>
          </footer>
        </div>
      </div>
    </div>
  )
}
