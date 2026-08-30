"use client"

/** Original jellyfish silhouette: a translucent bell with a soft glow and a
 *  handful of trailing tentacles, each animated independently so the whole
 *  thing reads as drifting rather than a static sticker. */
export function Jellyfish({ hue }: { hue: string }) {
  return (
    <svg viewBox="0 0 60 90" className="jelly-svg" aria-hidden="true">
      <ellipse cx="30" cy="26" rx="24" ry="20" className="jelly-bell" style={{ fill: hue }} />
      <path
        d="M8 24 C 8 40, 20 40, 30 32 C 40 40, 52 40, 52 24"
        className="jelly-skirt"
        style={{ stroke: hue }}
        fill="none"
      />
      {[14, 22, 30, 38, 46].map((x, i) => (
        <path
          key={i}
          d={`M${x} 34 Q ${x + (i % 2 ? 6 : -6)} 55, ${x} 80`}
          className={`jelly-tentacle jelly-tentacle-${i}`}
          style={{ stroke: hue }}
          fill="none"
        />
      ))}
    </svg>
  )
}

const FLEET = [
  { hue: "#ff8fd8", top: "10%", left: "8%", size: 70, duration: 9, delay: 0 },
  { hue: "#7ee7ff", top: "20%", left: "78%", size: 54, duration: 11, delay: -3 },
  { hue: "#c9a4ff", top: "55%", left: "4%", size: 60, duration: 10, delay: -6 },
  { hue: "#ffe07a", top: "68%", left: "85%", size: 46, duration: 8, delay: -2 },
  { hue: "#7effb2", top: "40%", left: "48%", size: 38, duration: 12, delay: -8 },
]

/** Fixed ocean layer: deep gradient, rising bubbles, and a small fleet of
 *  colorful jellyfish each bobbing on its own depth and rhythm. */
export function JellyfishOcean() {
  return (
    <div className="sea-ocean" aria-hidden="true">
      <div className="sea-gradient" />
      <div className="sea-caustics" />
      {FLEET.map((j, i) => (
        <div
          key={i}
          className="jelly-track"
          style={{
            top: j.top,
            left: j.left,
            width: j.size,
            animationDuration: `${j.duration}s`,
            animationDelay: `${j.delay}s`,
          }}
        >
          <Jellyfish hue={j.hue} />
        </div>
      ))}
      <div className="sea-bubbles">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} className="bubble" style={{ left: `${(i * 7 + 3) % 100}%`, animationDelay: `${i * 0.9}s`, animationDuration: `${6 + (i % 5)}s` }} />
        ))}
      </div>
    </div>
  )
}
