import { useDuration } from '../../hooks/useDuration'

const unit = (n, one, many) => `${n} ${n === 1 ? one : many}`

// "1 yr 2 mo 21 days" since `start` (ISO date), ticking over at midnight.
export default function Duration({ start, suffix = 'and counting', compact = false }) {
  const { years, months, days } = useDuration(start)
  const parts = compact
    ? [`${years}y`, `${months}m`, `${days}d`]
    : [years ? unit(years, 'yr', 'yrs') : null, unit(months, 'mo', 'mo'), unit(days, 'day', 'days')].filter(Boolean)
  const label = parts.join(' ')
  return (
    <span className="duration" aria-label={`${label} ${suffix}`.trim()}>
      {parts.map((p) => <b key={p}>{p}</b>)}
      {suffix && <span className="duration-suffix">{suffix}</span>}
    </span>
  )
}
