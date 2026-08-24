"use client"

import { motion } from "framer-motion"

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
}

const segments = [
  {
    label: "K-12",
    title: "Students",
    detail: "Learning the line between using AI and letting it think for you — and how to build real, high-impact work with it.",
    bg: "bg-sand/40",
  },
  {
    label: "Classrooms",
    title: "Educators",
    detail: "Practical ways to use AI for efficiency in teaching, without losing what makes teaching work.",
    bg: "bg-sage/35",
  },
  {
    label: "Everyday work",
    title: "Non-technical workforce",
    detail: "No-code AI workflows that save real hours — a resource library, not a course.",
    bg: "bg-slate/20",
  },
  {
    label: "On the ground",
    title: "Underserved communities",
    detail: "Access and know-how delivered through the nonprofits and community centers people already trust.",
    bg: "bg-grape/15",
  },
  {
    label: "Builders",
    title: "Technical youth",
    detail: "Hands-on skill — hackathons, real tools, real projects — for teens ready to build with AI, not just use it.",
    bg: "bg-plum/15",
  },
]

export default function Segments() {
  return (
    <section id="who" className="relative bg-cream py-24 px-6 scroll-mt-24">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp} className="mb-12 text-center">
          <p className="text-[10px] tracking-[0.25em] uppercase font-mono text-slate mb-4">
            Who we serve
          </p>
          <h2 className="text-[clamp(1.8rem,4.2vw,2.8rem)] font-extrabold text-ink leading-[1.1] tracking-tight text-balance">
            Five groups. One gap.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {segments.map((s, i) => (
            <motion.div
              key={s.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.06 }}
              className={`rounded-3xl ${s.bg} p-6 flex flex-col ${i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}
            >
              <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-ink/40 mb-3">
                {s.label}
              </span>
              <h3 className="text-lg font-bold text-ink mb-2">{s.title}</h3>
              <p className="text-sm text-ink/55 leading-relaxed">{s.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
