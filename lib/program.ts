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
      "Members work through Ecily's curriculum: budgeting, investing, credit, and taxes, built around the national standards for financial literacy.",
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
      "Found a chapter, run it, and climb the ladder, from delegate to state board to national board. Leadership you actually own.",
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

/** Application link for the National Delegate Program. */
export const DELEGATE_APPLY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSel4yzTucJ8lg5JgeF9dPqob30TNTxCJ2dCLu14xVW26jrVOA/viewform?usp=publish-editor"

/** The 12-week National Delegate Program curriculum. */
export const programPhases = [
  {
    weeks: "Weeks 01–03",
    title: "Research design",
    detail:
      "Ground your study in existing data, then design your state's survey instrument and interview guide.",
  },
  {
    weeks: "Weeks 04–06",
    title: "Data collection",
    detail:
      "Deploy your survey through school clubs and student networks; conduct interviews with students and educators.",
  },
  {
    weeks: "Weeks 07–09",
    title: "Analysis & policy framing",
    detail:
      "Turn raw data into findings, and translate findings into concrete recommendations.",
  },
  {
    weeks: "Weeks 10–12",
    title: "Report & publication",
    detail:
      "Write your final report, peer-review another state's draft, and present at the National Youth Research Showcase.",
  },
]

/** The four sections every delegate's published report contains. */
export const reportSections = [
  { tag: "01. Summary", label: "Executive summary & state overview", detail: "Key findings and context." },
  { tag: "02. Findings", label: "Youth financial pain point analysis", detail: "Survey data and interview themes." },
  { tag: "03. Method", label: "Methodology appendix", detail: "Sampling, response count, limitations." },
  { tag: "04. Recs", label: "Policy & program recommendations", detail: "Grounded in your state's findings." },
]

/** What delegates get for completing the program. */
export const delegateBenefits = [
  { title: "An official title", detail: "State Delegate & Research Fellow, Ecily." },
  { title: "Individual authorship", detail: "A published report with a permanent link, cited in the National Report." },
  { title: "Real research experience", detail: "Survey design, interviewing, analysis, and policy writing." },
  {
    title: "Eligibility for the National Research Award",
    detail:
      "Presented to the top 5 delegates nationally. Each recipient receives a personalized letter of recommendation.",
  },
]

/** Published selection criteria for the Ecily National Research Award. */
export const awardCriteria = [
  "Methodological rigor",
  "Sample diversity",
  "Recommendation quality",
  "Report clarity",
  "Peer review contribution",
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
