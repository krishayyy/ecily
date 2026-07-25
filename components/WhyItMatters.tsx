"use client"

import { motion } from "framer-motion"

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
}

/* Every stat is real and links to its primary source — the citation IS the
   credibility. Do not edit a number without updating its source + year. */
type Stat = {
  value: string
  label: string
  source: string
  href: string
}

const stats: Stat[] = [
  {
    value: "20",
    label: "states where a teen can still graduate without one personal finance class",
    source: "NGPF Survey of the States, 2025",
    href: "https://www.ngpf.org/state-of-financial-education-report/",
  },
  {
    value: "44%",
    label: "of 18 to 34 year olds could answer a basic question about inflation",
    source: "FINRA Foundation, 2024",
    href: "https://www.finra.org/media-center/newsreleases/2025/finra-foundation-releases-sixth-wave-national-financial-capability",
  },
  {
    value: "83%",
    label: "of U.S. adults say personal finance should be required to graduate",
    source: "NEFE national poll, 2025",
    href: "https://www.nefe.org/news/2025/04/poll-majority-of-us-adults-want-financial-education-in-high-schools.aspx",
  },
]

export default function WhyItMatters() {
  return (
    <section id="why" className="relative bg-[#FBF6EC] py-32 px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div {...fadeUp} className="mb-16 text-center">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-[#B0813A]">
            Why this matters
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.4rem)] font-extrabold leading-[1.08] tracking-tight text-[#1C1A16] text-balance">
            Most teens never get taught how money works.
          </h2>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.value}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.1 }}
              className="flex flex-col rounded-2xl border border-black/[0.07] bg-white p-8 shadow-[0_8px_30px_rgba(28,26,22,0.05)]"
            >
              <span className="text-[clamp(2.8rem,7vw,4.4rem)] font-extrabold leading-none tracking-tight text-[#B0813A]">
                {s.value}
              </span>
              <p className="mt-5 text-[15px] leading-relaxed text-[#1C1A16]/65">
                {s.label}
              </p>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 border-t border-black/[0.07] pt-4 font-mono text-[11px] uppercase tracking-wider text-[#1C1A16]/35 transition-colors duration-200 hover:text-[#B0813A]"
              >
                {s.source} ↗
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          {...fadeUp}
          className="mx-auto mt-14 max-w-xl text-center text-base leading-relaxed text-[#1C1A16]/60 sm:text-lg"
        >
          Ecily exists to close that gap, and to make learning it something teens
          actually want to do.
        </motion.p>
      </div>
    </section>
  )
}
