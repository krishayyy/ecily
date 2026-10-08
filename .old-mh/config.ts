/** Where "Apply" goes. Kept in its own module rather than exported from
 *  Sections: Nav and Hero both need it, and importing it from Sections made
 *  the binding land in the temporal dead zone at runtime. */
export const APPLY_URL = "https://luma.com/j95l4cwz"

/** Doors open 8:00 AM Pacific on December 5, 2026. */
export const EVENT_DATE = new Date("2026-12-05T08:00:00-08:00")

/** Whole days left until doors open, floored at zero once the day arrives.
 *  Rounded up so the morning of the 4th still reads "1 day", not "0". */
export function daysUntilEvent(now: number = Date.now()): number {
  return Math.max(0, Math.ceil((EVENT_DATE.getTime() - now) / 86_400_000))
}
