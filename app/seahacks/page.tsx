import type { Metadata } from "next"
import SeaHacksApp from "./SeaHacksApp"

export const metadata: Metadata = {
  title: "Sea Hacks 2026",
  description: "A fully virtual, international hackathon. Build from any coastline, any timezone.",
}

export default function SeaHacksPage() {
  return <SeaHacksApp />
}
