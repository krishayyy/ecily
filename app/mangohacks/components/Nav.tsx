"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { APPLY_URL } from "../config"

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#tracks", label: "Tracks" },
  { href: "#schedule", label: "Schedule" },
  { href: "#sponsor", label: "Sponsors" },
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
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 text-cream">
        <a href="#top" className="font-display text-xl">
          Mango Hacks
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm hover:text-mango">
              {l.label}
            </a>
          ))}
          <span className="rounded-full border border-cream/30 px-3 py-1 text-xs">Dec 5</span>
          <Button asChild size="sm" className="bg-mango text-night hover:bg-mango/90">
            <a href={APPLY_URL}>Apply</a>
          </Button>
        </div>
        <button
          type="button"
          className="p-2 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>
      {open && (
        <div className="flex flex-col gap-4 px-5 pb-6 text-cream md:hidden">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-1 text-lg">
              {l.label}
            </a>
          ))}
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-cream/30 px-3 py-1 text-xs">Dec 5</span>
            <Button asChild size="sm" className="bg-mango text-night hover:bg-mango/90">
              <a href={APPLY_URL}>Apply</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
