"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
}

// Only orgs that have actually featured Ecily. White knockout logos on dark.
const features = [
  {
    name: "Junior Achievement of Sacramento",
    href: "https://sacramento.ja.org",
    src: "/logos/ja-sacramento.png",
    width: 774,
    height: 262,
    className: "h-12 sm:h-14 w-auto",
  },
  {
    name: "Growth Factory Nonprofit",
    href: "https://gfnteam.org",
    src: "/logos/gfn.png",
    width: 423,
    height: 250,
    className: "h-14 sm:h-16 w-auto",
  },
]

export default function FeaturedOn() {
  return (
    <section className="bg-[#080808] py-16 px-6">
      <motion.div {...fadeUp} className="max-w-4xl mx-auto text-center">
        <p className="text-[10px] tracking-[0.25em] uppercase font-mono text-white/30 mb-9">
          Featured on
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-10">
          {features.map((f) => (
            <a
              key={f.name}
              href={f.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={f.name}
              className="opacity-55 hover:opacity-90 transition-opacity duration-300"
            >
              <Image
                src={f.src}
                alt={f.name}
                width={f.width}
                height={f.height}
                className={f.className}
              />
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
