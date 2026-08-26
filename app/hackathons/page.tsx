"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import { hackathons } from "@/lib/hackathons"

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
}

export default function HackathonsPage() {
  return (
    <>
      <Nav />
      <main className="bg-[#080808] min-h-screen">
        {/* Header */}
        <section className="relative px-6 pt-36 pb-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,169,110,0.10),transparent_55%)]" />
          <div className="relative max-w-5xl mx-auto text-center">
            <motion.p {...fadeUp} className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#C9A96E]/70 mb-4">
              Hackathons
            </motion.p>
            <motion.h1 {...fadeUp} className="text-[clamp(2.4rem,6vw,4.5rem)] font-bold text-white leading-[1.04] tracking-tight">
              Build something this weekend.
            </motion.h1>
            <motion.p {...fadeUp} className="mt-5 text-base text-white/50 max-w-xl mx-auto leading-relaxed">
              Every hackathon Ecily runs, in one place. Free to attend, built for
              beginners, and a lot more fun than studying.
            </motion.p>
          </div>
        </section>

        {/* Hackathon cards */}
        <section className="px-6 pb-32">
          <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-6">
            {hackathons.map((h) => (
              <motion.div key={h.name} {...fadeUp}>
                <Link
                  href={h.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] hover:border-[#C9A96E]/40 transition-colors duration-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={h.image}
                      alt={h.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
                    <span
                      className={`absolute top-4 left-4 text-[10px] font-mono tracking-[0.15em] uppercase px-3 py-1 rounded-full backdrop-blur-sm ${
                        h.status === "Upcoming"
                          ? "bg-[#C9A96E]/90 text-black"
                          : "bg-white/15 text-white/70"
                      }`}
                    >
                      {h.status}
                    </span>
                  </div>

                  <div className="p-6 sm:p-7">
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="text-2xl font-bold text-white tracking-tight">
                        {h.name}
                      </h2>
                      <span className="mt-1 shrink-0 text-white/30 group-hover:text-[#C9A96E] group-hover:translate-x-0.5 transition-all duration-200">
                        →
                      </span>
                    </div>
                    <p className="text-sm text-white/50 mt-2 leading-relaxed">{h.tagline}</p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-4 text-[11px] tracking-[0.1em] uppercase font-mono text-white/35">
                      <span>{h.date}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span>{h.location}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
