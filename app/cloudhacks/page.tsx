import type { Metadata } from "next"
import CloudHacksApp from "./CloudHacksApp"

export const metadata: Metadata = {
  title: "Cloud Hacks 2026",
  description: "A fully virtual hackathon for student builders. Build from anywhere, ship something real.",
}

export default function CloudHacksPage() {
  return <CloudHacksApp />
}
