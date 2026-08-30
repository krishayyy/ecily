"use client"

import { useEffect, useRef } from "react"

/** The source art bakes its "transparent" regions in as a light checkerboard
 *  rather than a real alpha channel. Since the actual subject (coral, in dark
 *  navy/black) sits far below that in luminance, thresholding luminance into
 *  alpha recovers a clean cutout without needing an edited source file. */
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
  /** false (default): dark subject on a light/checkerboard field (coral) —
   *  bright pixels become transparent. true: glowing subject on a dark field
   *  (jellyfish, particles) — dark pixels become transparent instead. */
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
        const ramp = 255 * (lum - lowThreshold) / span
        d[i + 3] = invert
          ? (lum <= lowThreshold ? 0 : lum >= highThreshold ? 255 : ramp)
          : (lum <= lowThreshold ? 255 : lum >= highThreshold ? 0 : 255 - ramp)
      }
      ctx.putImageData(frame, 0, 0)
    }
    img.src = src
  }, [src, lowThreshold, highThreshold, invert])

  return <canvas ref={canvasRef} className={className} style={style} />
}
