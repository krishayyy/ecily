"use client"

import { Nav } from "./components/Nav"
import { Hero } from "./components/Hero"
import { Stats, About, WalkStrip, Tracks, Schedule, Venue, Sponsors, Faq, BigCta, Footer } from "./components/Sections"
import { useReveal } from "./hooks/useReveal"

export default function MangoHacksApp() {
  useReveal()
  return (
    <>
      <Nav />
      <Hero />
      <Venue />
      <Stats />
      <About />
      <WalkStrip />
      <Tracks />
      <Schedule />
      <Sponsors />
      <Faq />
      <BigCta />
      <Footer />
    </>
  )
}
