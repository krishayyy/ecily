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

export const organizers: Organizer[] = [
  {
    name: "Krishay Suresh",
    photo: "/mangohacks/organizers/krishay.jpg",
    focus: "Website · Planning",
    bio: "Builds the website and manages the site and Luma with Kush.",
    linkedin: "https://www.linkedin.com/in/krishay-suresh-23a448421/",
    affiliation: ECILY,
  },
  {
    name: "Kush Theethira",
    photo: "/mangohacks/organizers/kush.webp",
    focus: "Sponsor outreach",
    bio: "Coordinates sponsor outreach and manages the site and Luma with Krishay.",
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
