"use client"

import { useEffect, useState } from "react"
import { APPLY_URL } from "../config"

export function Nav() {
  const [lifted, setLifted] = useState(false)
  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav className={`sh-nav${lifted ? " is-lifted" : ""}`}>
      <a className="sh-wordmark" href="#top">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 11a8 8 0 0 1 16 0" />
          <path d="M4 11c1.6 0 1.6 2 3.2 2s1.6-2 3.2-2 1.6 2 3.2 2 1.6-2 3.2-2 1.6 2 3.2 2" />
          <path d="M8.5 14c0 3-1.5 4-1.5 6.5M12 14c0 3.5-.6 4.5-.6 7M15.5 14c0 3 1.5 4 1.5 6.5" />
        </svg>
        <span>Sea Hacks</span>
      </a>
      <div className="sh-nav-links">
        <a href="#tracks">Tracks</a>
        <a href="#schedule">Schedule</a>
        <a href="#faq">FAQ</a>
        <a className="sh-btn sh-btn-sm" href={APPLY_URL} target="_blank" rel="noopener noreferrer">
          Apply
        </a>
      </div>
    </nav>
  )
}
