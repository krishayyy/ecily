import { useEffect } from "react"

/** Writes pointer position onto whichever matching card the cursor is over,
 *  so CSS can paint a soft light that follows the hand across it. One
 *  delegated listener covers every card rather than one per element. */
export function useSpotlight(selector = ".sh-lit") {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let ticking = false
    const onMove = (e: PointerEvent) => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const card = (e.target as HTMLElement | null)?.closest<HTMLElement>(selector)
        if (card) {
          const r = card.getBoundingClientRect()
          card.style.setProperty("--sx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`)
          card.style.setProperty("--sy", `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`)
        }
        ticking = false
      })
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [selector])
}
