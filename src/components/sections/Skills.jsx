import { skills } from '../../data/profile'
import SectionHead from '../ui/SectionHead'
import Tags from '../ui/Tags'

export default function Skills() {
  return (
    <section id="skills">
      <SectionHead eyebrow="Skills" title="Tools I reach for." />
      <div className="skills">
        {skills.map((group) => (
          <div className="panel" key={group.title}>
            <div className="icon">{group.icon}</div>
            <h3>{group.title}</h3>
            <Tags items={group.items} />
          </div>
        ))}
      </div>
    </section>
  )
}
