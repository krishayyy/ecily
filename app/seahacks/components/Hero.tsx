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
        <p className="sh-eyebrow">A fully virtual, international hackathon</p>
        <h1>Welcome to Sea Hacks</h1>
        <p className="sh-tagline">
          Every coastline, every timezone, one tide — build from wherever you are,
          ship something real, and demo it live.
        </p>
        <p className="sh-countdown">{days} {days === 1 ? "day" : "days"} until we dive in</p>
        <div className="sh-cta">
          <a className="sh-btn" href={APPLY_URL} target="_blank" rel="noopener noreferrer">
            Apply to hack →
          </a>
        </div>
      </div>
    </header>
  )
}
