import { about, profile } from '../../data/profile'
import SectionHead from '../ui/SectionHead'

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
            <div className="fact"><span>Email</span><span><a href={`mailto:${profile.email}`}>{profile.email}</a></span></div>
            <div className="fact"><span>Phone</span><span><a href={profile.phone.href}>{profile.phone.display}</a></span></div>
          </div>
        </div>
      </div>
    </section>
  )
}
