import { useEffect } from "react"

/** Fades in every .rv element as it scrolls into view, staggered by position
 *  within its own section so groups arrive as a group, not a long queue. */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".rv"))
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("in"))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in")
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px" },
    )
    els.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 5) * 80}ms`
      io.observe(el)
    })
    return () => io.disconnect()
  }, [])
}
