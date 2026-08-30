/** Where "Apply" goes. PLACEHOLDER — swap for the real signup link. */
export const APPLY_URL = "https://luma.com/seahacks"
export const SPONSOR_EMAIL = "sponsors@seahacks.org"

/** PLACEHOLDER — opening ceremony, 16:00 UTC Saturday 14 November 2026. */
export const EVENT_DATE = new Date("2026-11-14T16:00:00Z")

/** Whole days left until doors open, floored at zero once the day arrives. */
export function daysUntilEvent(now: number = Date.now()): number {
  return Math.max(0, Math.ceil((EVENT_DATE.getTime() - now) / 86_400_000))
}

export const STATS = [
  { value: "48", unit: "hours", label: "Continuous, start to submission" },
  { value: "24", unit: "timezones", label: "Open to builders anywhere on earth" },
  { value: "$25k", unit: "in prizes", label: "Across four tracks and specials" },
  { value: "100%", unit: "online", label: "No travel, no visa, no venue" },
]

export const TRACKS = [
  {
    name: "AI & Agents",
    body: "Systems that reason, plan, or act on a person's behalf. Multi-agent architectures, retrieval, evals, tooling that makes any of it less painful to build.",
  },
  {
    name: "Tools for Builders",
    body: "Developer experience, infrastructure, and the unglamorous software that other software stands on. Ship the thing you keep wishing existed.",
  },
  {
    name: "Climate & Ocean",
    body: "Monitoring, modelling, logistics, and access. Projects that take a real environmental problem seriously, judged on rigour as much as polish.",
  },
  {
    name: "Wildcard",
    body: "Anything that does not fit the three above. Games, art, hardware bridges, things with no obvious category. Judged on ambition and craft.",
  },
]

/** The schedule is the one place the "international" premise is literal, so
 *  it ships as data across four zones rather than one local time. Offsets are
 *  fixed for the event weekend (PST −8, EST −5, IST +5:30). */
export const SCHEDULE = [
  { utc: "Sat 16:00", pt: "Sat 08:00", et: "Sat 11:00", ist: "Sat 21:30", event: "Opening ceremony" },
  { utc: "Sat 17:00", pt: "Sat 09:00", et: "Sat 12:00", ist: "Sat 22:30", event: "Team formation" },
  { utc: "Sat 18:00", pt: "Sat 10:00", et: "Sat 13:00", ist: "Sat 23:30", event: "Hacking begins" },
  { utc: "Sun 06:00", pt: "Sat 22:00", et: "Sun 01:00", ist: "Sun 11:30", event: "Workshops — Asia-Pacific block" },
  { utc: "Sun 18:00", pt: "Sun 10:00", et: "Sun 13:00", ist: "Sun 23:30", event: "Workshops — Americas block" },
  { utc: "Mon 18:00", pt: "Mon 10:00", et: "Mon 13:00", ist: "Mon 23:30", event: "Submissions close" },
  { utc: "Mon 20:00", pt: "Mon 12:00", et: "Mon 15:00", ist: "Tue 01:30", event: "Live demos" },
  { utc: "Mon 22:00", pt: "Mon 14:00", et: "Mon 17:00", ist: "Tue 03:30", event: "Awards" },
]

export const FAQS = [
  {
    q: "Who can enter?",
    a: "Anyone, anywhere. There is no age, degree, or residency requirement, and no application fee. If you are under 18 you will need a guardian to countersign the participation form.",
  },
  {
    q: "What does it cost?",
    a: "Nothing. Entry, workshops, mentor time, and judging are all free. You need a computer and an internet connection.",
  },
  {
    q: "Do I need a team?",
    a: "No. Teams are one to four people, and there is a team-formation session an hour after the opening ceremony for anyone arriving alone. Solo entries compete on equal footing.",
  },
  {
    q: "How does judging work across timezones?",
    a: "Submissions are a repository plus a three-minute recorded demo, so nothing depends on you being awake at a particular hour. Live demos are optional and replayed for judges who cannot attend.",
  },
  {
    q: "Can I start early?",
    a: "You can plan, sketch, and read as much as you like. Code committed before hacking opens does not count — judges are given the commit history.",
  },
  {
    q: "What if my internet is unreliable?",
    a: "Every session is recorded and posted within the hour, and submissions accept a late-window upload. Tell us in advance and we will make sure nothing is missed.",
  },
]
