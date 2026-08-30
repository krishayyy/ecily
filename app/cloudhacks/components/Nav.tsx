"use client"

import { APPLY_URL } from "../config"

export function Nav() {
  return (
    <nav className="ch-nav">
      <div className="ch-nav-in">
        <a className="ch-brand" href="#top">☁️ Cloud Hacks</a>
        <a className="ch-btn ch-btn-s" href={APPLY_URL} target="_blank" rel="noopener noreferrer">
          Apply →
        </a>
      </div>
    </nav>
  )
}
