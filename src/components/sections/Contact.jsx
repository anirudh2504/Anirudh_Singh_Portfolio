import { contact, profile } from '../../data/profile'
import SectionHead from '../ui/SectionHead'

export default function Contact() {
  const { links } = profile
  return (
    <section id="contact">
      <SectionHead eyebrow="Contact" title={contact.heading} blurb={contact.blurb} />
      <div className="contact">
        <div className="panel">
          <p className="big">{profile.email}</p>
          <p className="muted">{contact.note}</p>
          <div className="cta">
            <a className="btn primary" href={`mailto:${profile.email}?subject=Hello%20Anirudh`}>Email me</a>
            <a className="btn" href={profile.resume} download>Résumé (PDF)</a>
          </div>
        </div>
        <div className="links">
          <a className="panel sm" href={links.github.url} target="_blank" rel="noopener noreferrer">{links.github.label} <span>github</span></a>
          <a className="panel sm" href={links.linkedin.url} target="_blank" rel="noopener noreferrer">{links.linkedin.label} <span>linkedin</span></a>
          <a className="panel sm" href={profile.phone.href}>{profile.phone.display} <span>phone</span></a>
        </div>
      </div>
    </section>
  )
}
