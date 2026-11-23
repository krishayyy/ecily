export const APPLY_URL = "https://luma.com/j95l4cwz"
export const CONTACT_EMAIL = "mangohacksteam@gmail.com"
export const EVENT_DATE = new Date("2027-01-23T09:00:00-08:00")

export function daysUntilEvent(now: number = Date.now()): number {
  return Math.max(0, Math.ceil((EVENT_DATE.getTime() - now) / 86_400_000))
}

export function sponsorMailto(tier: string) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Mango Hacks ${tier} sponsorship`)}`
}
