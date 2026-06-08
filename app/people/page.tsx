"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import { leadership, chapters } from "@/lib/people"
import { CONTACT_EMAIL } from "@/lib/program"

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export default function PeoplePage() {
  return (
    <>
      <Nav />
      <main className="bg-[#080808] min-h-screen">
        {/* Header */}
        <section className="relative px-6 pt-36 pb-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,169,110,0.10),transparent_55%)]" />
          <div className="relative max-w-5xl mx-auto text-center">
            <motion.p {...fadeUp} className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#C9A96E]/70 mb-4">
              The people
            </motion.p>
            <motion.h1 {...fadeUp} className="text-[clamp(2.4rem,6vw,4.5rem)] font-bold text-white leading-[1.04] tracking-tight">
              Who&apos;s building Ecily.
            </motion.h1>
            <motion.p {...fadeUp} className="mt-5 text-base text-white/50 max-w-xl mx-auto leading-relaxed">
              The leadership running the organization — and the chapters carrying it
              into schools across the country.
            </motion.p>
          </div>
        </section>

        {/* Leadership */}
        <section className="px-6 pb-24">
          <div className="max-w-5xl mx-auto">
            <motion.h2 {...fadeUp} className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
              Leadership
            </motion.h2>
            <motion.div {...fadeUp} className="h-px bg-white/[0.08] mb-12" />

            <div className="space-y-14">
              {leadership.map((group) => (
                <motion.div key={group.title} {...fadeUp}>
                  <p className="text-[10px] tracking-[0.25em] uppercase font-mono text-white/30 mb-5">
                    {group.title}
                  </p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {group.members.map((m) => (
                      <div
                        key={m.name}
                        className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 flex items-center gap-4"
                      >
                        <div className="w-12 h-12 shrink-0 rounded-full bg-[#C9A96E]/15 border border-[#C9A96E]/30 flex items-center justify-center">
                          <span className="text-[#C9A96E] font-semibold text-sm">{initials(m.name)}</span>
                        </div>
                        <div>
                          <p className="text-white font-semibold leading-tight">{m.name}</p>
                          <p className="text-[13px] text-white/40 mt-0.5">{m.role}</p>
                          {m.bio && <p className="text-xs text-white/35 mt-1.5 leading-relaxed">{m.bio}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Chapters */}
        <section className="px-6 pb-32">
          <div className="max-w-5xl mx-auto">
            <motion.h2 {...fadeUp} className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
              Chapters
            </motion.h2>
            <motion.div {...fadeUp} className="h-px bg-white/[0.08] mb-12" />

            {chapters.length === 0 ? (
              <motion.div
                {...fadeUp}
                className="rounded-3xl border border-[#C9A96E]/20 bg-gradient-to-b from-[#C9A96E]/[0.06] to-transparent p-10 sm:p-14 text-center"
              >
                <p className="text-[#C9A96E] font-mono text-sm tracking-wide mb-3">No chapters yet.</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
                  Be the first.
                </h3>
                <p className="text-sm text-white/45 max-w-md mx-auto mb-8 leading-relaxed">
                  Found your school&apos;s chapter and your name appears here as a Founding
                  State Delegate. Every chapter after yours started second.
                </p>
                <Link
                  href="/#start"
                  className="inline-flex rounded-full bg-[#C9A96E] text-black text-sm font-semibold px-6 py-3 hover:bg-[#E0C28A] transition-colors duration-200"
                >
                  Start a chapter
                </Link>
              </motion.div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {chapters.map((c) => (
                  <motion.div
                    key={`${c.school}-${c.state}`}
                    {...fadeUp}
                    className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6"
                  >
                    <p className="text-white font-semibold">{c.school}</p>
                    <p className="text-[13px] text-white/40 mt-0.5">{c.state}</p>
                    <p className="text-xs text-white/35 mt-3">
                      Delegate · <span className="text-white/55">{c.delegate}</span>
                    </p>
                  </motion.div>
                ))}
              </div>
            )}

            <motion.p {...fadeUp} className="text-center text-xs text-white/30 font-mono mt-10">
              Questions?{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#C9A96E]/80 hover:text-[#C9A96E]">
                {CONTACT_EMAIL}
              </a>
            </motion.p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
