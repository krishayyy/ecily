"use client"

import { useEffect, useRef } from "react"

/** The illustrated source art ships as JPG, so its "transparent" regions are
 *  baked in — a light checkerboard behind the coral, near-black water behind
 *  the jellyfish. Neither keys out with a blend mode alone (screen only nulls
 *  true black; multiply only nulls true white), which is what left a visible
 *  rectangle around the art. Thresholding luminance into a real alpha channel
 *  removes it properly, including the gaps between coral fronds. */
export function AlphaCutout({
  src,
  className,
  style,
  lowThreshold = 90,
  highThreshold = 170,
  invert = false,
}: {
  src: string
  className?: string
  style?: React.CSSProperties
  lowThreshold?: number
  highThreshold?: number
  /** false: dark subject on a light field (coral) — bright pixels go clear.
   *  true: glowing subject on a dark field (jellyfish) — dark pixels go clear. */
  invert?: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const img = new Image()
    img.onload = () => {
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      ctx.drawImage(img, 0, 0)
      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const d = frame.data
      const span = highThreshold - lowThreshold
      for (let i = 0; i < d.length; i += 4) {
        const lum = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2]
        const ramp = (255 * (lum - lowThreshold)) / span
        d[i + 3] = invert
          ? lum <= lowThreshold
            ? 0
            : lum >= highThreshold
              ? 255
              : ramp
          : lum <= lowThreshold
            ? 255
            : lum >= highThreshold
              ? 0
              : 255 - ramp
      }
      ctx.putImageData(frame, 0, 0)
      canvas.classList.add("is-ready")
    }
    img.src = src
  }, [src, lowThreshold, highThreshold, invert])

  return <canvas ref={canvasRef} className={className} style={style} aria-hidden="true" />
}
