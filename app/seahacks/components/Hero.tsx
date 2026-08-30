"use client"

import { useEffect, useState } from "react"
import { APPLY_URL, daysUntilEvent } from "../config"
import { JellyfishOcean } from "./Jellyfish"

export function Hero() {
  const [days, setDays] = useState(daysUntilEvent)
  useEffect(() => {
    const id = setInterval(() => setDays(daysUntilEvent()), 3_600_000)
    return () => clearInterval(id)
  }, [])

  return (
    <header className="sh-hero" id="top">
      <JellyfishOcean />

      <div className="sh-card">
        <h1>Sea Hacks</h1>
        <p className="sh-tagline">
          A fully virtual, international hackathon. Every coastline, every timezone,
          one tide — build from wherever you are.
        </p>
        <p className="sh-countdown">{days} {days === 1 ? "day" : "days"} until we dive in</p>
        <div className="sh-cta">
          <a className="sh-btn" href={APPLY_URL} target="_blank" rel="noopener noreferrer">
            Apply to hack →
          </a>
        </div>
      </div>

      <svg className="sh-wave" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 60 C 240 110, 480 10, 720 60 C 960 110, 1200 10, 1440 60 L1440 120 L0 120 Z" />
      </svg>
    </header>
  )
}
