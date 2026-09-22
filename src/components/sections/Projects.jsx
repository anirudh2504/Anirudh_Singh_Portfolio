import { useCallback, useEffect, useRef, useState } from 'react'
import { projects } from '../../data/profile'
import Tags from '../ui/Tags'
import ProjectDialog from '../ProjectDialog'
import { ArrowIcon } from '../Icons'

const smooth = (t) => t * t * (3 - 2 * t) // smoothstep: dwell on each project, glide between them
const pad = (n) => String(n).padStart(2, '0')

// Pinned horizontal scroller. The stage is N viewports tall; while it is in view the panel sticks
// and the track translates sideways in step with the scroll position. Below 760px (or with
// reduced motion) the CSS turns it back into a plain vertical list and this effect is skipped.
export default function Projects() {
  const [openId, setOpenId] = useState(null)
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const stageRef = useRef(null)
  const trackRef = useRef(null)
  const close = useCallback(() => setOpenId(null), [])
  const current = projects.find((p) => p.id === openId) || null
  const n = projects.length

  useEffect(() => {
    const stage = stageRef.current
    const track = trackRef.current
    if (!stage || !track) return undefined
    const mq = window.matchMedia('(max-width: 760px), (prefers-reduced-motion: reduce)')
    let raf = 0

    const update = () => {
      raf = 0
      if (mq.matches) { track.style.transform = ''; return }
      const r = stage.getBoundingClientRect()
      const total = r.height - window.innerHeight
      const p = Math.min(1, Math.max(0, -r.top / total)) * (n - 1)   // 0 … n-1
      const i = Math.min(n - 2, Math.floor(p))
      const eased = i + smooth(p - i)
      const slideW = track.clientWidth / n
      track.style.transform = `translate3d(${-eased * slideW}px, 0, 0)`
      track.style.setProperty('--p', eased)
      setActive(Math.round(eased))
      setProgress(eased / (n - 1))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    mq.addEventListener('change', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      mq.removeEventListener('change', onScroll)
    }
  }, [n])

  return (
    <section id="projects" className="projects-stage" ref={stageRef} style={{ '--n': n }}>
      <div className="projects-sticky">
        <div className="wrap projects-head">
          <div className="sec-head" data-no-reveal>
            <span className="eyebrow">Projects</span>
            <h2>Selected work.</h2>
          </div>
          <div className="projects-meta" aria-hidden="true">
            <span className="counter"><b>{pad(active + 1)}</b> / {pad(n)}</span>
            <span className="progress"><i style={{ transform: `scaleX(${progress})` }} /></span>
            <span className="hint">Scroll to browse</span>
          </div>
        </div>

        <div className="projects-track" ref={trackRef}>
          {projects.map((p, i) => (
            <div className="slide" key={p.id} style={{ '--i': i }} aria-hidden={active !== i ? 'true' : undefined}>
              <article
                className="slide-card panel"
                data-no-reveal
                role="button"
                tabIndex={active === i ? 0 : -1}
                aria-label={`Open ${p.title} details`}
                onClick={() => setOpenId(p.id)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpenId(p.id) } }}
              >
                <div className="slide-top">
                  <span className={`monogram lg hue-${p.hue}`} aria-hidden="true">{p.monogram}</span>
                  <div className="slide-titles">
                    <span className="kind">{p.kind}</span>
                    <h3>{p.title}</h3>
                    <p className="subtitle">{p.subtitle}</p>
                  </div>
                </div>
                <p className="tagline">{p.tagline}</p>
                <Tags items={p.stack} />
                <div className="slide-foot">
                  <button type="button" className="btn primary" onClick={(e) => { e.stopPropagation(); setOpenId(p.id) }} aria-haspopup="dialog">View details</button>
                  {p.link && (
                    <a className="btn" href={p.link.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>{p.link.label}<ArrowIcon /></a>
                  )}
                  {!p.link && p.repo && (
                    <a className="btn" href={p.repo.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>Source<ArrowIcon /></a>
                  )}
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
      <ProjectDialog project={current} onClose={close} />
    </section>
  )
}
