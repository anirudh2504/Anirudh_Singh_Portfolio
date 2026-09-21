import { contact, profile } from '../../data/profile'
import SectionHead from '../ui/SectionHead'
import { MailIcon, WhatsAppIcon } from '../Icons'

export default function Contact() {
  const { links, whatsapp } = profile
  return (
    <section id="contact">
      <SectionHead eyebrow="Contact" title={contact.heading} blurb={contact.blurb} />
      <div className="contact">
        <div className="panel">
          <p className="big"><a href={profile.mailto}>{profile.email}</a></p>
          <p className="muted">{contact.note}</p>
          <div className="cta">
            {/* Gmail compose opens reliably in a new tab; mailto: on the address above for people with a mail app. */}
            <a className="btn primary" href={profile.gmail} target="_blank" rel="noopener noreferrer"><MailIcon />Email me</a>
            <a className="btn whatsapp" href={whatsapp.href} target="_blank" rel="noopener noreferrer"><WhatsAppIcon />{whatsapp.display}</a>
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
