"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

const links = [
  { label: "Mission", href: "/#mission" },
  { label: "Chapters", href: "/#delegate-program" },
  { label: "App", href: "/#app" },
  { label: "Team", href: "/team" },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-4 left-0 right-0 z-50 px-4"
    >
      <nav className="max-w-4xl mx-auto flex items-center justify-between gap-4 rounded-full bg-white/80 backdrop-blur-md border border-ink/[0.06] shadow-[0_8px_30px_rgba(22,21,15,0.06)] px-5 py-2.5">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="text-ink font-bold tracking-tight text-lg shrink-0"
        >
          ecily<span className="text-slate">.</span>
        </Link>

        {/* Desktop links — pill-in-pill, Cleo-style */}
        <div className="hidden md:flex items-center gap-1 rounded-full bg-ink/[0.04] p-1">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-sm text-ink/60 hover:text-ink hover:bg-white rounded-full px-4 py-1.5 transition-colors duration-200"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Link
            href="/#start"
            onClick={() => setOpen(false)}
            className="inline-flex items-center rounded-full bg-ink text-cream text-sm font-semibold px-4 py-2 hover:bg-grape transition-colors duration-200"
          >
            Start a chapter
          </Link>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="md:hidden ml-0.5 w-9 h-9 flex items-center justify-center text-ink shrink-0"
          >
            <div className="relative w-5 h-3.5">
              <span
                className={`absolute left-0 top-0 h-[2px] w-5 bg-current rounded transition-all duration-300 ${
                  open ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 bottom-0 h-[2px] w-5 bg-current rounded transition-all duration-300 ${
                  open ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden max-w-4xl mx-auto mt-2 rounded-3xl bg-white/95 backdrop-blur-md border border-ink/[0.06] shadow-[0_8px_30px_rgba(22,21,15,0.08)] overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col">
              {links.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-base text-ink/75 hover:text-ink border-b border-ink/[0.05] last:border-0 transition-colors duration-200"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/#waitlist"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex items-center justify-center rounded-full border border-ink/15 text-ink text-sm font-semibold py-3 hover:bg-ink/5 transition-colors duration-200"
              >
                Get the app
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
