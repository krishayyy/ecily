"use client"

import { useEffect, useState } from "react"
import { List, X } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { APPLY_URL } from "../config"

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#food", label: "Food" },
  { href: "#tracks", label: "Tracks" },
  { href: "#schedule", label: "Schedule" },
  { href: "#sponsor", label: "Sponsors" },
  { href: "/mangohacks/organizers", label: "Organizers" },
  { href: "#faq", label: "FAQ" },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const solid = scrolled || open

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 motion-reduce:transition-none ${
        solid ? "bg-night/95 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 text-cream">
        <a href="#top" className="flex items-center gap-2 font-display text-xl font-bold tracking-tight [font-stretch:90%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/mangohacks/images/sprite/mango-idle.webp" alt="" width={21} height={28} />
          Mango Hacks
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-cream/80 transition-colors hover:text-mango">
              {l.label}
            </a>
          ))}
          <Button asChild size="sm">
            <a href={APPLY_URL} target="_blank" rel="noopener noreferrer">Apply</a>
          </Button>
        </div>
        <button
          type="button"
          className="p-2 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-6 w-6" /> : <List className="h-6 w-6" />}
        </button>
      </nav>
      {open && (
        <div className="flex flex-col gap-4 px-6 pb-6 text-cream md:hidden">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-1 text-lg">
              {l.label}
            </a>
          ))}
          <div className="flex items-center gap-3">
            <Button asChild size="sm">
              <a href={APPLY_URL} target="_blank" rel="noopener noreferrer">Apply</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
