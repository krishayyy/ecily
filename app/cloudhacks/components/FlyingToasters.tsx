"use client"

/** Original toaster-with-wings silhouette used for the drifting background.
 *  Deliberately a fresh, geometric take (flat two-tone body, simple pointed
 *  wings) rather than a copy of any existing screensaver's character art. */
function Toaster() {
  return (
    <svg viewBox="0 0 64 48" className="toaster-svg" aria-hidden="true">
      <g className="wing wing-left">
        <path d="M24 24 C10 14, 2 16, 0 24 C2 32, 10 34, 24 24 Z" />
      </g>
      <g className="wing wing-right">
        <path d="M40 24 C54 14, 62 16, 64 24 C62 32, 54 34, 40 24 Z" />
      </g>
      <rect x="20" y="10" width="24" height="26" rx="4" className="toaster-body" />
      <rect x="24" y="6" width="6" height="8" rx="1.5" className="toast" />
      <rect x="34" y="6" width="6" height="8" rx="1.5" className="toast" />
      <circle cx="32" cy="29" r="2.2" className="toaster-dial" />
    </svg>
  )
}

const FLEET = [
  { top: "8%", size: 46, duration: 22, delay: -2 },
  { top: "22%", size: 30, duration: 17, delay: -9 },
  { top: "38%", size: 58, duration: 27, delay: -14 },
  { top: "55%", size: 34, duration: 19, delay: -4 },
  { top: "70%", size: 50, duration: 24, delay: -19 },
  { top: "83%", size: 26, duration: 15, delay: -7 },
]

/** Fixed sky layer: gradient + a fleet of toasters drifting right to left,
 *  each on its own size/speed/offset so the loop doesn't read as one row. */
export function FlyingToasters() {
  return (
    <div className="toaster-sky" aria-hidden="true">
      <div className="sky-gradient" />
      <div className="sky-clouds" />
      {FLEET.map((t, i) => (
        <div
          key={i}
          className="toaster-track"
          style={{
            top: t.top,
            width: t.size,
            animationDuration: `${t.duration}s`,
            animationDelay: `${t.delay}s`,
          }}
        >
          <Toaster />
        </div>
      ))}
    </div>
  )
}
