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

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

export default function TeamPage() {
  return (
    <>
      <Nav />
      <main className="bg-cream min-h-screen">
        {/* Header */}
        <section className="relative px-6 pt-32 pb-16">
          <div className="relative max-w-5xl mx-auto text-center">
            <motion.p {...fadeUp} className="text-[10px] tracking-[0.25em] uppercase font-mono text-slate mb-4">
              National Board
            </motion.p>
            <motion.h1 {...fadeUp} className="text-[clamp(2.4rem,6vw,4.5rem)] font-extrabold text-ink leading-[1.04] tracking-tight">
              Who&apos;s building Ecily.
            </motion.h1>
            <motion.p {...fadeUp} className="mt-5 text-base text-ink/50 max-w-xl mx-auto leading-relaxed">
              The leadership running the organization — and the officials carrying it
              into states across the nation.
            </motion.p>
          </div>
        </section>

        {/* Leadership */}
        <section className="px-6 pb-24">
          <div className="max-w-5xl mx-auto">
            <motion.h2 {...fadeUp} className="text-2xl sm:text-3xl font-bold text-ink tracking-tight mb-2">
              Leadership
            </motion.h2>
            <motion.div {...fadeUp} className="h-px bg-ink/[0.08] mb-12" />

            <div className="divide-y divide-ink/[0.07]">
              {leadership.map((m) => (
                <motion.div
                  key={m.name}
                  {...fadeUp}
                  className="py-7 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3"
                >
                  <div className="min-w-0 max-w-xl">
                    <div className="flex flex-wrap items-baseline gap-x-3">
                      <h3 className="text-xl sm:text-2xl font-semibold text-ink tracking-tight">
                        {m.name}
                      </h3>
                      <span className="text-[12px] text-slate">{m.role}</span>
                    </div>
                    {m.bio && (
                      <p className="text-sm text-ink/50 mt-1.5 leading-relaxed">{m.bio}</p>
                    )}
                  </div>
                  {(m.school || m.linkedin) && (
                    <div className="flex items-center gap-5 shrink-0">
                      {m.school && (
                        <span className="text-[10px] tracking-[0.15em] uppercase font-mono text-ink/35">
                          {m.school}
                        </span>
                      )}
                      {m.linkedin && (
                        <a
                          href={m.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${m.name} on LinkedIn`}
                          className="text-ink/35 hover:text-slate transition-colors duration-200"
                        >
                          <LinkedInIcon />
                        </a>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Join the team */}
        <section className="px-6 pb-24">
          <div className="max-w-5xl mx-auto">
            <motion.div
              {...fadeUp}
              className="rounded-3xl bg-slate/10 p-10 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6"
            >
              <div>
                <h3 className="text-2xl font-bold text-ink tracking-tight mb-2">
                  Want to help build Ecily?
                </h3>
                <p className="text-sm text-ink/50 max-w-md leading-relaxed">
                  We&apos;re a small team growing fast. If you want to lead outreach,
                  build product, run a state, or start a chapter — we want to hear from you.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=I%20want%20to%20join%20the%20Ecily%20team`}
                  className="inline-flex justify-center rounded-full bg-ink text-cream text-sm font-semibold px-6 py-3 hover:bg-grape transition-colors duration-200"
                >
                  Join the team
                </a>
                <Link
                  href="/#start"
                  className="inline-flex justify-center rounded-full border border-ink/15 text-ink text-sm font-semibold px-6 py-3 hover:bg-ink/5 transition-colors duration-200"
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
            <motion.h2 {...fadeUp} className="text-2xl sm:text-3xl font-bold text-ink tracking-tight mb-2">
              Chapters
            </motion.h2>
            <motion.div {...fadeUp} className="h-px bg-ink/[0.08] mb-12" />

            {chapters.length === 0 ? (
              <motion.div
                {...fadeUp}
                className="rounded-3xl bg-ink text-cream p-10 sm:p-14 text-center"
              >
                <p className="text-sand font-mono text-sm tracking-wide mb-3">No chapters yet.</p>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                  Be the first.
                </h3>
                <p className="text-sm text-cream/50 max-w-md mx-auto mb-8 leading-relaxed">
                  Found your school&apos;s chapter and your name appears here as a Founding
                  State Delegate. Every chapter after yours started second.
                </p>
                <Link
                  href="/#start"
                  className="inline-flex rounded-full bg-cream text-ink text-sm font-semibold px-6 py-3 hover:bg-sand transition-colors duration-200"
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
                    className="rounded-2xl bg-white border border-ink/[0.08] p-6"
                  >
                    <p className="text-ink font-semibold">{c.school}</p>
                    <p className="text-[13px] text-ink/40 mt-0.5">{c.state}</p>
                    <p className="text-xs text-ink/35 mt-3">
                      Delegate · <span className="text-ink/55">{c.delegate}</span>
                    </p>
                  </motion.div>
                ))}
              </div>
            )}

            <motion.p {...fadeUp} className="text-center text-xs text-ink/35 font-mono mt-10">
              Questions?{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-slate hover:text-grape">
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
