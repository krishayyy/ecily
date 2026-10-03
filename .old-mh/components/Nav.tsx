"use client"

import { useEffect, useState } from "react"
import { APPLY_URL } from "../config"

export function Nav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  // Mobile menu is a dialog-ish overlay: Escape and an outside click should
  // both dismiss it, same as any other transient panel on the page.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close() }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <nav>
      <div className="nav-in">
        <a className="brand" href="#top">
          <img src="/mangohacks/images/felt/mango-body.webp" alt="" width={27} height={31} />
          Mango Hacks
        </a>
        <button className="burger" aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open} aria-controls="nav-links" onClick={() => setOpen((o) => !o)}>
          {open ? "✕" : "☰"}
        </button>
        <div className={`nav-links${open ? " open" : ""}`} id="nav-links">
          <a href="#venue" onClick={close}>venue</a>
          <a href="#about" onClick={close}>about</a>
          <a href="#tracks" onClick={close}>tracks</a>
          <a href="#schedule" onClick={close}>schedule</a>
          <a href="#sponsor" onClick={close}>sponsors</a>
          <a href="#faq" onClick={close}>faq</a>
          <a className="btn btn-felt btn-s" href={APPLY_URL} target="_blank"
            rel="noopener noreferrer" onClick={close}>Apply</a>
        </div>
      </div>
    </nav>
  )
}
