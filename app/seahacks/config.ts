/** Where "Apply" goes. Placeholder until a real signup link exists. */
export const APPLY_URL = "https://luma.com/seahacks"

/** Placeholder date — update once the event is scheduled. */
export const EVENT_DATE = new Date("2026-11-14T09:00:00-08:00")

/** Whole days left until doors open, floored at zero once the day arrives. */
export function daysUntilEvent(now: number = Date.now()): number {
  return Math.max(0, Math.ceil((EVENT_DATE.getTime() - now) / 86_400_000))
}
