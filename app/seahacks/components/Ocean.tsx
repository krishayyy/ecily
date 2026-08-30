"use client"

import { useEffect, useRef } from "react"
import { AlphaCutout } from "./AlphaCutout"
import { Aquarium } from "./Aquarium"

/** The scene is fixed behind the whole document, so scrolling the page reads
 *  as descending through one continuous body of water: the surface light
 *  falls away, the shallow reef is left behind, and the scrim deepens toward
 *  the abyss. The living layer — jellyfish, bioluminescence, cursor wake —
 *  is one canvas on top of the painted plate. */
export function Ocean() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const d = Math.min(1, window.scrollY / window.innerHeight)
        root.style.setProperty("--descent", d.toFixed(4))
        ticking = false
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })

    let onMove: ((e: PointerEvent) => void) | undefined
    if (!reduced) {
      let mTicking = false
      onMove = (e: PointerEvent) => {
        if (mTicking) return
        mTicking = true
        requestAnimationFrame(() => {
          root.style.setProperty("--mx", ((e.clientX / window.innerWidth - 0.5) * 2).toFixed(3))
          root.style.setProperty("--my", ((e.clientY / window.innerHeight - 0.5) * 2).toFixed(3))
          mTicking = false
        })
      }
      window.addEventListener("pointermove", onMove, { passive: true })
    }

    return () => {
      window.removeEventListener("scroll", onScroll)
      if (onMove) window.removeEventListener("pointermove", onMove)
    }
  }, [])

  return (
    <div className="sh-scene" ref={rootRef} aria-hidden="true">
      <img className="sh-water" src="/seahacks/background-deep-sea.jpg" alt="" />

      {/* Light shafts shimmer independently of the plate, so the surface
          reads as moving water rather than a still photograph. */}
      <div className="sh-rays">
        <span style={{ left: "18%", ["--w" as string]: "6vw", ["--d" as string]: "0s" }} />
        <span style={{ left: "34%", ["--w" as string]: "3vw", ["--d" as string]: "-4s" }} />
        <span style={{ left: "48%", ["--w" as string]: "9vw", ["--d" as string]: "-9s" }} />
        <span style={{ left: "66%", ["--w" as string]: "4vw", ["--d" as string]: "-2s" }} />
        <span style={{ left: "79%", ["--w" as string]: "7vw", ["--d" as string]: "-6s" }} />
      </div>

      <Aquarium />

      <AlphaCutout src="/seahacks/coral-foreground.jpg" className="sh-reef" />

      <div className="sh-scrim" />
      <div className="sh-grain" />
    </div>
  )
}
