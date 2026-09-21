import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

// Typewriter that cycles through `words`.
// Phases: type → hold → delete → pause → (next word) type …
// The <em> is given an explicit width measured from a hidden copy of the *current* word, so the
// box animates smoothly to each new word's size instead of reflowing letter by letter.
// With reduced motion it just swaps whole words on a timer.
export default function RotatingWord({ words, typeMs = 70, deleteMs = 42, holdMs = 2000, pauseMs = 260, className = '' }) {
  const [index, setIndex] = useState(0)
  const [count, setCount] = useState(words[0].length) // visible characters
  const [phase, setPhase] = useState('hold')           // 'type' | 'hold' | 'delete' | 'pause'
  const [width, setWidth] = useState(null)
  const sizerRef = useRef(null)
  const reduced = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, [])
  const word = words[index]

  // Measure the full word (re-measure once web fonts have loaded).
  useLayoutEffect(() => {
    const measure = () => sizerRef.current && setWidth(sizerRef.current.offsetWidth)
    measure()
    if (document.fonts?.ready) document.fonts.ready.then(measure)
  }, [word])

  useEffect(() => {
    let t
    if (reduced) {
      t = setTimeout(() => {
        const next = (index + 1) % words.length
        setIndex(next)
        setCount(words[next].length)
      }, holdMs + 1200)
      return () => clearTimeout(t)
    }
    if (phase === 'type') {
      if (count < word.length) t = setTimeout(() => setCount((c) => c + 1), typeMs)
      else setPhase('hold')
    } else if (phase === 'hold') {
      t = setTimeout(() => setPhase('delete'), holdMs)
    } else if (phase === 'delete') {
      if (count > 0) t = setTimeout(() => setCount((c) => c - 1), deleteMs)
      else setPhase('pause')
    } else if (phase === 'pause') {
      t = setTimeout(() => {
        setIndex((i) => (i + 1) % words.length)
        setPhase('type')
      }, pauseMs)
    }
    return () => clearTimeout(t)
  }, [phase, count, index, word, words, reduced, typeMs, deleteMs, holdMs, pauseMs])

  const shown = word.slice(0, count)

  return (
    <em className={`rotating ${phase} ${className}`.trim()} aria-label={word} style={width ? { width } : undefined}>
      <span className="rw-text" aria-hidden="true">
        {shown.split('').map((ch, i) => <span className="rw-ch" key={`${index}-${i}`}>{ch}</span>)}
      </span>
      <span className="caret" aria-hidden="true" />
      <span className="rw-sizer" aria-hidden="true" ref={sizerRef}>{word}</span>
    </em>
  )
}
