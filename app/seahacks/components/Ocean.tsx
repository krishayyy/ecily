"use client"

import { useEffect, useRef } from "react"
import { AlphaCutout } from "./AlphaCutout"
import { Plankton } from "./Plankton"

/** The scene is fixed behind the whole document rather than scoped to the
 *  hero, so scrolling the page reads as descending through one continuous
 *  body of water: the surface light falls away, the scrim deepens toward the
 *  abyss, and the jellyfish drift past at their own depths the whole way. */
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

    let onMove: ((e: MouseEvent) => void) | undefined
    if (!reduced) {
      let mTicking = false
      onMove = (e: MouseEvent) => {
        if (mTicking) return
        mTicking = true
        requestAnimationFrame(() => {
          root.style.setProperty("--mx", ((e.clientX / window.innerWidth - 0.5) * 2).toFixed(3))
          root.style.setProperty("--my", ((e.clientY / window.innerHeight - 0.5) * 2).toFixed(3))
          mTicking = false
        })
      }
      window.addEventListener("mousemove", onMove)
    }

    return () => {
      window.removeEventListener("scroll", onScroll)
      if (onMove) window.removeEventListener("mousemove", onMove)
    }
  }, [])

  return (
    <div className="sh-scene" ref={rootRef} aria-hidden="true">
      <img className="sh-water" src="/seahacks/background-deep-sea.jpg" alt="" />

      {/* Light shafts sit above the plate and shimmer independently, so the
          surface reads as moving water rather than a still photograph. */}
      <div className="sh-rays">
        <span style={{ left: "18%", ["--w" as string]: "6vw", ["--d" as string]: "0s" }} />
        <span style={{ left: "34%", ["--w" as string]: "3vw", ["--d" as string]: "-4s" }} />
        <span style={{ left: "48%", ["--w" as string]: "9vw", ["--d" as string]: "-9s" }} />
        <span style={{ left: "66%", ["--w" as string]: "4vw", ["--d" as string]: "-2s" }} />
        <span style={{ left: "79%", ["--w" as string]: "7vw", ["--d" as string]: "-6s" }} />
      </div>

      <Plankton />

      {/* Far jellyfish: small, blurred, slow — atmospheric perspective. */}
      <AlphaCutout
        src="/seahacks/jellyfish-secondary.jpg"
        className="sh-jelly sh-jelly-far"
        invert
        lowThreshold={30}
        highThreshold={105}
      />
      {/* Near jellyfish: large, sharp, the anchor of the composition. */}
      <AlphaCutout
        src="/seahacks/jellyfish-hero.jpg"
        className="sh-jelly sh-jelly-near"
        invert
        lowThreshold={34}
        highThreshold={112}
      />

      <AlphaCutout src="/seahacks/coral-foreground.jpg" className="sh-reef" />

      <div className="sh-scrim" />
      <div className="sh-grain" />
    </div>
  )
}
