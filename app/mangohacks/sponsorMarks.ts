// Add a sponsor here and, for an image mark, put its logo under public/mangohacks/sponsors/.
// All logos in the strip are rendered in the same cream color.
export type SponsorMark = { name: string; href?: string; image?: string; wordmark?: string }
export const sponsorMarks: SponsorMark[] = [
  { name: "Google", image: "/mangohacks/sponsors/google.svg" },
  { name: "Exea Labs", image: "/mangohacks/sponsors/exea-mono.png" },
  { name: "MangoEmbedded", image: "/mangohacks/sponsors/mangoembedded-mono.png" },
  { name: "Ecily", image: "/mangohacks/sponsors/ecily-mono.png" },
]
