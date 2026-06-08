"use client"

import { useEffect, useRef } from "react"
import { worlds } from "@/lib/worlds"

export default function WorldsScroll() {
  const outerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const featureLabelRef = useRef<HTMLSpanElement>(null)
  const featureDetailRef = useRef<HTMLParagraphElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } | null = null

    const init = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const outer = outerRef.current
        const bg = bgRef.current
        const label = labelRef.current
        const name = nameRef.current
        const tagline = taglineRef.current
        const featureLabel = featureLabelRef.current
        const featureDetail = featureDetailRef.current
        const progress = progressRef.current

        if (!outer || !bg || !label || !name || !tagline || !featureLabel || !featureDetail || !progress) return

        const totalWorlds = worlds.length
        const segmentSize = 1 / totalWorlds

        // Set initial state to first world
        gsap.set(bg, { backgroundColor: worlds[0].accent })
        if (label) label.textContent = worlds[0].label
        if (name) name.textContent = worlds[0].name
        if (tagline) tagline.textContent = worlds[0].tagline
        if (featureLabel) featureLabel.textContent = worlds[0].feature
        if (featureDetail) featureDetail.textContent = worlds[0].detail

        // Master scroll progress tracker
        ScrollTrigger.create({
          trigger: outer,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress
            const worldIndex = Math.min(
              Math.floor(progress / segmentSize),
              totalWorlds - 1
            )
            const world = worlds[worldIndex]

            gsap.to(bg, {
              backgroundColor: world.accent,
              duration: 0.4,
              ease: "power2.out",
              overwrite: "auto",
            })

            if (progress !== undefined && progressRef.current) {
              progressRef.current.style.transform = `scaleX(${progress})`
            }
          },
        })

        // Per-world text transitions
        worlds.forEach((world, i) => {
          ScrollTrigger.create({
            trigger: outer,
            start: `top+=${(i / totalWorlds) * 100}% top`,
            end: `top+=${((i + 1) / totalWorlds) * 100}% top`,
            onEnter: () => animateWorldIn(world),
            onEnterBack: () => animateWorldIn(world),
          })
        })

        function animateWorldIn(world: typeof worlds[0]) {
          const tl = gsap.timeline()

          tl.to([name, tagline, featureLabel, featureDetail, label], {
            opacity: 0,
            y: -20,
            duration: 0.2,
            ease: "power2.in",
            stagger: 0.03,
          })
          .call(() => {
            if (label) label.textContent = world.label
            if (name) name.textContent = world.name
            if (tagline) tagline.textContent = world.tagline
            if (featureLabel) featureLabel.textContent = world.feature
            if (featureDetail) featureDetail.textContent = world.detail
          })
          .fromTo(
            label,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
          )
          .fromTo(
            name,
            { opacity: 0, y: 40, clipPath: "inset(100% 0 0 0)" },
            { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)", duration: 0.45, ease: "expo.out" },
            "-=0.1"
          )
          .fromTo(
            tagline,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
            "-=0.25"
          )
          .fromTo(
            [featureLabel, featureDetail],
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.35, ease: "power2.out", stagger: 0.06 },
            "-=0.2"
          )
        }
      })
    }

    init()
    return () => ctx?.revert()
  }, [])

  return (
    <div ref={outerRef} style={{ height: "900vh" }} className="relative">
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen overflow-hidden flex items-center justify-center"
      >
        {/* Animated background */}
        <div
          ref={bgRef}
          className="absolute inset-0 transition-none"
          style={{ backgroundColor: worlds[0].accent }}
        />

        {/* Atmospheric overlay — dark gradient over the accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 pointer-events-none" />

        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />

        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/10">
          <div
            ref={progressRef}
            className="h-full bg-white/60 origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-start justify-center px-[clamp(1.5rem,8vw,8rem)] max-w-6xl w-full mx-auto">
          {/* World label */}
          <span
            ref={labelRef}
            className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-mono mb-6 block"
          >
            {worlds[0].label}
          </span>

          {/* World name */}
          <h2
            ref={nameRef}
            className="text-[clamp(3.5rem,9vw,7.5rem)] font-bold leading-[0.95] tracking-tight text-white mb-5"
            style={{ clipPath: "inset(0% 0 0 0)" }}
          >
            {worlds[0].name}
          </h2>

          {/* Tagline */}
          <p
            ref={taglineRef}
            className="text-xl text-white/70 mb-12 max-w-md font-medium"
          >
            {worlds[0].tagline}
          </p>

          {/* Feature card */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-6 py-5 max-w-sm">
            <span
              ref={featureLabelRef}
              className="text-[10px] tracking-[0.2em] uppercase text-white/50 font-mono block mb-2"
            >
              {worlds[0].feature}
            </span>
            <p
              ref={featureDetailRef}
              className="text-sm text-white/80 leading-relaxed"
            >
              {worlds[0].detail}
            </p>
          </div>
        </div>

        {/* World dots indicator (bottom center) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5">
          {worlds.map((w, i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full bg-white/30"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
