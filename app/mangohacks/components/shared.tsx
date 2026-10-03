"use client"

import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

/** One container, one vertical rhythm, used by every section. */
export function Section({
  id,
  className,
  inner,
  children,
}: {
  id?: string
  className?: string
  inner?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className={cn("scroll-mt-20 py-20 md:py-28", className)}>
      <div className={cn("mx-auto max-w-6xl px-6", inner)}>{children}</div>
    </section>
  )
}

/** Section heading. Same size, weight and spacing everywhere. */
export function Heading({
  title,
  lede,
  className,
}: {
  title: React.ReactNode
  lede?: React.ReactNode
  className?: string
}) {
  return (
    <Reveal className={cn("max-w-2xl", className)}>
      <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-cream [font-stretch:92%] md:text-[3.5rem]">
        {title}
      </h2>
      {lede && <p className="mt-5 text-lg leading-relaxed text-cream/70">{lede}</p>}
    </Reveal>
  )
}

/** Quiet fade-up on enter. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: "div" | "li"
}) {
  const reduce = useReducedMotion()
  const Comp = as === "li" ? motion.li : motion.div
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  )
}

/** Round icon badge. Icon wiggles when its parent `.group` is hovered. */
export function IconBadge({
  children,
  tone = "mango",
  className,
}: {
  children: React.ReactNode
  tone?: "mango" | "leaf" | "night"
  className?: string
}) {
  const tones = {
    mango: "bg-mango/15 text-mango",
    leaf: "bg-leaf/15 text-leaf",
    night: "bg-night/10 text-night",
  }
  return (
    <span
      className={cn(
        "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl [&>svg]:h-6 [&>svg]:w-6 [&>svg]:transition-transform group-hover:[&>svg]:animate-wiggle motion-reduce:group-hover:[&>svg]:animate-none",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
