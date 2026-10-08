import { useEffect } from "react"

/** Fades in every .rv element as it scrolls into view, staggered a touch by DOM order. */
export function useReveal(deps: React.DependencyList = []) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".rv"))
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in")
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px" },
    )
    els.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 70}ms`
      io.observe(el)
    })
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
