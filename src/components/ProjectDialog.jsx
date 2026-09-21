import { useEffect, useRef } from 'react'
import Tags from './ui/Tags'
import { ArrowIcon, CloseIcon, GitHubIcon } from './Icons'

// Full project details. Opens as a modal dialog; closes on Esc, backdrop click or the × button.
export default function ProjectDialog({ project, onClose }) {
  const closeRef = useRef(null)

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

  if (!project) return null
  const p = project

  return (
    <div className="dialog-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="dialog panel" role="dialog" aria-modal="true" aria-labelledby={`dlg-${p.id}-title`}>
        <header className="dialog-head">
          <div className={`monogram hue-${p.hue}`} aria-hidden="true">{p.monogram}</div>
          <div className="dialog-titles">
            <span className="kind">{p.kind}</span>
            <h3 id={`dlg-${p.id}-title`}>{p.title}</h3>
            <p className="muted">{p.subtitle}</p>
          </div>
          <button ref={closeRef} type="button" className="icon-btn" onClick={onClose} aria-label="Close"><CloseIcon /></button>
        </header>

        <div className="dialog-body">
          <section>
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

          {p.tenants && (
            <section>
              <h4>Shows &amp; agencies on the platform</h4>
              <div className="chips">{p.tenants.map((t) => <span className="chip" key={t}>{t}</span>)}</div>
            </section>
          )}

          {p.modules && (
            <section>
              <h4>Modules</h4>
              <div className="chips">{p.modules.map((m) => <span className="chip" key={m}>{m}</span>)}</div>
            </section>
          )}

          <section>
            <h4>{p.id === 'ribbon' ? 'What I work on' : 'What I built'}</h4>
            <ul className="bullets">{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
          </section>

          {p.details?.map((d) => (
            <section key={d.title}>
              <h4>{d.title}</h4>
              <ul className="bullets">{d.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
            </section>
          ))}

          <section>
            <h4>Stack</h4>
            <Tags items={p.stack} />
          </section>
        </div>

        <footer className="dialog-foot">
          {p.link && (
            <a className="btn primary" href={p.link.url} target="_blank" rel="noopener noreferrer">
              Visit {p.link.label}<ArrowIcon />
            </a>
          )}
          {p.repo && (
            <a className="btn" href={p.repo.url} target="_blank" rel="noopener noreferrer">
              <GitHubIcon />Source
            </a>
          )}
          <button type="button" className="btn" onClick={onClose}>Close</button>
        </footer>
      </div>
    </div>
  )
}
