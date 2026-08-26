"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { SOCIAL } from "@/lib/program"

const links = [
  { label: "App", href: "/#app" },
  { label: "Delegate Program", href: "/#delegate-program" },
  { label: "National Board", href: "/team" },
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

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-4 left-0 right-0 z-50 px-4"
    >
      <div
        className={`max-w-5xl mx-auto bg-white/70 backdrop-blur-xl border border-black/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-[border-radius] duration-300 overflow-hidden ${
          open ? "rounded-[1.75rem]" : "rounded-full"
        } ${scrolled ? "shadow-[0_8px_32px_rgba(0,0,0,0.12)]" : ""}`}
      >
        <nav className="grid grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-7 py-3">
          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-sm text-black/55 hover:text-black transition-colors duration-200"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="justify-self-center font-serif text-black text-xl"
          >
            ecily
          </Link>

          {/* Right side */}
          <div className="flex items-center justify-self-end gap-3">
            <div className="hidden sm:flex items-center gap-3">
              {SOCIAL.instagram && (
                <a
                  href={SOCIAL.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ecily on Instagram"
                  className="text-black/40 hover:text-black transition-colors duration-200"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
                  </svg>
                </a>
              )}
              {SOCIAL.linkedin && (
                <a
                  href={SOCIAL.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ecily on LinkedIn"
                  className="text-black/40 hover:text-black transition-colors duration-200"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                  </svg>
                </a>
              )}
            </div>

            <a
              href="https://classroom.google.com/c/ODc0NDE4NzAzODQy?cjc=getjt3ix"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="inline-flex items-center rounded-full bg-[#C9A96E] text-black text-sm font-semibold px-4 py-2 hover:bg-[#B8965A] transition-colors duration-200"
            >
              Join the class
            </a>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="md:hidden ml-0.5 w-9 h-9 flex items-center justify-center text-black"
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
              className="md:hidden overflow-hidden border-t border-black/[0.06]"
            >
              <div className="px-6 py-4 flex flex-col">
                {links.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="py-3 text-base text-black/75 hover:text-black border-b border-black/[0.05] last:border-0 transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                ))}
                <a
                  href="https://classroom.google.com/c/ODc0NDE4NzAzODQy?cjc=getjt3ix"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="mt-4 inline-flex items-center justify-center rounded-full bg-[#C9A96E] text-black text-sm font-semibold py-3 hover:bg-[#B8965A] transition-colors duration-200"
                >
                  Join the class
                </a>
                <div className="flex items-center justify-center gap-5 mt-4 pt-4 border-t border-black/[0.05]">
                  {SOCIAL.instagram && (
                    <a
                      href={SOCIAL.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Ecily on Instagram"
                      className="text-black/40 hover:text-black transition-colors duration-200"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" />
                        <circle cx="12" cy="12" r="4" />
                        <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
                      </svg>
                    </a>
                  )}
                  {SOCIAL.linkedin && (
                    <a
                      href={SOCIAL.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Ecily on LinkedIn"
                      className="text-black/40 hover:text-black transition-colors duration-200"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
