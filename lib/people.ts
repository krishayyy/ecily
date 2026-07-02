// ─────────────────────────────────────────────────────────────
// Ecily people — EDIT THIS FILE to update the Leadership + Chapters
// shown on /people. No component changes needed.
// ─────────────────────────────────────────────────────────────

export interface Leader {
  name: string
  role: string
  /** ONE concrete, verifiable line: what this person has actually built or done. No adjectives. */
  bio?: string
  /** School + class year, e.g. "Rocklin High School · Class of 2028". */
  school?: string
  /** Full LinkedIn profile URL. */
  linkedin?: string
}

// One flat founding team, in display order. Rows hide any field that's
// missing, so fill in bio/school/linkedin per person as you get them.
export const leadership: Leader[] = [
  {
    name: "Krishay Suresh",
    role: "Executive Director",
    // bio: "…",
    // school: "… High School · Class of 2028",
    // linkedin: "https://www.linkedin.com/in/…",
  },
  {
    name: "Kush Theethira",
    role: "Executive Director",
    // bio: "…",
  },
  {
    name: "Akshat Singh",
    role: "Director of Outreach",
    linkedin: "https://www.linkedin.com/in/akshtsngh",
    // bio: "…",
  },
  {
    name: "Atharv Ravanikar",
    role: "Technical Director",
    // bio: "…",
  },
  {
    name: "Ryan Yarlagadda",
    role: "Director of Marketing",
    linkedin: "https://www.linkedin.com/in/ryan-yarlagadda-08aa053b4",
    // bio: "…",
  },
]

export interface Chapter {
  school: string
  state: string
  delegate: string
}

// No chapters chartered yet. Add real chapters here as they're founded —
// each becomes a card on /people. Until then the page shows the
// "be the first" founding call. DO NOT add placeholder/fake chapters.
export const chapters: Chapter[] = []
