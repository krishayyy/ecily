// Add a sponsor here and, for an image mark, put its logo under public/mangohacks/sponsors/.
// All logos in the strip are rendered in the same cream color.
// `wide` marks are full wordmarks, so they render wider and without a separate name label.
export type SponsorMark = { name: string; href?: string; image?: string; wordmark?: string; wide?: boolean; tag?: string }
export const sponsorMarks: SponsorMark[] = [
  { name: "Zoho", image: "/mangohacks/sponsors/zoho-mono.png", wide: true },
  { name: "Google", image: "/mangohacks/sponsors/google.svg" },
  { name: ".XYZ", href: "https://gen.xyz", image: "/mangohacks/sponsors/xyz.svg", wide: true },
  { name: "Adaption", href: "https://adaptionlabs.ai", image: "/mangohacks/sponsors/adaption.svg", tag: "in-kind AI partner" },
  { name: "DeepSpace", href: "https://deep.space", image: "/mangohacks/sponsors/deepspace.svg" },
  { name: "Exea Labs", image: "/mangohacks/sponsors/exea-mono.png" },
  { name: "MangoEmbedded", image: "/mangohacks/sponsors/mangoembedded-mono.png" },
  { name: "Ecily", image: "/mangohacks/sponsors/ecily-mono.png" },
]
