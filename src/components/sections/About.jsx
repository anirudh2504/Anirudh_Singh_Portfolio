import { about, profile, skills } from '../../data/profile'
import SectionHead from '../ui/SectionHead'

const allSkills = skills.flatMap((g) => g.items)

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

        <div className="skills-ledger" id="skills">
          <div className="ledger-head">
            <h3>Skills</h3>
            <p className="muted">What I use day to day, grouped by where it sits in the stack.</p>
          </div>
          <div className="ticker" aria-hidden="true">
            <div className="ticker-track">
              {[...allSkills, ...allSkills].map((item, i) => <span key={`${item}-${i}`}>{item}</span>)}
            </div>
          </div>
          <ol className="ledger">
            {skills.map((group, i) => (
              <li className="ledger-row" key={group.title}>
                <span className="ledger-idx">{String(i + 1).padStart(2, '0')}</span>
                <span className="ledger-label">{group.title}</span>
                <span className="ledger-items">
                  {group.items.map((item) => <span className="skill-item" key={item}>{item}</span>)}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
