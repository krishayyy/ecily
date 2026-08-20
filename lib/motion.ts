/* Shared motion primitives.
 *
 * `fadeUp` used to be redefined in five components with four different sets of
 * values (y of 20/24/28, duration of 0.55/0.6/0.7). That drift is why the page
 * felt assembled rather than designed — motion is a voice, and it was speaking
 * in four accents. Everything now comes from here.
 *
 * One easing curve, one travel distance, one duration. Variation comes from
 * delay and nothing else. */

export const EASE = [0.16, 1, 0.3, 1] as const

export const DUR = {
  fast: 0.22,
  base: 0.42,
  slow: 0.62,
} as const

/** Distance an element travels on entry. Small on purpose: long slides read as
 *  a template, short ones read as a settle. */
const RISE = 18

/** Scroll-triggered entrance. Spread onto any motion element. */
export const fadeUp = {
  initial: { opacity: 0, y: RISE },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-72px" },
  transition: { duration: DUR.slow, ease: EASE },
} as const

/** Scroll-triggered entrance, nth item in a group. */
export const fadeUpAt = (index: number, step = 0.07) => ({
  ...fadeUp,
  transition: { duration: DUR.slow, ease: EASE, delay: index * step },
})

/** On-load entrance, for above-the-fold content that must not wait for a
 *  scroll event that will never come. */
export const riseIn = (delay = 0) => ({
  initial: { opacity: 0, y: RISE },
  animate: { opacity: 1, y: 0 },
  transition: { duration: DUR.slow, ease: EASE, delay },
})

/** Hover/tap feedback for anything pressable. Scale stays under 1.02 — the old
 *  1.03 on a wide button visibly reflowed the text inside it. */
export const press = {
  whileHover: { scale: 1.015 },
  whileTap: { scale: 0.985 },
  transition: { duration: DUR.fast, ease: EASE },
} as const
