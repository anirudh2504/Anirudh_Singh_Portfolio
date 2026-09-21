import { profile } from '../data/profile'
import { DownloadIcon, GitHubIcon, LinkedInIcon } from './Icons'

const Str = ({ v }) => <span className="s">&quot;{v}&quot;</span>
const Key = ({ k }) => <span className="k">&quot;{k}&quot;</span>

function ProfileCard() {
  const { card } = profile
  const firstRow = card.stack.slice(0, 3)
  const secondRow = card.stack.slice(3)
  return (
    <aside className="id-card panel" aria-label="Profile summary">
      <div className="id-head">
        <div className="avatar" aria-hidden="true" data-initials={profile.initials} />
        <div>
          <h3>{profile.name}</h3>
          <p className="muted" style={{ fontSize: '.9rem' }}>{profile.education_short}</p>
        </div>
        <span className="pill" style={{ marginLeft: 'auto' }}><span className="dot" />{profile.availability}</span>
      </div>
      <pre className="code well">
        <span className="c">{'// profile.json'}</span>{'\n'}
        {'{\n'}
        {'  '}<Key k="name" />: <Str v={profile.name} />,{'\n'}
        {'  '}<Key k="role" />: <Str v={profile.role} />,{'\n'}
        {'  '}<Key k="stack" />: [{'\n'}
        {'    '}{firstRow.map((s, i) => <span key={s}>{i > 0 && ', '}<Str v={s} /></span>)},{'\n'}
        {'    '}{secondRow.map((s, i) => <span key={s}>{i > 0 && ', '}<Str v={s} /></span>)}{'\n'}
        {'  ],\n'}
        {'  '}<Key k="at" />: <Str v={card.at} />,{'\n'}
        {'  '}<Key k="since" />: <Str v={card.since} />{'\n'}
        {'}'}
      </pre>
      <div className="tools">
        {profile.tools.map((t) => <span className="chip" key={t}>{t}</span>)}
      </div>
    </aside>
  )
}

export default function Hero() {
  const { headline, links } = profile
  return (
    <section className="hero" aria-label="Introduction">
      <div className="lede">
        <span className="eyebrow">{profile.tagline}</span>
        <h1>{headline.before}<em>{headline.em}</em>{headline.after}</h1>
        <p className="intro">{profile.intro}</p>
        <div className="cta">
          <a className="btn primary" href="#projects">View projects</a>
          <a className="btn" href={profile.resume} download><DownloadIcon />Download résumé</a>
        </div>
        <div className="socials">
          <a href={links.github.url} target="_blank" rel="noopener noreferrer"><GitHubIcon />{links.github.label}</a>
          <a href={links.linkedin.url} target="_blank" rel="noopener noreferrer"><LinkedInIcon />linkedin</a>
        </div>
      </div>
      <ProfileCard />
    </section>
  )
}
