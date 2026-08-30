"use client"

import { useEffect, useState } from "react"
import { APPLY_URL, daysUntilEvent } from "../config"
import { MagneticButton } from "./MagneticButton"

export function Hero() {
  const [days, setDays] = useState(daysUntilEvent)
  useEffect(() => {
    const id = setInterval(() => setDays(daysUntilEvent()), 3_600_000)
    return () => clearInterval(id)
  }, [])

  return (
    <header className="sh-hero" id="top">
      <p className="sh-eyebrow sh-in">Fully online · Open worldwide · 14–16 Nov 2026</p>

      {/* Two lines with the second indented, so the display type reads as a
          composed title rather than a centred heading in a box. */}
      <h1 className="sh-title">
        <span className="sh-in sh-in-1">Sea</span>
        <span className="sh-title-2 sh-in sh-in-2">Hacks</span>
      </h1>

      <p className="sh-lede sh-in sh-in-3">
        A 48-hour hackathon that never sleeps. As the sun sets on one coast it rises
        on another, and the build keeps going.
      </p>

      <div className="sh-hero-actions sh-in sh-in-4">
        <MagneticButton href={APPLY_URL} external>
          Apply to hack
        </MagneticButton>
        <span className="sh-countdown">
          <span className="sh-countdown-n">{days}</span>
          {days === 1 ? "day out" : "days out"}
        </span>
      </div>

      <a className="sh-scrollcue sh-in sh-in-4" href="#about">
        <span>Descend</span>
        <svg viewBox="0 0 12 28" aria-hidden="true">
          <path d="M6 0v22" />
          <path d="M1.5 17.5 6 23l4.5-5.5" />
        </svg>
      </a>
    </header>
  )
}
