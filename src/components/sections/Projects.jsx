import { useCallback, useState } from 'react'
import { projects } from '../../data/profile'
import SectionHead from '../ui/SectionHead'
import Tags from '../ui/Tags'
import ProjectDialog from '../ProjectDialog'
import { ArrowIcon } from '../Icons'

// Compact cards; the full write-up lives in the dialog that opens on click.
export default function Projects() {
  const [openId, setOpenId] = useState(null)
  const close = useCallback(() => setOpenId(null), [])
  const active = projects.find((p) => p.id === openId) || null

  return (
    <section id="projects">
      <SectionHead eyebrow="Projects" title="Selected work." blurb="Click a project for the full story." />
      <div className="work">
        {projects.map((p) => (
          <article className="project panel" key={p.id}>
            <button type="button" className="project-open" onClick={() => setOpenId(p.id)} aria-haspopup="dialog">
              <div className="project-top">
                <span className={`monogram hue-${p.hue}`} aria-hidden="true">{p.monogram}</span>
                <span className="kind">{p.kind}</span>
              </div>
              <h3>{p.title}</h3>
              <p className="subtitle">{p.subtitle}</p>
              <p className="tagline">{p.tagline}</p>
              <Tags items={p.stack.slice(0, 4)} />
            </button>
            <div className="project-foot">
              <button type="button" className="p-link" onClick={() => setOpenId(p.id)}>View details</button>
              {p.link && (
                <a className="p-link ext" href={p.link.url} target="_blank" rel="noopener noreferrer">
                  {p.link.label}<ArrowIcon />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
      <ProjectDialog project={active} onClose={close} />
    </section>
  )
}
