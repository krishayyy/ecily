export interface Hackathon {
  name: string
  tagline: string
  date: string
  location: string
  status: "Upcoming" | "Past"
  /** Where the card links — usually the event's own subdomain. */
  url: string
  /** Path under /public. */
  image: string
}

// Every hackathon Ecily runs or has run, newest first. Add new events here —
// each becomes a card on /hackathons. No component changes needed.
export const hackathons: Hackathon[] = [
  {
    name: "Mango Hacks",
    tagline: "A beginner-friendly hackathon for high schoolers in the Bay Area.",
    date: "December 5, 2026",
    location: "Pleasanton, California",
    status: "Upcoming",
    url: "https://mangohacks.ecily.org",
    image: "/mangohacks/images/felt-scene.webp",
  },
]
