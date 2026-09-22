import { experience } from '../../data/profile'
import SectionHead from '../ui/SectionHead'
import Tags from '../ui/Tags'
import Duration from '../ui/Duration'

// "from → to" date range, e.g. Jul 2025 → Present
const Range = ({ from, to }) => (
  <span className="range" aria-label={`${from} to ${to}`}>
    <time>{from}</time>
    <i aria-hidden="true" />
    <time className={to === 'Present' ? 'now' : undefined}>{to}</time>
  </span>
)

export default function Experience() {
  return (
    <section id="experience">
      <SectionHead eyebrow="Experience" title="Where I've been shipping." blurb="Work and training, newest first." />
      <div className="timeline">
        {experience.map((item) => (
          <article className="xp panel" key={`${item.org}-${item.from}`}>
            <div className="when">
              <Range from={item.from} to={item.to} />
              {item.to === 'Present' && item.start && <Duration start={item.start} />}
              <b>{item.org}</b>
              <span className="pill">{item.type}</span>
            </div>
            <div className="role">
              <h3>{item.title}</h3>
              <ul>{item.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
              <Tags items={item.tags} />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
