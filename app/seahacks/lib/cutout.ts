export type CutoutOptions = {
  /** Luminance at/below which pixels are fully opaque (or clear, if inverted). */
  low?: number
  /** Luminance at/above which pixels are fully clear (or opaque, if inverted). */
  high?: number
  /** true: glowing subject on a dark field. false: dark subject on a light field. */
  invert?: boolean
  /** Downscale so per-frame draws stay cheap. */
  maxWidth?: number
  /** Degrees of hue rotation, to get visual variety from one source image. */
  hueRotate?: number
  /** Pre-baked blur, so distant instances cost nothing per frame. */
  blur?: number
}

/** Loads one of the illustrated JPGs and returns an offscreen canvas holding
 *  it with a real alpha channel, trimmed to its subject.
 *
 *  The art ships as JPG, so "transparent" regions are baked in — near-black
 *  water behind the jellyfish, a light checkerboard behind the coral. Neither
 *  keys out with a blend mode alone, so luminance is thresholded into alpha
 *  instead. Trimming afterwards matters as much as the keying: it gives the
 *  simulation the subject's true bounds, so a jellyfish can be positioned and
 *  scaled by its own body rather than by a mostly-empty source rectangle. */
export function loadCutout(src: string, opts: CutoutOptions = {}): Promise<HTMLCanvasElement> {
  const { low = 90, high = 170, invert = false, maxWidth, hueRotate = 0, blur = 0 } = opts

  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onerror = () => reject(new Error(`cutout: could not load ${src}`))
    img.onload = () => {
      const w = img.naturalWidth
      const h = img.naturalHeight
      const cut = document.createElement("canvas")
      cut.width = w
      cut.height = h
      const ctx = cut.getContext("2d", { willReadFrequently: true })!
      ctx.drawImage(img, 0, 0)

      const frame = ctx.getImageData(0, 0, w, h)
      const d = frame.data
      const span = Math.max(1, high - low)

      let minX = w
      let minY = h
      let maxX = -1
      let maxY = -1

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4
          const lum = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2]
          const ramp = (255 * (lum - low)) / span
          const a = invert
            ? lum <= low
              ? 0
              : lum >= high
                ? 255
                : ramp
            : lum <= low
              ? 255
              : lum >= high
                ? 0
                : 255 - ramp
          d[i + 3] = a
          if (a > 8) {
            if (x < minX) minX = x
            if (x > maxX) maxX = x
            if (y < minY) minY = y
            if (y > maxY) maxY = y
          }
        }
      }
      ctx.putImageData(frame, 0, 0)

      if (maxX < 0) {
        resolve(cut)
        return
      }

      const tw = maxX - minX + 1
      const th = maxY - minY + 1
      const scale = maxWidth && tw > maxWidth ? maxWidth / tw : 1

      const out = document.createElement("canvas")
      out.width = Math.max(1, Math.round(tw * scale))
      out.height = Math.max(1, Math.round(th * scale))
      const octx = out.getContext("2d")!
      const filters: string[] = []
      if (hueRotate) filters.push(`hue-rotate(${hueRotate}deg)`)
      if (blur) filters.push(`blur(${blur}px)`)
      if (filters.length) octx.filter = filters.join(" ")
      octx.drawImage(cut, minX, minY, tw, th, 0, 0, out.width, out.height)

      resolve(out)
    }
    img.src = src
  })
}

/** A soft additive glow sprite, pre-rendered once and reused for every mote,
 *  ripple and jellyfish halo — far cheaper than rebuilding gradients per frame. */
export function makeGlowSprite(color: string, size = 64): HTMLCanvasElement {
  const c = document.createElement("canvas")
  c.width = c.height = size
  const g = c.getContext("2d")!
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  grad.addColorStop(0, color)
  grad.addColorStop(0.32, color + "88")
  grad.addColorStop(1, color + "00")
  g.fillStyle = grad
  g.fillRect(0, 0, size, size)
  return c
}
