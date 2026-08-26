"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import { founders, chapterPresidents, chapters, type Leader } from "@/lib/people"
import { CONTACT_EMAIL } from "@/lib/program"

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

function PeopleSection({ title, people }: { title: string; people: Leader[] }) {
  if (people.length === 0) return null

  return (
    <section className="px-6 pb-24">
      <div className="max-w-5xl mx-auto">
        <motion.h2 {...fadeUp} className="text-[11px] tracking-[0.2em] uppercase font-mono text-white/40 mb-6">
          {title}
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {people.map((m) => (
            <motion.div key={m.name} {...fadeUp}>
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white/[0.04] border border-white/[0.08]">
                {m.photo ? (
                  <Image
                    src={m.photo}
                    alt={m.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover"
                    style={{ objectPosition: m.photoPosition ?? "center 25%" }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/20 text-4xl font-serif">
                    {m.name.charAt(0)}
                  </div>
                )}
                {m.linkedin && (
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${m.name} on LinkedIn`}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-[#C9A96E] hover:bg-black/70 transition-colors duration-200"
                  >
                    <LinkedInIcon />
                  </a>
                )}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white tracking-tight">{m.name}</h3>
              <p className="text-sm text-[#C9A96E]/80">{m.role}</p>
              {m.school && (
                <p className="text-[11px] text-white/35 font-mono mt-1">{m.school}</p>
              )}
              {m.bio && (
                <p className="text-sm text-white/50 mt-1.5 leading-relaxed">{m.bio}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function TeamPage() {
  return (
    <>
      <Nav />
      <main className="bg-[#080808] min-h-screen">
        {/* Header */}
        <section className="relative px-6 pt-36 pb-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,169,110,0.10),transparent_55%)]" />
          <div className="relative max-w-5xl mx-auto text-center">
            <motion.p {...fadeUp} className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#C9A96E]/70 mb-4">
              National Board
            </motion.p>
            <motion.h1 {...fadeUp} className="text-[clamp(2.4rem,6vw,4.5rem)] font-bold text-white leading-[1.04] tracking-tight">
              The team behind Ecily.
            </motion.h1>
            <motion.p {...fadeUp} className="mt-5 text-base text-white/50 max-w-xl mx-auto leading-relaxed">
              The founders and chapter leaders building Ecily.
            </motion.p>
          </div>
        </section>

        {/* Founders */}
        <PeopleSection title="Founders" people={founders} />

        {/* Chapter Presidents */}
        <PeopleSection title="Chapter Presidents" people={chapterPresidents} />

        {/* Join the team */}
        <section className="px-6 pb-24">
          <div className="max-w-5xl mx-auto">
            <motion.div
              {...fadeUp}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6"
            >
              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
                  Want to help build Ecily?
                </h3>
                <p className="text-sm text-white/45 max-w-md leading-relaxed">
                  We&apos;re a small team growing fast. If you want to lead outreach,
                  build product, run a state, or start a chapter — we want to hear from you.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=I%20want%20to%20join%20the%20Ecily%20team`}
                  className="inline-flex justify-center rounded-full bg-[#C9A96E] text-black text-sm font-semibold px-6 py-3 hover:bg-[#E0C28A] transition-colors duration-200"
                >
                  Join the team
                </a>
                <Link
                  href="/#start"
                  className="inline-flex justify-center rounded-full border border-white/15 text-white text-sm font-semibold px-6 py-3 hover:bg-white/5 transition-colors duration-200"
                >
                  Start a chapter
                </Link>
              </div>
            </motion.div>
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
