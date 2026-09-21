import { experience } from '../../data/profile'
import SectionHead from '../ui/SectionHead'
import Tags from '../ui/Tags'

export default function Experience() {
  return (
    <section id="experience">
      <SectionHead eyebrow="Experience" title="Where I've been shipping." />
      {experience.map((job) => (
        <article className="xp panel" key={job.company}>
          <div className="when">
            <b>{job.company}</b>
            <span>{job.period}</span>
            <span>{job.type}</span>
          </div>
          <div className="role">
            <h3>{job.role}</h3>
            <ul>{job.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
            <Tags items={job.tags} />
          </div>
        </article>
      ))}
    </section>
  )
}
