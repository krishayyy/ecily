"use client"

import { motion } from "framer-motion"
import { sponsorTiers, CONTACT_EMAIL } from "@/lib/program"

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
}

export default function Sponsors() {
  return (
    <section id="sponsors" className="bg-[#080808] py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-16">
          <p className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#C9A96E]/70 mb-4">
            Partners &amp; Sponsors
          </p>
          <h2 className="text-[clamp(2.2rem,5.5vw,4rem)] font-bold text-white leading-[1.05] tracking-tight">
            Power the prize pool.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-white/50 max-w-xl mx-auto leading-relaxed">
            Sponsorship funds the scholarships and prizes that make the tournament matter
            — and puts your brand in front of students, parents, and teachers. For banks
            and credit unions, supporting financial education can count toward CRA and CSR
            goals.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {sponsorTiers.map((t) => (
            <motion.div
              key={t.name}
              {...fadeUp}
              className={`rounded-2xl p-7 flex flex-col border ${
                t.featured
                  ? "border-[#C9A96E]/40 bg-[#C9A96E]/[0.06]"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              {t.featured && (
                <span className="self-start text-[10px] tracking-[0.2em] uppercase font-mono text-[#C9A96E] mb-3">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-bold text-white">{t.name}</h3>
              <p className="text-3xl font-bold text-[#C9A96E] mt-1 mb-5">{t.amount}</p>
              <ul className="space-y-2.5 mb-6">
                {t.perks.map((perk) => (
                  <li key={perk} className="flex gap-2 text-[13px] text-white/55 leading-relaxed">
                    <span className="text-[#C9A96E] mt-[2px]">›</span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Ecily%20Sponsorship%20%E2%80%94%20${encodeURIComponent(t.name)}`}
                className={`mt-auto text-center rounded-full text-sm font-semibold py-3 transition-colors duration-200 ${
                  t.featured
                    ? "bg-[#C9A96E] text-black hover:bg-[#E0C28A]"
                    : "border border-white/15 text-white hover:bg-white/5"
                }`}
              >
                Become a sponsor
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p {...fadeUp} className="text-center text-xs text-white/30 font-mono mt-10">
          Founding sponsors — your logo here. Email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#C9A96E]/80 hover:text-[#C9A96E]">
            {CONTACT_EMAIL}
          </a>{" "}
          for the sponsorship prospectus.
        </motion.p>
      </div>
    </section>
  )
}
