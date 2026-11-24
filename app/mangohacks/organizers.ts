// Edit this one file when names, responsibilities, or social URLs are confirmed.
// Only photos actually supplied and available in the repository are included.
// `affiliation.icon` is a single-color PNG rendered as a mask, so it picks up the link color.
export type Organizer = {
  name: string
  photo: string
  focus: string
  bio: string
  linkedin?: string
  instagram?: string
  affiliation?: { name: string; href: string; icon: string }
}

const ECILY = { name: "Ecily", href: "/", icon: "/mangohacks/sponsors/ecily-mono.png" }
const MANGOEMBEDDED = { name: "MangoEmbedded", href: "https://mangoembedded.com/?=mangohacksorg", icon: "/mangohacks/sponsors/mangoembedded-mono.png" }

export const organizers: Organizer[] = [
  {
    name: "Reid Mariotti",
    photo: "/mangohacks/organizers/reid.png",
    focus: "Web · Community",
    bio: "Designed the current site, builds the website, manages Luma and Discord, and supports sponsor outreach and the community.",
    linkedin: "https://www.linkedin.com/in/reidmariotti/",
    affiliation: MANGOEMBEDDED,
  },
  {
    name: "Krishay Suresh",
    photo: "/mangohacks/organizers/krishay.jpg",
    focus: "Website · Planning",
    bio: "Builds the website and helps plan the hackathon.",
    linkedin: "https://www.linkedin.com/in/krishay-suresh-23a448421/",
    affiliation: ECILY,
  },
  {
    name: "Kush Theethira",
    photo: "/mangohacks/organizers/kush.webp",
    focus: "Sponsor outreach",
    bio: "Coordinates sponsor outreach with the team.",
    linkedin: "https://www.linkedin.com/in/kushalappa12/",
    affiliation: ECILY,
  },
  {
    name: "Darren Chen",
    photo: "/mangohacks/organizers/darren-chen.png",
    focus: "Planning · Finance",
    bio: "Plans the event, manages finances, and leads sponsor outreach.",
  },
]
