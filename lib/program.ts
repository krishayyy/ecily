// ─────────────────────────────────────────────────────────────
// Ecily Chapters program data — EDIT to change copy on the site.
// Kept separate from components so non-developers can update it.
// ─────────────────────────────────────────────────────────────

/** The four reasons to join. */
export const pillars = [
  {
    key: "Learn",
    title: "Learn",
    detail:
      "Members work through Ecily's curriculum — budgeting, investing, credit, taxes — built around the national standards for financial literacy.",
  },
  {
    key: "Serve",
    title: "Serve",
    detail:
      "Chapters teach what they learn to their school and community. Real impact, and recognized volunteer hours for the people who lead it.",
  },
  {
    key: "Connect",
    title: "Connect",
    detail:
      "Delegates meet other delegates across their state, share resources, and build a network that outlasts high school.",
  },
  {
    key: "Lead",
    title: "Lead",
    detail:
      "Found a chapter, run it, and climb the ladder — from delegate to state board to national board. Leadership you actually own.",
  },
]

/** The leadership ladder — Delegate → State Board → National Board. */
export const ladder = [
  {
    rank: "01",
    title: "State Delegate",
    scope: "Leads one chapter",
    summary:
      "You found and lead your school's chapter and represent it at the state level.",
    powers: [
      "Founder & President of your chapter",
      "A vote on program rules and awards",
      "Represents your school at the state assembly",
      "Eligible to be elected to your State Board",
    ],
  },
  {
    rank: "02",
    title: "State Board",
    scope: "Governs one state",
    summary:
      "Elected from active delegates. Leads and grows every chapter in the state.",
    powers: [
      "Approves new chapters in the state",
      "Leads statewide teaching initiatives",
      "Supports and coordinates delegates",
      "Sets state-level events and awards",
    ],
  },
  {
    rank: "03",
    title: "National Board",
    scope: "Governs the organization",
    summary:
      "A small group selected from top state leaders. Sets the rules every state follows.",
    powers: [
      "Writes the rules all chapters follow",
      "Runs national events and initiatives",
      "Sets curriculum direction and national awards",
      "Oversees the state boards",
    ],
  },
]

/** Contact address used across CTAs. */
export const CONTACT_EMAIL = "joinecily@gmail.com"

/**
 * Social links. Leave a value as "" to hide that icon.
 * Add the LinkedIn page URL when you have it.
 */
export const SOCIAL = {
  instagram: "https://www.instagram.com/join.ecily",
  linkedin: "https://www.linkedin.com/company/ecilyco",
}
