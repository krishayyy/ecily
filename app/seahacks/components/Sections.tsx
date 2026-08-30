"use client"

import { APPLY_URL, FAQS, SCHEDULE, SPONSOR_EMAIL, STATS, TRACKS } from "../config"
import { MagneticButton } from "./MagneticButton"

export function Sections() {
  return (
    <main className="sh-main">
      {/* ---- the premise ---- */}
      <section className="sh-section" id="about">
        <div className="sh-shell">
          <p className="sh-label rv">The premise</p>
          <p className="sh-statement rv">
            Most hackathons ask you to be in one room, in one city, awake at one
            set of hours. <em>Sea Hacks asks none of that.</em> The clock runs
            straight through 48 hours and hands off around the planet — workshops
            repeat in two blocks, mentors rotate with the daylight, and judging
            never depends on you being awake at 3am.
          </p>

          <ul className="sh-stats">
            {STATS.map((s) => (
              <li key={s.unit} className="sh-stat sh-lit rv">
                <span className="sh-stat-v">{s.value}</span>
                <span className="sh-stat-u">{s.unit}</span>
                <span className="sh-stat-l">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- tracks ---- */}
      <section className="sh-section" id="tracks">
        <div className="sh-shell">
          <p className="sh-label rv">Tracks</p>
          <h2 className="sh-h2 rv">Four ways in</h2>
          <p className="sh-sub rv">
            Enter one track. Every project is judged against the others in its own
            track, so a climate tool is never weighed against a game engine.
          </p>

          <div className="sh-tracks">
            {TRACKS.map((t) => (
              <article key={t.name} className="sh-track sh-lit rv">
                <h3>{t.name}</h3>
                <p>{t.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---- schedule ---- */}
      <section className="sh-section" id="schedule">
        <div className="sh-shell">
          <p className="sh-label rv">Schedule</p>
          <h2 className="sh-h2 rv">Every hour, in your hour</h2>
          <p className="sh-sub rv">
            Times are fixed to UTC and listed in three more zones. Nothing that
            affects your score happens while you are asleep.
          </p>

          <div className="sh-table-wrap sh-lit rv">
            <table className="sh-table">
              <thead>
                <tr>
                  <th scope="col">UTC</th>
                  <th scope="col">Los Angeles</th>
                  <th scope="col">New York</th>
                  <th scope="col">Mumbai</th>
                  <th scope="col">Session</th>
                </tr>
              </thead>
              <tbody>
                {SCHEDULE.map((r) => (
                  <tr key={r.utc + r.event}>
                    <td className="sh-t">{r.utc}</td>
                    <td className="sh-t">{r.pt}</td>
                    <td className="sh-t">{r.et}</td>
                    <td className="sh-t">{r.ist}</td>
                    <td>{r.event}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ---- faq ---- */}
      <section className="sh-section" id="faq">
        <div className="sh-shell">
          <p className="sh-label rv">Questions</p>
          <h2 className="sh-h2 rv">Before you apply</h2>

          <div className="sh-faq">
            {FAQS.map((f) => (
              <details key={f.q} className="sh-faq-item rv">
                <summary>
                  {f.q}
                  <svg viewBox="0 0 14 14" aria-hidden="true">
                    <path d="M7 1v12M1 7h12" />
                  </svg>
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---- closing ---- */}
      <section className="sh-section sh-close">
        <div className="sh-shell">
          <h2 className="sh-h2 sh-close-h rv">
            Wherever you are,
            <br />
            it is a good hour to start.
          </h2>
          <div className="sh-hero-actions sh-close-actions rv">
            <MagneticButton href={APPLY_URL} external>
              Apply to hack
            </MagneticButton>
            <MagneticButton href={`mailto:${SPONSOR_EMAIL}`} variant="ghost">
              Sponsor Sea Hacks
            </MagneticButton>
          </div>
        </div>
      </section>

      <footer className="sh-footer">
        <div className="sh-shell sh-footer-in">
          <span>Sea Hacks 2026</span>
          <span className="sh-footer-note">An online hackathon, open to every coastline.</span>
        </div>
      </footer>
    </main>
  )
}
