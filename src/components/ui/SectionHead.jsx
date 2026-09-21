export default function SectionHead({ eyebrow, title, blurb }) {
  return (
    <div className="sec-head">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {blurb && <p className="muted">{blurb}</p>}
    </div>
  )
}
