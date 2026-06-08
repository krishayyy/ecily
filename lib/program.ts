// ─────────────────────────────────────────────────────────────
// Ecily Chapters program data — EDIT to change copy on the site.
// Kept separate from components so non-developers can update it.
// ─────────────────────────────────────────────────────────────

/** The four reasons to join — value beyond the competition. */
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
      "Delegates meet other delegates across their state, share resources, and build a network that outlasts any single competition.",
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
      "A vote on tournament rules and awards",
      "Represents your school at the state assembly",
      "Eligible to be elected to your State Board",
    ],
  },
  {
    rank: "02",
    title: "State Board",
    scope: "Governs one state",
    summary:
      "Elected from active delegates. Runs every chapter and the regional rounds within a state.",
    powers: [
      "Approves new chapters in the state",
      "Runs the state / regional competition rounds",
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
      "Runs the National Finals",
      "Sets curriculum direction and national awards",
      "Oversees the state boards",
    ],
  },
]

/** How the competition is structured. */
export const tournamentRounds = [
  {
    label: "Skills Rounds",
    detail:
      "Applied financial literacy drawn from the Ecily worlds — budgeting, investing, credit, and taxes.",
  },
  {
    label: "Solution Round",
    detail:
      "Teams are given a real-world financial scenario, build a solution, and present it to a panel of judges.",
  },
]

/** The qualification funnel — what makes the title worth winning. */
export const tournamentTiers = [
  { tier: "Chapter", detail: "Every member your chapter teaches can compete to make the team." },
  { tier: "Regional", detail: "Chapter teams advance through their state / regional round." },
  { tier: "National Finals", detail: "The top teams in the country meet at the national championship." },
]

/**
 * Sponsorship levels. These are the asks — no sponsor is confirmed yet,
 * so NO logos are shown until a partner signs on.
 */
export const sponsorTiers = [
  {
    name: "Friend of Ecily",
    amount: "$500",
    perks: [
      "Logo on the site & event materials",
      "Recognition at the tournament",
      "Supports the student prize pool",
    ],
  },
  {
    name: "Regional Sponsor",
    amount: "$1,500",
    featured: true,
    perks: [
      "Everything in Friend, plus —",
      "Named sponsor of a regional round",
      "A seat on the judging panel",
      "Impact report for CRA / CSR reporting",
    ],
  },
  {
    name: "Title Sponsor",
    amount: "$2,500+",
    perks: [
      "Everything in Regional, plus —",
      "Headline sponsor of the tournament",
      "Named scholarship / prize",
      "Speaking slot at the National Finals",
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
