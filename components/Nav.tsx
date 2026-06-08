"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

const links = [
  { label: "App", href: "/#app" },
  { label: "Chapters", href: "/#chapters" },
  { label: "Tournament", href: "/#tournament" },
  { label: "Sponsors", href: "/#sponsors" },
  { label: "People", href: "/people" },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-[#080808]/80 backdrop-blur-md border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 sm:px-8 py-4">
        <Link href="/" className="text-white font-semibold tracking-tight text-lg">
          ecily
        </Link>

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

        <div className="flex items-center gap-2.5">
          <Link
            href="/#waitlist"
            className="hidden sm:inline-flex text-sm text-white/70 hover:text-white transition-colors duration-200 px-3 py-2"
          >
            Get the app
          </Link>
          <Link
            href="/#start"
            className="inline-flex items-center rounded-full bg-[#C9A96E] text-black text-sm font-semibold px-4 py-2 hover:bg-[#E0C28A] transition-colors duration-200"
          >
            Start a chapter
          </Link>
        </div>
      </nav>
    </motion.header>
  )
}
