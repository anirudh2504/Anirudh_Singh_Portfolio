export default function TimelineRow({ when, title, where }) {
  return (
    <div className="tl">
      <span className="when">{when}</span>
      <div><b>{title}</b><span>{where}</span></div>
    </div>
  )
}
