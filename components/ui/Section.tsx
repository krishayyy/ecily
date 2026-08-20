import type { ReactNode } from "react"

/* Every section on the site goes through here.
 *
 * Two things this enforces that the old page could not:
 *   1. Rhythm. Sections used to be uniformly `py-32`, which flattened the whole
 *      page — when everything is emphasized, nothing is. `size` maps a
 *      section's weight to its breathing room.
 *   2. Ground. There are exactly three legal backgrounds. A component can no
 *      longer invent a fourth near-black the way `#080808`, `#0C0C0C` and
 *      `#060606` all coexisted before for no expressible reason. */

type Ground = "canvas" | "sunk" | "theatre"
type Size = "sm" | "base" | "lg"

const grounds: Record<Ground, string> = {
  canvas: "bg-canvas text-ink",
  sunk: "bg-canvas-sunk text-ink",
  // `on-theatre` is the hook globals.css uses to flip focus rings and grain
  // blend mode for the dark ground.
  theatre: "on-theatre bg-theatre text-on-theatre",
}

const sizes: Record<Size, string> = {
  sm: "section-sm",
  base: "section",
  lg: "section-lg",
}

export default function Section({
  id,
  ground = "canvas",
  size = "base",
  grain = true,
  className = "",
  containerClassName = "",
  bleed = false,
  children,
}: {
  id?: string
  ground?: Ground
  size?: Size
  /** Paper texture. Turn off only where a child owns the full bleed itself. */
  grain?: boolean
  className?: string
  containerClassName?: string
  /** Skip the centered container — for marquees and other edge-to-edge content. */
  bleed?: boolean
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className={`relative isolate overflow-hidden ${grounds[ground]} ${sizes[size]} ${
        grain ? "grain" : ""
      } ${id ? "scroll-mt-20" : ""} ${className}`}
    >
      {bleed ? (
        children
      ) : (
        <div className={`relative z-10 mx-auto max-w-shell px-6 sm:px-8 ${containerClassName}`}>
          {children}
        </div>
      )}
    </section>
  )
}
