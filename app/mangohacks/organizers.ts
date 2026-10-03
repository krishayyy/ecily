// Edit this one file when names, responsibilities, or social URLs are confirmed.
// Only photos actually supplied and available in the repository are included.
export type Organizer = {
  name: string
  photo: string
  focus: string
  bio: string
  linkedin?: string
  instagram?: string
}

export const organizers: Organizer[] = [
  {
    name: "Krishay Suresh",
    photo: "/mangohacks/organizers/krishay.jpg",
    focus: "Organizer",
    bio: "Helping bring Mango Hacks together. Specific responsibilities coming soon.",
    // linkedin: "https://www.linkedin.com/in/...",
  },
  {
    name: "Kush Theethira",
    photo: "/mangohacks/organizers/kush.webp",
    focus: "Organizer",
    bio: "Helping bring Mango Hacks together. Specific responsibilities coming soon.",
    // instagram: "https://www.instagram.com/...",
  },
  // Add the other two organizers here after their names and image files are available.
]
