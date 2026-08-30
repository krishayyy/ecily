"use client"

import { useEffect, useRef } from "react"
import { loadCutout, makeGlowSprite } from "../lib/cutout"

/* ------------------------------------------------------------------ *
 * A jellyfish is a still illustration, so the life has to be simulated.
 * Three things together sell it:
 *   1. a pulse — the bell contracts (squash on Y, bulge on X) and the
 *      contraction imparts a thrust impulse, so it shoots and then glides
 *      the way a real medusa does rather than sliding at constant speed;
 *   2. strip displacement — the sprite is drawn as ~20 horizontal bands,
 *      each offset by a phase-delayed sine, so the undulation travels down
 *      the body and the tentacles trail behind the bell;
 *   3. cursor pressure — they are shy, and veer away from the pointer.
 * ------------------------------------------------------------------ */

type Sprite = { img: HTMLCanvasElement; glow: string }

type Jelly = {
  sprite: Sprite
  x: number
  y: number
  vx: number
  vy: number
  /** Anchor this one wanders around, as a fraction of the viewport. */
  hx: number
  hy: number
  depth: number // 0 far … 1 near
  scale: number
  alpha: number
  heading: number
  pulseRate: number
  pulsePhase: number
  swayAmp: number
  startle: number
}

/** Where each jellyfish lives, as viewport fractions. Left-of-centre and the
 *  middle band are deliberately left clear — that is where the headline and
 *  lede sit. Letting them roam freely looked alive but kept wandering into
 *  the type or drifting off and leaving the frame empty; a weak spring to
 *  these anchors keeps the composition art-directed while still organic. */
const HOMES = [
  { x: 0.63, y: 0.3, depth: 0.95 },
  { x: 0.87, y: 0.62, depth: 0.5 },
  { x: 0.32, y: 0.13, depth: 0.3 },
  { x: 0.76, y: 0.86, depth: 0.42 },
  { x: 0.13, y: 0.74, depth: 0.2 },
]

type Mote = {
  x: number
  y: number
  ox: number
  oy: number
  r: number
  rise: number
  swayAmp: number
  swayRate: number
  phase: number
  twinkle: number
  alpha: number
  tint: number
}

type Ripple = { x: number; y: number; t: number; life: number }

const MOTE_TINTS = ["#bfefff", "#7fe9ff", "#ffc4ec"]
/** Enough strips for the undulation to read as a smooth travelling wave.
 *  Snapping strip edges to whole pixels is what removes the seams, not sheer
 *  count, so this stays modest — every strip is a separate draw call. */
const STRIPS = 26

const rand = (a: number, b: number) => a + Math.random() * (b - a)

export function Aquarium() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let alive = true
    let raf = 0
    let w = 0
    let h = 0

    const moteSprites = MOTE_TINTS.map((c) => makeGlowSprite(c))
    const haloCyan = makeGlowSprite("#7fe9ff", 128)
    const haloBio = makeGlowSprite("#ff7fd4", 128)

    let jellies: Jelly[] = []
    let motes: Mote[] = []
    let ripples: Ripple[] = []

    // Pointer lives in CSS pixels; -9999 parks it off-canvas until first move.
    const pointer = { x: -9999, y: -9999, active: false }

    const moteCount = () => (window.innerWidth < 700 ? 110 : 190)
    const jellyCount = () => (window.innerWidth < 700 ? 3 : 5)

    const seedMotes = () => {
      motes = Array.from({ length: moteCount() }, () => {
        const depth = Math.random()
        const x = Math.random() * w
        const y = Math.random() * h
        return {
          x,
          y,
          ox: x,
          oy: y,
          r: 0.6 + depth * 2.5,
          rise: (5 + depth * 18) / 60,
          swayAmp: 5 + depth * 24,
          swayRate: 0.12 + Math.random() * 0.3,
          phase: Math.random() * Math.PI * 2,
          twinkle: 0.4 + Math.random() * 1.1,
          alpha: 0.16 + depth * 0.5,
          tint: Math.random() < 0.12 ? 2 : Math.random() < 0.55 ? 1 : 0,
        }
      })
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seedMotes()
      // Keep jellyfish on screen after a resize rather than re-seeding them.
      for (const j of jellies) {
        j.x = Math.min(j.x, w + 200)
        j.y = Math.min(j.y, h + 200)
      }
    }

    const spawnJellies = (sprites: Sprite[]) => {
      const n = jellyCount()
      jellies = Array.from({ length: n }, (_, i) => {
        const home = HOMES[i % HOMES.length]
        const depth = home.depth
        return {
          sprite: sprites[i % sprites.length],
          x: home.x * w,
          y: home.y * h,
          vx: 0,
          vy: 0,
          hx: home.x,
          hy: home.y,
          depth,
          scale: (0.16 + depth * 0.62) * (w < 700 ? 0.7 : 1),
          alpha: 0.3 + depth * 0.65,
          heading: rand(-Math.PI * 0.85, -Math.PI * 0.15), // generally upward
          pulseRate: rand(0.28, 0.46),
          pulsePhase: Math.random() * Math.PI * 2,
          swayAmp: 5 + depth * 14,
          startle: 0,
        }
      })
    }

    /* ---------------- simulation ---------------- */

    let last = performance.now()
    let t = 0

    const step = (dt: number) => {
      t += dt

      for (const j of jellies) {
        const prevPulse = pulseOf(j, t - dt)
        const pulse = pulseOf(j, t)
        // Thrust fires on the contracting edge of the pulse only.
        const contracting = Math.max(0, pulse - prevPulse)
        const push = contracting * (26 + j.depth * 34) * (1 + j.startle * 2.2)
        j.vx += Math.cos(j.heading) * push * dt * 60 * 0.016
        j.vy += Math.sin(j.heading) * push * dt * 60 * 0.016

        // Shyness: veer away from the pointer, and pulse harder while close.
        if (pointer.active) {
          const dx = j.x - pointer.x
          const dy = j.y - pointer.y
          const d2 = dx * dx + dy * dy
          const R = 260
          if (d2 < R * R) {
            const d = Math.max(24, Math.sqrt(d2))
            const f = (1 - d / R) * 46
            j.vx += (dx / d) * f * dt
            j.vy += (dy / d) * f * dt
            j.startle = Math.min(1, j.startle + dt * 1.6)
            j.heading = Math.atan2(j.vy, j.vx)
          }
        }
        j.startle = Math.max(0, j.startle - dt * 0.5)

        // Slow heading wander keeps paths from looking scripted.
        j.heading += Math.sin(t * 0.11 + j.pulsePhase) * dt * 0.32

        // Weak spring back to this one's anchor. Soft enough that it still
        // roams and gets pushed around, firm enough that it always returns
        // to its place in the composition instead of drifting off frame.
        const ax = j.hx * w
        const ay = j.hy * h
        j.vx += (ax - j.x) * 0.0022 * dt * 60
        j.vy += (ay - j.y) * 0.0022 * dt * 60

        // Buoyancy + drag: they hang in the water rather than falling.
        j.vy -= 1.1 * dt
        const drag = Math.pow(0.9, dt * 60)
        j.vx *= drag
        j.vy *= drag

        j.x += j.vx * dt * 60 * 0.5
        j.y += j.vy * dt * 60 * 0.5
      }

      for (const p of motes) {
        p.y -= p.rise
        if (p.y < -20) {
          p.y = h + 20
          p.x = Math.random() * w
        }
        // Motes are pushed aside by the pointer, then ease home.
        if (pointer.active) {
          const dx = p.x - pointer.x
          const dy = p.y - pointer.y
          const d2 = dx * dx + dy * dy
          const R = 150
          if (d2 < R * R) {
            const d = Math.max(10, Math.sqrt(d2))
            const f = (1 - d / R) * 34
            p.x += (dx / d) * f * dt
            p.y += (dy / d) * f * dt
          }
        }
      }

      ripples = ripples.filter((r) => {
        r.t += dt
        return r.t < r.life
      })
    }

    const pulseOf = (j: Jelly, time: number) => {
      const raw = (Math.sin(time * Math.PI * 2 * j.pulseRate + j.pulsePhase) + 1) / 2
      return raw * raw // sharper contraction, longer glide
    }

    /* ---------------- rendering ---------------- */

    const drawJelly = (j: Jelly) => {
      const img = j.sprite.img
      const pulse = pulseOf(j, t)
      const sw = img.width
      const sh = img.height
      const sx = j.scale * (1 + pulse * 0.13)
      const sy = j.scale * (1 - pulse * 0.19)
      const dw = sw * sx
      const dh = sh * sy

      ctx.save()
      ctx.translate(j.x, j.y)
      // Lean into the direction of travel, gently.
      ctx.rotate(Math.sin(t * 0.18 + j.pulsePhase) * 0.06 + (j.heading + Math.PI / 2) * 0.12)
      ctx.globalAlpha = j.alpha

      // Halo first, additive, so the body reads as lit from within. Kept tight
      // around the bell rather than the whole sprite: a halo scaled to the full
      // body costs more fill than the jellyfish itself and reads as fog.
      ctx.globalCompositeOperation = "lighter"
      const halo = j.sprite.glow === "bio" ? haloBio : haloCyan
      const hs = dw * (0.8 + pulse * 0.14)
      ctx.globalAlpha = j.alpha * (0.3 + pulse * 0.26)
      ctx.drawImage(halo, -hs / 2, -dh * 0.3 - hs / 2 + dh * 0.2, hs, hs)

      // Body, as phase-delayed horizontal strips. Strip edges are snapped to
      // whole destination pixels and drawn contiguously — overlapping them
      // instead would double-composite the translucent edges into visible
      // bright seams straight across the bell.
      ctx.globalAlpha = j.alpha
      const top = -dh / 2
      for (let i = 0; i < STRIPS; i++) {
        const k = i / (STRIPS - 1)
        // Amplitude grows down the body: the bell holds, the tentacles trail.
        const amp = j.swayAmp * k * k * (0.5 + pulse * 0.6)
        const dx = Math.sin(t * 1.4 - k * 2.2 + j.pulsePhase) * amp
        const sy0 = (i * sh) / STRIPS
        const sy1 = ((i + 1) * sh) / STRIPS
        const dy0 = Math.round(top + (i * dh) / STRIPS)
        const dy1 = Math.round(top + ((i + 1) * dh) / STRIPS)
        if (dy1 <= dy0) continue
        ctx.drawImage(img, 0, sy0, sw, sy1 - sy0, -dw / 2 + dx, dy0, dw, dy1 - dy0)
      }

      ctx.globalCompositeOperation = "source-over"
      ctx.globalAlpha = 1
      ctx.restore()
    }

    const render = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = "lighter"

      // Motes behind the jellyfish.
      for (let i = 0; i < motes.length; i++) {
        const p = motes[i]
        if (i % 5 === 0) continue // saved for the front layer
        const x = p.x + Math.sin(t * p.swayRate + p.phase) * p.swayAmp
        const tw = 0.55 + 0.45 * Math.sin(t * p.twinkle + p.phase)
        const s = p.r * 9
        ctx.globalAlpha = p.alpha * tw
        ctx.drawImage(moteSprites[p.tint], x - s / 2, p.y - s / 2, s, s)
      }

      ctx.globalCompositeOperation = "source-over"
      ctx.globalAlpha = 1

      // Far jellyfish first so near ones overlap them.
      const ordered = [...jellies].sort((a, b) => a.depth - b.depth)
      for (const j of ordered) drawJelly(j)

      // Front motes and click ripples, additive.
      ctx.globalCompositeOperation = "lighter"
      for (let i = 0; i < motes.length; i += 5) {
        const p = motes[i]
        const x = p.x + Math.sin(t * p.swayRate + p.phase) * p.swayAmp
        const tw = 0.55 + 0.45 * Math.sin(t * p.twinkle + p.phase)
        const s = p.r * 13
        ctx.globalAlpha = p.alpha * tw * 0.8
        ctx.drawImage(moteSprites[p.tint], x - s / 2, p.y - s / 2, s, s)
      }

      for (const r of ripples) {
        const k = r.t / r.life
        const radius = 20 + k * 240
        ctx.globalAlpha = (1 - k) * 0.4
        ctx.strokeStyle = "#7fe9ff"
        ctx.lineWidth = 2 * (1 - k)
        ctx.beginPath()
        ctx.arc(r.x, r.y, radius, 0, Math.PI * 2)
        ctx.stroke()
      }

      ctx.globalCompositeOperation = "source-over"
      ctx.globalAlpha = 1
    }

    // Adaptive quality: the scene is fill-rate bound, so on a slow device it
    // sheds bioluminescence (cheap to lose, barely noticed) and then a
    // jellyfish, rather than running the full population at a stutter.
    let slowFrames = 0
    let quality = 0
    const degrade = () => {
      quality++
      if (quality === 1) motes = motes.slice(0, Math.floor(motes.length * 0.55))
      else if (quality === 2 && jellies.length > 3) jellies = jellies.slice(0, jellies.length - 1)
    }

    const frame = (now: number) => {
      if (!alive) return
      // Clamp dt so a backgrounded tab doesn't teleport everything on return.
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now

      if (quality < 2 && dt > 0.028) {
        if (++slowFrames > 90) {
          degrade()
          slowFrames = 0
        }
      } else if (slowFrames > 0) {
        slowFrames--
      }

      step(dt)
      render()
      raf = requestAnimationFrame(frame)
    }

    /* ---------------- wiring ---------------- */

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX
      pointer.y = e.clientY
      pointer.active = true
    }
    const onLeave = () => {
      pointer.active = false
      pointer.x = pointer.y = -9999
    }
    const onDown = (e: PointerEvent) => {
      ripples.push({ x: e.clientX, y: e.clientY, t: 0, life: 1.1 })
      for (const j of jellies) j.startle = 1
      for (const p of motes) {
        const dx = p.x - e.clientX
        const dy = p.y - e.clientY
        const d = Math.max(12, Math.hypot(dx, dy))
        if (d < 220) {
          p.x += (dx / d) * 44
          p.y += (dy / d) * 44
        }
      }
    }

    resize()
    window.addEventListener("resize", resize)

    if (!reduced) {
      window.addEventListener("pointermove", onMove, { passive: true })
      window.addEventListener("pointerdown", onDown, { passive: true })
      document.addEventListener("pointerleave", onLeave)
    }

    // Two source illustrations, nudged into a varied population. Hue shifts
    // are kept small deliberately: large rotations turn the art acid-green
    // and read as recoloured duplicates rather than different animals.
    const variants: { src: string; hue: number; glow: string; blur: number }[] = [
      { src: "/seahacks/jellyfish-hero.jpg", hue: 0, glow: "bio", blur: 0 },
      { src: "/seahacks/jellyfish-secondary.jpg", hue: 0, glow: "cyan", blur: 0 },
      { src: "/seahacks/jellyfish-hero.jpg", hue: -28, glow: "cyan", blur: 0.7 },
      { src: "/seahacks/jellyfish-secondary.jpg", hue: 26, glow: "bio", blur: 1.4 },
    ]

    Promise.all(
      variants.map((v) =>
        loadCutout(v.src, {
          invert: true,
          low: 32,
          high: 110,
          maxWidth: 400,
          hueRotate: v.hue,
          blur: v.blur,
        }).then((img) => ({ img, glow: v.glow })),
      ),
    )
      .then((sprites) => {
        if (!alive) return
        spawnJellies(sprites)
        canvas.classList.add("is-ready")
        if (reduced) {
          render()
          return
        }
        last = performance.now()
        raf = requestAnimationFrame(frame)
      })
      .catch(() => {
        // Art failed to load — leave the painted background plate alone.
      })

    return () => {
      alive = false
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerdown", onDown)
      document.removeEventListener("pointerleave", onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="sh-aquarium" aria-hidden="true" />
}
