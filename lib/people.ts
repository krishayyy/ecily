// ─────────────────────────────────────────────────────────────
// Ecily people — EDIT THIS FILE to update the Leadership + Chapters
// shown on /people. No component changes needed.
// ─────────────────────────────────────────────────────────────

export interface Leader {
  name: string
  role: string
  /** Optional one-liner shown under the name. */
  bio?: string
}

/** Leadership tiers, in display order. */
export interface LeadershipGroup {
  title: string
  members: Leader[]
}

export const leadership: LeadershipGroup[] = [
  {
    title: "Executive Directors",
    members: [
      { name: "Krishay Suresh", role: "Executive Director" },
      { name: "Kush Theethira", role: "Executive Director" },
    ],
  },
  {
    title: "Directors of Outreach",
    members: [
      { name: "Akshat Singh", role: "Director of Outreach" },
      { name: "Atharv Ravanikar", role: "Director of Outreach" },
    ],
  },
  {
    title: "Marketing",
    members: [
      { name: "Ryan Yarlagadda", role: "Director of Marketing" },
    ],
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
