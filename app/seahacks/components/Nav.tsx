"use client"

import { APPLY_URL } from "../config"

export function Nav() {
  return (
    <nav className="sh-nav">
      <div className="sh-nav-in">
        <a className="sh-brand" href="#top">🪼 Sea Hacks</a>
        <a className="sh-btn sh-btn-s" href={APPLY_URL} target="_blank" rel="noopener noreferrer">
          Apply →
        </a>
      </div>
    </nav>
  )
}
