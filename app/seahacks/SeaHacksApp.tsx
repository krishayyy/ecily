"use client"

import { Nav } from "./components/Nav"
import { Ocean } from "./components/Ocean"
import { Hero } from "./components/Hero"
import { Sections } from "./components/Sections"
import { useReveal } from "./hooks/useReveal"
import { useSpotlight } from "./hooks/useSpotlight"

export default function SeaHacksApp() {
  useReveal()
  useSpotlight()
  return (
    <div className="sh-root">
      <Ocean />
      <Nav />
      <Hero />
      <Sections />
    </div>
  )
}
