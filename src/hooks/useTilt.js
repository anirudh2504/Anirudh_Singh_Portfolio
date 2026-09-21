import { useEffect, useRef } from 'react'

// 3D tilt that follows the pointer. Writes --tilt-x/--tilt-y (degrees) and --glare-x/--glare-y (%)
// onto the element; the CSS does the transform. Skipped on touch devices and for reduced motion.
export function useTilt(max = 10) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined

    let raf = 0
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--tilt-y', `${((px - 0.5) * 2 * max).toFixed(2)}deg`)
        el.style.setProperty('--tilt-x', `${((0.5 - py) * 2 * max).toFixed(2)}deg`)
        el.style.setProperty('--glare-x', `${(px * 100).toFixed(1)}%`)
        el.style.setProperty('--glare-y', `${(py * 100).toFixed(1)}%`)
        el.classList.add('is-tilting')
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(raf)
      el.style.removeProperty('--tilt-x')
      el.style.removeProperty('--tilt-y')
      el.classList.remove('is-tilting')
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [max])

  return ref
}
