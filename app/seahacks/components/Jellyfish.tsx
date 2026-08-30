"use client"

import { useEffect, useRef } from "react"
import { AlphaCutout } from "./AlphaCutout"

/** The jellyfish/particle source art glows on a dark-navy (not pure black)
 *  field, so `mix-blend-mode: screen` alone leaves a faint rectangle behind.
 *  Cutting real alpha via AlphaCutout (inverted: dark drops out, glow stays)
 *  removes it cleanly instead. */
const LAYERS = [
  { src: "/seahacks/jellyfish-hero.jpg", className: "jf-hero" },
  { src: "/seahacks/jellyfish-secondary.jpg", className: "jf-secondary" },
  { src: "/seahacks/particle-glow.jpg", className: "jf-particle jf-particle-a" },
  { src: "/seahacks/particle-glow.jpg", className: "jf-particle jf-particle-b" },
  { src: "/seahacks/particle-glow.jpg", className: "jf-particle jf-particle-c" },
  { src: "/seahacks/particle-glow.jpg", className: "jf-particle jf-particle-d" },
]

/** Deep-sea scene built from real illustrated layers: a wide background
 *  plate, two jellyfish at different depths, scattered glow particles, and
 *  a coral silhouette pinned to the floor. A tiny mouse-parallax nudges the
 *  nearer layers more than the far ones, skipped under reduced motion. */
export function JellyfishOcean() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      root.style.setProperty("--mx", String(x))
      root.style.setProperty("--my", String(y))
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  return (
    <div className="sea-ocean" ref={rootRef} aria-hidden="true">
      <img className="sea-bg" src="/seahacks/background-deep-sea.jpg" alt="" />
      <div className="sea-wash" />
      {LAYERS.map((l, i) => (
        <AlphaCutout key={i} src={l.src} className={l.className} invert lowThreshold={35} highThreshold={110} />
      ))}
      <AlphaCutout src="/seahacks/coral-foreground.jpg" className="sea-floor" />
    </div>
  )
}
