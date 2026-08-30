"use client"

import { useEffect, useState } from "react"
import { APPLY_URL, daysUntilEvent } from "../config"
import { FlyingToasters } from "./FlyingToasters"

/** A single retro desktop window floating over the sky, standing in for
 *  the whole hero — title bar, traffic-light dots, and a scrollable body. */
export function Hero() {
  const [days, setDays] = useState(daysUntilEvent)
  useEffect(() => {
    const id = setInterval(() => setDays(daysUntilEvent()), 3_600_000)
    return () => clearInterval(id)
  }, [])

  return (
    <header className="ch-hero" id="top">
      <FlyingToasters />

      <div className="ch-window">
        <div className="ch-titlebar">
          <span className="ch-dot ch-dot-r" />
          <span className="ch-dot ch-dot-y" />
          <span className="ch-dot ch-dot-g" />
          <span className="ch-titletext">cloud-hacks</span>
        </div>
        <div className="ch-window-body">
          <h1>Cloud Hacks</h1>
          <p className="ch-tagline">
            A fully virtual hackathon — build from wherever you are, ship something real,
            and demo it live.
          </p>
          <p className="ch-countdown">{days} {days === 1 ? "day" : "days"} until doors open</p>
          <div className="ch-cta">
            <a className="ch-btn" href={APPLY_URL} target="_blank" rel="noopener noreferrer">
              Apply to hack →
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
