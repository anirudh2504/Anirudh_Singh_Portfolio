import { useEffect } from 'react'

const SELECTOR = 'section .sec-head, section .panel, .links a, .ledger-row'

// Scroll-reveal: elements start visible (so nothing is hidden if JS fails or motion is reduced);
// only when IntersectionObserver is available do we hide them and fade/slide them in as they enter.
export function useReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const els = Array.from(document.querySelectorAll(SELECTOR)).filter((el) => !el.closest('[data-no-reveal]'))
    // Stagger siblings inside the same parent.
    const seen = new Map()
    els.forEach((el) => {
      const n = seen.get(el.parentElement) || 0
      seen.set(el.parentElement, n + 1)
      el.style.setProperty('--reveal-delay', `${Math.min(n, 5) * 70}ms`)
      el.classList.add('reveal')
    })

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('reveal-in')
        io.unobserve(entry.target)
      })
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })

    els.forEach((el) => {
      const r = el.getBoundingClientRect()
      // Anything already on screen at load shows immediately — no waiting for a scroll.
      if (r.top < window.innerHeight) el.classList.add('reveal-in')
      else io.observe(el)
    })
    return () => io.disconnect()
  }, [])
}
