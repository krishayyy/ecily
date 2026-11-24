// Add a sponsor here and, for an image mark, put its logo under public/mangohacks/sponsors/.
// All logos in the strip are rendered in the same cream color.
// `wide` marks are full wordmarks, so they render wider and without a separate name label.
export type SponsorMark = { name: string; href?: string; image?: string; wordmark?: string; wide?: boolean; tag?: string }
export const sponsorMarks: SponsorMark[] = [
  { name: ".XYZ", href: "https://gen.xyz", image: "/mangohacks/sponsors/xyz.svg", wide: true },
  { name: "Adaption", href: "https://adaptionlabs.ai", image: "/mangohacks/sponsors/adaption.svg", tag: "in-kind AI partner" },
  { name: "Ecily", image: "/mangohacks/sponsors/ecily-mono.png", tag: "organizer" },
]
