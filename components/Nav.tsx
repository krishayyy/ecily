"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

const links = [
  { label: "App", href: "/#app" },
  { label: "Chapters", href: "/#chapters" },
  { label: "Team", href: "/team" },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const solid = scrolled || open

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        solid
          ? "bg-[#080808]/85 backdrop-blur-md border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 sm:px-8 py-4">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="text-white font-semibold tracking-tight text-lg"
        >
          ecily
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-sm text-white/55 hover:text-white transition-colors duration-200"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/#waitlist"
            className="hidden sm:inline-flex text-sm text-white/70 hover:text-white transition-colors duration-200 px-3 py-2"
          >
            Get the app
          </Link>
          <Link
            href="/#start"
            onClick={() => setOpen(false)}
            className="inline-flex items-center rounded-full bg-[#C9A96E] text-black text-sm font-semibold px-4 py-2 hover:bg-[#E0C28A] transition-colors duration-200"
          >
            Start a chapter
          </Link>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="md:hidden ml-0.5 w-9 h-9 flex items-center justify-center text-white"
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-t border-white/[0.06] bg-[#080808]/95 backdrop-blur-md"
          >
            <div className="px-6 py-4 flex flex-col">
              {links.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-base text-white/75 hover:text-white border-b border-white/[0.05] last:border-0 transition-colors duration-200"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/#waitlist"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex items-center justify-center rounded-full border border-white/15 text-white text-sm font-semibold py-3 hover:bg-white/5 transition-colors duration-200"
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
