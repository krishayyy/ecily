"use client"

import { useEffect, useRef, useState } from "react"
import { useParallax } from "../hooks/useParallax"
import { APPLY_URL, daysUntilEvent } from "../config"

/** The hero is built from separate cut-outs rather than one flat scene, so
 *  each layer can move on its own: the sky drifts slowest, the tree and the
 *  mango sit at different parallax depths, and the mango's raised forearm is
 *  its own layer pivoting from the shoulder. */
export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  useParallax(heroRef)
  // Recomputed hourly so a tab left open overnight doesn't sit on a stale count.
  const [days, setDays] = useState(daysUntilEvent)
  useEffect(() => {
    const id = setInterval(() => setDays(daysUntilEvent()), 3_600_000)
    return () => clearInterval(id)
  }, [])
  return (
    <header className="hero" id="top" ref={heroRef}>
      <h1 className="sr-only">Mango Hacks</h1>

      <div className="sky" />

      <div className="felt-stage">
        <div className="tree-wrap">
          <img className="tree" src="/mangohacks/images/felt/tree.webp" alt="" />
          <div className="sign-hang">
            <img className="sign" src="/mangohacks/images/felt/sign.webp"
              alt="A wooden signboard hanging from the mango tree" />
            {/* The board carries the countdown rather than the date. The date
                is a static fact and the Venue section right after the hero
                covers it in full; a number that drops every day gives people
                a reason to come back to the page. */}
            <div className="sign-copy">
              <div className="sign-count">{days}</div>
              <div className="sign-until">{days === 1 ? "day left" : "days left"}</div>
            </div>
          </div>
        </div>

        <div className="mango-layer">
          {/* body and forearm are two crops of one photograph; the arm's box
              starts at 315/395 across and 140/625 down the body image, and it
              pivots about its own lower-left corner, which is the shoulder.
              Both sit inside .mango-bob so they rise and fall together. */}
          <div className="mango-bob">
            <img className="mango-body" src="/mangohacks/images/felt/mango-body.webp"
              alt="A felt mango character waving" />
            <img className="mango-arm" src="/mangohacks/images/felt/mango-arm.webp" alt="" />
          </div>
        </div>
      </div>

      <div className="hero-bottom">
        <p className="sell">A one-day hackathon for high-school builders. Twelve and a half hours,
          one room, and something real at the end of it.</p>
        <p className="hand" style={{ transform: "rotate(-1.2deg)" }}>free food, free entry, zero experience required.</p>
        <div className="hero-cta">
          <a className="btn btn-felt" href={APPLY_URL} target="_blank" rel="noopener noreferrer">
            Apply to hack →
          </a>
          <a className="btn btn-felt btn-quiet" href="#sponsor">Sponsor us</a>
        </div>
      </div>
    </header>
  )
}
