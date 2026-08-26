"use client"

import { APPLY_URL } from "../config"
export { APPLY_URL }

/** Every section piece is a photographed felt cut-out served from one place,
 *  so the drop-shadow that makes them sit on the cloth is defined once. */
function Felt({ name, className, alt = "" }:
  { name: string; className?: string; alt?: string }) {
  return <img className={`felt${className ? ` ${className}` : ""}`}
    src={`/mangohacks/images/felt/${name}.webp`} alt={alt} loading="lazy" />
}

/** Stitched ornament that opens each section, in place of a plain heading. */
function SectionMark({ name }: { name: string }) {
  return <Felt name={name} className="sec-mark" />
}

export function Stats() {
  return (
    <div className="stats">
      <div className="stats-in">
        {[["250", "HACKERS"], ["12.5", "HOURS"], ["5", "TRACKS"], ["100%", "FREE"]].map(([n, l]) => (
          <div className="stat" key={l}>
            <Felt name="stats-star" className="stat-star" />
            <b>{n}</b><i>{l}</i>
          </div>
        ))}
      </div>
    </div>
  )
}

const CARDS = [
  {
    icon: "icon-build", h: "Built for first-timers",
    p: "Morning workshops start from absolute zero, mentors stay on the floor all day, and one whole prize category can only be won by people at their first hackathon.",
  },
  {
    icon: "icon-food", h: "Everything is covered",
    p: "Meals, snacks, stickers, hardware to borrow, and a closing ceremony that actually feels like one. It costs you a Saturday and nothing else.",
  },
  {
    icon: "icon-prize", h: "Judged by people who build",
    p: "Working engineers, founders, and educators rotate between teams all day, then judge the final demos. The feedback is the prize most people remember.",
  },
]

export function About() {
  return (
    <section id="about">
      <div className="wrap">
        <SectionMark name="hdr-about" />
        <div className="kick rv">About the event</div>
        <h2 className="sec-h rv">One room, one Saturday,<br />and something that <em>runs</em>.</h2>
        <p className="lede rv">Mango Hacks is a free, one-day hackathon for high-school and early-college
          students across the Bay Area. You arrive at eight in the morning with an idea, or with
          nothing at all, and you leave at half past eight that night with a working project, a demo
          in front of real judges, and a group chat you did not have when you walked in.</p>
        <div className="cards">
          {CARDS.map((c) => (
            <div className="card rv" key={c.h}>
              <Felt name={c.icon} className="ic" />
              <h3>{c.h}</h3><p>{c.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function WalkStrip() {
  return (
    <div className="walk">
      <div className="walk-lane">
        <Felt name="mango-laptop" className="walker-felt" alt="" />
        <div className="walk-note">he has been at it since 8am. let him cook.</div>
      </div>
    </div>
  )
}

const TRACKS = [
  { n: "01", icon: "icon-prize", h: "Best Overall", p: "The project that makes the whole room quiet down." },
  { n: "02", icon: "stats-star", h: "Best First Hack", p: "Only open to people at their first hackathon. Ever." },
  { n: "03", icon: "track-ai", h: "AI & Machine Learning", p: "Models, agents, and things that think a little." },
  { n: "04", icon: "track-climate", h: "Social Impact", p: "Something your own community would actually use." },
  { n: "05", icon: "track-games", h: "Design & Craft", p: "The one that looks and feels unreasonably good." },
]

export function Tracks() {
  return (
    <section id="tracks">
      <div className="wrap">
        <SectionMark name="hdr-tracks" />
        <div className="kick rv">Project tracks</div>
        <h2 className="sec-h rv">Five categories,<br />five sets of <em>prizes</em>.</h2>
        <p className="lede rv">Build whatever you want. These are just the buckets we hand trophies out of.</p>
        <div className="tracks">
          {TRACKS.map((t) => (
            <div className="track rv" key={t.n}>
              <Felt name={t.icon} className="track-ic" />
              <div className="n">{t.n}</div><h3>{t.h}</h3><p>{t.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const SCHEDULE = [
  { t: "8:00 AM", h: "Doors and breakfast", p: "Check in, grab food, find people to build with." },
  { t: "9:00 AM", h: "Opening ceremony", p: "Rules, prizes, and the ten minutes that make everyone want to start." },
  { t: "10:00 AM", h: "Beginner workshops", p: "Start-from-zero sessions plus workshops run by our sponsors." },
  { t: "12:30 PM", h: "Lunch", p: "Food, and the first wall almost everybody hits." },
  { t: "3:00 PM", h: "Mentor sweep", p: "Engineers walk the floor, unstick projects, and answer the dumb questions for free." },
  { t: "6:00 PM", h: "Dinner and submissions", p: "Last push, then everything gets locked." },
  { t: "7:00 PM", h: "Demos", p: "Every team presents to real judges." },
  { t: "8:30 PM", h: "Awards and closing", p: "Trophies, photos, and the group chat that outlasts the day." },
]

export function Schedule() {
  return (
    <section id="schedule">
      <div className="wrap">
        <SectionMark name="hdr-schedule" />
        <div className="kick rv">The day</div>
        <h2 className="sec-h rv">Twelve and a half <em>hours</em>.</h2>
        <div className="sched">
          {/* the embroidered thread is the timeline rail */}
          <Felt name="sched-thread" className="sched-rail" />
          {SCHEDULE.map((s) => (
            <div className="slot rv" key={s.t}>
              <time>{s.t}</time>
              <div><h4>{s.h}</h4><p>{s.p}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Sits right after the hero on purpose: "where" is the first practical
 *  question once someone's decided they're interested, before they read
 *  about tracks, schedule, or sponsors. */
export function Venue() {
  return (
    <section id="venue">
      <div className="wrap venue-in">
        <Felt name="venue" className="venue-art"
          alt="The Zoho Corporation building in Pleasanton, rendered in felt" />
        <div className="venue-copy">
          <div className="kick rv">The venue</div>
          <h2 className="sec-h rv">Zoho Corporation,<br /><em>Pleasanton</em>.</h2>
          <p className="lede rv">A real office rather than a school gym. Doors open at eight in
            the morning on Saturday, December 5, and close at half past eight that night: one
            room, one day, and everything you need already in it.</p>
          <dl className="venue-facts rv">
            <div><dt>Address</dt><dd>4141 Hacienda Drive<br />Pleasanton, California</dd></div>
            <div><dt>When</dt><dd>Saturday, December 5, 2026<br />8:00 AM – 8:30 PM</dd></div>
          </dl>
        </div>
      </div>
    </section>
  )
}

type Tier = {
  cls: string; fruit: string; name: string; price: string
  items: { text: string; off?: boolean }[]
  primary?: boolean; ribbon?: string
}
const TIERS: Tier[] = [
  {
    cls: "", fruit: "tier-green", name: "Mango", price: "$500",
    items: [
      { text: "Logo on the site" }, { text: "Stickers in every bag" },
      { text: "Named at opening" }, { text: "Send engineers as mentors" },
      { text: "Table on site", off: true }, { text: "Host a workshop", off: true },
      { text: "Your own track", off: true },
    ],
  },
  {
    cls: "silver", fruit: "tier-green", name: "Silver", price: "$1,000",
    items: [
      { text: "Everything in Mango" }, { text: "Logo on the event shirts" },
      { text: "Dedicated table on site" }, { text: "Social media feature" },
      { text: "Host a 30-minute workshop" }, { text: "Seat on the judging panel", off: true },
      { text: "Your own track", off: true },
    ],
  },
  {
    cls: "gold", fruit: "tier-gold", name: "Gold", price: "$2,500", primary: true,
    items: [
      { text: "Everything in Silver" }, { text: "Large logo on the shirts" },
      { text: "Seat on the judging panel" }, { text: "Sponsor a named award" },
      { text: "5-minute ceremony slot" }, { text: "Résumés from opted-in hackers" },
      { text: "Your own track", off: true },
    ],
  },
  {
    cls: "glow", fruit: "tier-glow", name: "Golden", price: "$3,500", primary: true, ribbon: "RIPEST",
    items: [
      { text: "Everything in Gold" }, { text: "Co-branding on the event" },
      { text: "Your own project track" }, { text: "10-minute keynote slot" },
      { text: "Logo front and back on shirts" }, { text: "First pick of mentor sessions" },
      { text: "A mango with your name on it" },
    ],
  },
]

export function Sponsors() {
  return (
    <section id="sponsor">
      <div className="wrap">
        <div className="kick rv">Sponsors</div>
        <h2 className="sec-h rv">Put your name on a<br />room full of <em>builders</em>.</h2>
        <p className="lede rv">Two hundred and fifty students spend twelve and a half hours with your
          tools, your engineers, and your logo. Every tier below is negotiable, and we are happy to
          build a package around the one or two things that actually matter to your team.</p>
        <p className="hand rv" style={{ marginTop: 18 }}>pick a mango. they get riper.</p>

        <div className="tiers">
          {TIERS.map((t) => (
            <div className={`tier rv${t.cls ? ` ${t.cls}` : ""}`} key={t.name}>
              {t.ribbon && <div className="ribbon">{t.ribbon}</div>}
              <Felt name={t.fruit} className="fruit" />
              <h3>{t.name}</h3><div className="price">{t.price}</div>
              <ul>
                {t.items.map((it) => (
                  <li className={it.off ? "off" : undefined} key={it.text}>{it.text}</li>
                ))}
              </ul>
              <a className={`btn btn-felt${t.primary ? "" : " btn-quiet"}`} href="#apply">Choose</a>
            </div>
          ))}
        </div>

        <div className="inkind rv">
          <Felt name="track-health" className="inkind-ic" />
          <div>
            <h4>In-kind counts too</h4>
            <p>API credits, hardware, food, prizes, printing, and services all count toward a tier at
              fair value. If none of the four fit, tell us what you actually need and we will build
              the package around it.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

const FAQ = [
  { q: "What is a hackathon?", a: "A day where you build something from scratch with a small team, then show it off. There is no exam, no grade, and nothing to lose. Most people come in with no idea what they are making and leave with a thing that works.", open: true },
  { q: "Who can come?", a: "Any high-school student, plus early-college students. You do not need to be from a particular school, district, or club. You do not need a team either." },
  { q: "What if I have never written code?", a: "Then you are exactly who we built this for. Morning workshops start from zero, mentors are on the floor all day, and Best First Hack is a prize only first-timers can win." },
  { q: "What does it cost?", a: "Nothing. Entry, meals, snacks, and stickers are all free, and there is hardware you can borrow for the day." },
  { q: "Do I need a team or an idea?", a: "No to both. There is a team-forming block right after check-in, and teams are up to four people. Plenty of people show up alone." },
  { q: "How do I sponsor Mango Hacks?", a: "Email us a line about who you are and what you want out of it. We reply with a recommended tier and a short call, then it is an invoice and a logo file. Contributions run through our 501(c)(3) fiscal sponsorship, so they are tax-deductible in the US." },
]

export function Faq() {
  return (
    <section id="faq">
      <div className="wrap">
        <SectionMark name="hdr-faq" />
        <div className="kick rv">Questions</div>
        <h2 className="sec-h rv">Frequently <em>asked</em>.</h2>
        <div className="faq">
          {FAQ.map((f) => (
            <details className="rv" open={f.open} key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export function BigCta() {
  return (
    <section id="apply" className="bigcta">
      <div className="wrap">
        <Felt name="mango-cheer" className="cheer" alt="" />
        <h2 className="rv">Come build something.</h2>
        <p className="rv">December 5, 2026 at Zoho Corporation in Pleasanton. Applications are open now,
          and sponsors, we would love to hear from you early: shirts and food orders lock eight
          weeks out.</p>
        <div className="row rv">
          <a className="btn btn-felt" href={APPLY_URL} target="_blank" rel="noopener noreferrer">
            Apply to hack →
          </a>
          <a className="btn btn-felt btn-quiet" href="#sponsor">Sponsor Mango Hacks</a>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer>
      <div className="wrap foot-in">
        <div>
          <div className="brand" style={{ marginBottom: 10 }}>
            <img src="/mangohacks/images/felt/mango-body.webp" alt="" width={27} height={31} />
            Mango Hacks
          </div>
          <div style={{ fontFamily: "var(--mono)", fontSize: 12.5, color: "var(--txt-3)", letterSpacing: ".08em" }}>
            DEC 5, 2026 · ZOHO CORPORATION · PLEASANTON, CA
          </div>
        </div>
        <div className="foot-links">
          <a href="#about">About</a><a href="#tracks">Tracks</a>
          <a href="#schedule">Schedule</a><a href="#venue">Venue</a>
          <a href="#sponsor">Sponsors</a><a href="#faq">FAQ</a>
          <a href={APPLY_URL} target="_blank" rel="noopener noreferrer">Apply</a>
        </div>
        <div style={{ textAlign: "right" }}>
          <Felt name="mango-body" className="waver" />
          <div className="foot-note">made with 🥭 by the mango hacks team</div>
        </div>
      </div>
    </footer>
  )
}
