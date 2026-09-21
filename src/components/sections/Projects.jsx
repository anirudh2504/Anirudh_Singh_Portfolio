import { projects } from '../../data/profile'
import SectionHead from '../ui/SectionHead'
import Tags from '../ui/Tags'

export default function Projects() {
  return (
    <section id="projects">
      <SectionHead
        eyebrow="Projects"
        title="Selected work."
        blurb="One production e-commerce platform, one from-scratch Java system."
      />
      <div className="work">
        {projects.map((p) => (
          <article className="project panel" key={p.title}>
            <div className="thumb"><div className={`art ${p.art}`} role="img" aria-label={p.artLabel} /></div>
            <div className="p-meta"><h3>{p.title}</h3><span className="kind">{p.kind}</span></div>
            <div className="p-body">
              <p>{p.summary}</p>
              <ul>{p.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
              <Tags items={p.tags} />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
