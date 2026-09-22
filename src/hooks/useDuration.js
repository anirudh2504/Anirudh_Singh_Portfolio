import { useEffect, useState } from 'react'

// Calendar-accurate split of (now − start) into years / months / days.
export function splitDuration(start, now = new Date()) {
  let years = now.getFullYear() - start.getFullYear()
  let months = now.getMonth() - start.getMonth()
  let days = now.getDate() - start.getDate()
  if (days < 0) {
    months -= 1
    // days in the month before `now`
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate()
  }
  if (months < 0) {
    years -= 1
    months += 12
  }
  return { years: Math.max(0, years), months: Math.max(0, months), days: Math.max(0, days) }
}

// Live duration since an ISO date (YYYY-MM-DD). Re-computes at the next local midnight.
export function useDuration(startISO) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const tick = () => setNow(new Date())
    const msToMidnight = () => {
      const d = new Date()
      const next = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1, 0, 0, 1)
      return next - d
    }
    let t = setTimeout(function loop() { tick(); t = setTimeout(loop, msToMidnight()) }, msToMidnight())
    return () => clearTimeout(t)
  }, [])
  const [y, m, d] = startISO.split('-').map(Number)
  return splitDuration(new Date(y, m - 1, d), now)
}
