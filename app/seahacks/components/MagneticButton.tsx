"use client"

import { useCallback, useRef } from "react"

/** A button that leans toward the pointer as it approaches, carries a glow
 *  that tracks the cursor across its face, and sheds a ripple on press.
 *  All three effects are pointer-driven and disabled under reduced motion,
 *  where it degrades to an ordinary button. */
export function MagneticButton({
  href,
  children,
  variant = "solid",
  external = false,
  className = "",
}: {
  href: string
  children: React.ReactNode
  variant?: "solid" | "ghost"
  external?: boolean
  className?: string
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const raf = useRef(0)

  const onMove = useCallback((e: React.PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect()
      const px = e.clientX - r.left
      const py = e.clientY - r.top
      // Pull is capped so the control never detaches from its layout slot.
      const dx = ((px - r.width / 2) / r.width) * 16
      const dy = ((py - r.height / 2) / r.height) * 10
      el.style.setProperty("--tx", `${dx.toFixed(2)}px`)
      el.style.setProperty("--ty", `${dy.toFixed(2)}px`)
      el.style.setProperty("--gx", `${((px / r.width) * 100).toFixed(1)}%`)
      el.style.setProperty("--gy", `${((py / r.height) * 100).toFixed(1)}%`)
    })
  }, [])

  const onLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    cancelAnimationFrame(raf.current)
    el.style.setProperty("--tx", "0px")
    el.style.setProperty("--ty", "0px")
  }, [])

  const onDown = useCallback((e: React.PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const ink = document.createElement("span")
    ink.className = "sh-ink"
    ink.style.left = `${e.clientX - r.left}px`
    ink.style.top = `${e.clientY - r.top}px`
    el.appendChild(ink)
    setTimeout(() => ink.remove(), 700)
  }, [])

  return (
    <a
      ref={ref}
      href={href}
      className={`sh-btn ${variant === "ghost" ? "sh-btn-ghost" : ""} ${className}`.trim()}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onPointerDown={onDown}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="sh-btn-label">{children}</span>
    </a>
  )
}
