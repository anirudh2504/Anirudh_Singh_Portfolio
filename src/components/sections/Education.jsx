import { certifications, education } from '../../data/profile'
import SectionHead from '../ui/SectionHead'
import TimelineRow from '../ui/TimelineRow'

export default function Education() {
  return (
    <section id="education">
      <SectionHead eyebrow="Education & certifications" title="Background." />
      <div className="edu">
        <div className="panel">
          <h3>Education</h3>
          {education.map((e) => <TimelineRow key={e.title} {...e} />)}
        </div>
        <div className="panel">
          <h3>Certifications</h3>
          {certifications.map((c) => <TimelineRow key={c.title} {...c} />)}
        </div>
      </div>
    </section>
  )
}
