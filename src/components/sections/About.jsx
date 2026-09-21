import { about, profile, skills } from '../../data/profile'
import SectionHead from '../ui/SectionHead'
import Tags from '../ui/Tags'

export default function About() {
  return (
    <section id="about">
      <SectionHead eyebrow="About" title={about.heading} />
      <div className="about">
        <div className="panel">
          {about.paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
        </div>
        <div className="panel">
          <div className="facts">
            {about.facts.map(([k, v]) => (
              <div className="fact" key={k}><span>{k}</span><span>{v}</span></div>
            ))}
            <div className="fact"><span>Email</span><span><a href={profile.mailto}>{profile.email}</a></span></div>
            <div className="fact"><span>Phone</span><span><a href={profile.phone.href}>{profile.phone.display}</a></span></div>
          </div>
        </div>

        <div className="panel about-skills" id="skills">
          <div className="about-skills-head">
            <h3>Skills</h3>
            <p className="muted">What I use day to day, grouped by where it sits in the stack.</p>
          </div>
          <div className="skill-grid">
            {skills.map((group) => (
              <div className="skill-card well" key={group.title}>
                <div className="skill-card-head">
                  <span className="icon">{group.icon}</span>
                  <h4>{group.title}</h4>
                </div>
                <Tags items={group.items} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
