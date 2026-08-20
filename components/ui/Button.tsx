"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { press } from "@/lib/motion"

/* The palette has no saturated accent — Dry Sage is 1.71:1 on Ivory, so it can
 * never be a button fill with text on it. Emphasis therefore comes from value,
 * not hue: the primary action is solid ink on the ivory ground (9.47:1) and
 * solid ivory on the dark theatre (also 9.47:1). That constraint is the whole
 * reason the buttons look the way they do. */

type Variant = "primary" | "secondary" | "quiet"
type Tone = "light" | "theatre"

const styles: Record<Tone, Record<Variant, string>> = {
  light: {
    primary: "bg-ink text-canvas hover:bg-ink-2 shadow-lift",
    secondary: "border border-hairline-strong text-ink hover:bg-canvas-sunk",
    quiet: "text-ink-2 hover:text-ink",
  },
  theatre: {
    primary: "bg-on-theatre text-theatre hover:bg-sage",
    secondary: "border border-theatre-line text-on-theatre hover:bg-theatre-rise",
    quiet: "text-on-theatre-2 hover:text-on-theatre",
  },
}

const sizes = {
  base: "px-6 py-3 text-small",
  lg: "px-7 py-3.5 text-body",
} as const

export default function Button({
  href,
  external = false,
  variant = "primary",
  tone = "light",
  size = "base",
  className = "",
  onClick,
  type,
  children,
}: {
  href?: string
  external?: boolean
  variant?: Variant
  tone?: Tone
  size?: keyof typeof sizes
  className?: string
  onClick?: () => void
  type?: "button" | "submit"
  children: ReactNode
}) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full font-semibold
    transition-colors duration-fast ease-ease disabled:opacity-50
    ${styles[tone][variant]} ${sizes[size]} ${className}`

  if (href) {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...press}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button type={type ?? "button"} onClick={onClick} className={cls} {...press}>
      {children}
    </motion.button>
  )
}
