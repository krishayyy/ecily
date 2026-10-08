import { useEffect } from "react"

/** Writes scrollY onto --py on the given element, rAF-throttled, for CSS-driven parallax layers. */
export function useParallax(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let ticking = false
    const update = () => {
      el.style.setProperty("--py", String(window.scrollY))
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [ref])
}
