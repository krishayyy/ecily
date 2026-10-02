// ─────────────────────────────────────────────────────────────
// Website Maker: the site model, starter templates, themes, and the
// renderer that turns a site into one self-contained index.html.
// Everything here is plain data + pure functions so the editor UI
// (app/build) stays about editing, not about HTML.
// ─────────────────────────────────────────────────────────────

export type BlockType =
  | "hero"
  | "text"
  | "cards"
  | "stats"
  | "details"
  | "gallery"
  | "quote"
  | "faq"
  | "contact"

export type FieldKind = "text" | "textarea" | "url" | "image"

export type Field = {
  key: string
  label: string
  kind: FieldKind
  placeholder?: string
}

export type BlockDef = {
  type: BlockType
  label: string
  description: string
  fields: Field[]
  /** Repeating rows (cards, stats, photos…). Omitted for single-value blocks. */
  list?: { label: string; itemLabel: string; max: number; fields: Field[] }
}

export type Block = {
  id: string
  type: BlockType
  props: Record<string, string>
  items: Record<string, string>[]
}

export type PaletteId = "ecily" | "paper" | "forest" | "ocean" | "sunset" | "mono"
export type FontId = "classic" | "modern" | "editorial" | "friendly" | "tech"
export type CornerId = "round" | "soft" | "sharp"

export type Site = {
  version: 1
  name: string
  /** What shows under the title in Google results. Falls back to the header text. */
  description?: string
  showNav: boolean
  theme: {
    palette: PaletteId
    /** Overrides the palette's accent when set (hex). */
    accent: string
    font: FontId
    corners: CornerId
  }
  blocks: Block[]
}

// ── Block catalogue ──────────────────────────────────────────

export const BLOCKS: Record<BlockType, BlockDef> = {
  hero: {
    type: "hero",
    label: "Header",
    description: "Big title, a sentence, and a button.",
    fields: [
      { key: "eyebrow", label: "Small label", kind: "text", placeholder: "Est. 2019" },
      { key: "heading", label: "Headline", kind: "text" },
      { key: "body", label: "Subheading", kind: "textarea" },
      { key: "buttonText", label: "Button text", kind: "text", placeholder: "Leave empty to hide" },
      { key: "buttonLink", label: "Button link", kind: "url", placeholder: "#contact or https://…" },
      { key: "image", label: "Photo", kind: "image" },
    ],
  },
  text: {
    type: "text",
    label: "About",
    description: "A heading and a few paragraphs.",
    fields: [
      { key: "heading", label: "Heading", kind: "text" },
      { key: "body", label: "Text", kind: "textarea", placeholder: "Leave a blank line between paragraphs." },
    ],
  },
  cards: {
    type: "cards",
    label: "Cards",
    description: "Services, programs, menu items, or projects.",
    fields: [
      { key: "heading", label: "Heading", kind: "text" },
      { key: "body", label: "Intro", kind: "textarea" },
    ],
    list: {
      label: "Cards",
      itemLabel: "Card",
      max: 9,
      fields: [
        { key: "title", label: "Title", kind: "text" },
        { key: "body", label: "Description", kind: "textarea" },
        { key: "tag", label: "Tag or price", kind: "text", placeholder: "Optional" },
      ],
    },
  },
  stats: {
    type: "stats",
    label: "Numbers",
    description: "Show off impact with big numbers.",
    fields: [{ key: "heading", label: "Heading", kind: "text", placeholder: "Optional" }],
    list: {
      label: "Numbers",
      itemLabel: "Number",
      max: 4,
      fields: [
        { key: "value", label: "Number", kind: "text", placeholder: "12,000" },
        { key: "label", label: "Label", kind: "text", placeholder: "meals served" },
      ],
    },
  },
  details: {
    type: "details",
    label: "Info",
    description: "Hours, address, dates. Label and value pairs.",
    fields: [{ key: "heading", label: "Heading", kind: "text" }],
    list: {
      label: "Rows",
      itemLabel: "Row",
      max: 10,
      fields: [
        { key: "label", label: "Label", kind: "text", placeholder: "Saturday" },
        { key: "value", label: "Value", kind: "text", placeholder: "9am – 2pm" },
      ],
    },
  },
  gallery: {
    type: "gallery",
    label: "Photos",
    description: "A grid of pictures with captions.",
    fields: [{ key: "heading", label: "Heading", kind: "text" }],
    list: {
      label: "Photos",
      itemLabel: "Photo",
      max: 9,
      fields: [
        { key: "image", label: "Photo", kind: "image" },
        { key: "caption", label: "Caption", kind: "text", placeholder: "Optional" },
      ],
    },
  },
  quote: {
    type: "quote",
    label: "Quote",
    description: "A testimonial from someone you've helped.",
    fields: [
      { key: "quote", label: "Quote", kind: "textarea" },
      { key: "author", label: "Who said it", kind: "text" },
    ],
  },
  faq: {
    type: "faq",
    label: "FAQ",
    description: "Questions that open to show the answer.",
    fields: [{ key: "heading", label: "Heading", kind: "text" }],
    list: {
      label: "Questions",
      itemLabel: "Question",
      max: 12,
      fields: [
        { key: "question", label: "Question", kind: "text" },
        { key: "answer", label: "Answer", kind: "textarea" },
      ],
    },
  },
  contact: {
    type: "contact",
    label: "Contact",
    description: "How people reach you, plus a button.",
    fields: [
      { key: "heading", label: "Heading", kind: "text" },
      { key: "body", label: "Text", kind: "textarea" },
      { key: "email", label: "Email", kind: "text", placeholder: "hello@example.org" },
      { key: "phone", label: "Phone", kind: "text", placeholder: "Optional" },
      { key: "address", label: "Address", kind: "text", placeholder: "Optional" },
      { key: "buttonText", label: "Button text", kind: "text", placeholder: "Leave empty to hide" },
      { key: "buttonLink", label: "Button link", kind: "url" },
    ],
  },
}

export const BLOCK_ORDER: BlockType[] = [
  "hero",
  "text",
  "cards",
  "stats",
  "details",
  "gallery",
  "quote",
  "faq",
  "contact",
]

// ── Themes ───────────────────────────────────────────────────

export type Palette = {
  id: PaletteId
  label: string
  bg: string
  surface: string
  text: string
  muted: string
  border: string
  accent: string
}

export const PALETTES: Palette[] = [
  { id: "ecily", label: "Night & gold", bg: "#0b0b0c", surface: "#161618", text: "#f5f3ee", muted: "#a3a19b", border: "#2a2a2d", accent: "#c9a96e" },
  { id: "paper", label: "Paper", bg: "#faf8f3", surface: "#ffffff", text: "#1d1b16", muted: "#6b665b", border: "#e7e2d6", accent: "#b4532a" },
  { id: "forest", label: "Forest", bg: "#f3f6f1", surface: "#ffffff", text: "#16261b", muted: "#55665a", border: "#dae4d8", accent: "#2f6b45" },
  { id: "ocean", label: "Ocean", bg: "#f2f6fb", surface: "#ffffff", text: "#0f1d33", muted: "#52617a", border: "#d9e2ef", accent: "#2459c7" },
  { id: "sunset", label: "Sunset", bg: "#fff6ef", surface: "#ffffff", text: "#2b1710", muted: "#7a5a4c", border: "#f2dfd2", accent: "#e0582c" },
  { id: "mono", label: "Mono", bg: "#ffffff", surface: "#f4f4f4", text: "#111111", muted: "#666666", border: "#e2e2e2", accent: "#111111" },
]

export type FontPair = {
  id: FontId
  label: string
  heading: string
  body: string
  /** Google Fonts css2 family query, without the URL prefix. */
  query: string
  headingWeight: number
}

export const FONTS: FontPair[] = [
  {
    id: "classic",
    label: "Classic",
    heading: "'Fraunces', Georgia, serif",
    body: "'Inter', system-ui, sans-serif",
    query: "family=Fraunces:opsz,wght@9..144,500&family=Inter:wght@400;600",
    headingWeight: 500,
  },
  {
    id: "modern",
    label: "Modern",
    heading: "'Inter', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
    query: "family=Inter:wght@400;600;800",
    headingWeight: 800,
  },
  {
    id: "editorial",
    label: "Editorial",
    heading: "'Playfair Display', Georgia, serif",
    body: "'Source Sans 3', system-ui, sans-serif",
    query: "family=Playfair+Display:wght@600&family=Source+Sans+3:wght@400;600",
    headingWeight: 600,
  },
  {
    id: "friendly",
    label: "Friendly",
    heading: "'Nunito', system-ui, sans-serif",
    body: "'Nunito', system-ui, sans-serif",
    query: "family=Nunito:wght@400;600;800",
    headingWeight: 800,
  },
  {
    id: "tech",
    label: "Techy",
    heading: "'Space Grotesk', system-ui, sans-serif",
    body: "'Space Grotesk', system-ui, sans-serif",
    query: "family=Space+Grotesk:wght@400;600;700&family=Space+Mono",
    headingWeight: 700,
  },
]

export const CORNERS: { id: CornerId; label: string; radius: string }[] = [
  { id: "round", label: "Round", radius: "22px" },
  { id: "soft", label: "Soft", radius: "10px" },
  { id: "sharp", label: "Sharp", radius: "0px" },
]

// ── Helpers ──────────────────────────────────────────────────

export function uid(): string {
  return Math.random().toString(36).slice(2, 10)
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

/** Only let through link schemes that can't run code. Anything else becomes "#". */
export function safeHref(raw: string): string {
  const s = raw.trim()
  if (!s) return "#"
  if (s.startsWith("#") || s.startsWith("/") || s.startsWith("./")) return s
  if (/^(https?:|mailto:|tel:)/i.test(s)) return s
  // "example.com" → "https://example.com"
  if (/^[\w-]+(\.[\w-]+)+(\/.*)?$/.test(s)) return `https://${s}`
  return "#"
}

/** Image sources: web URLs or images the user uploaded (data URLs). */
export function safeImageSrc(raw: string): string {
  const s = raw.trim()
  if (/^https?:\/\//i.test(s)) return s
  if (/^data:image\/(png|jpe?g|gif|webp);base64,[a-z0-9+/=]+$/i.test(s)) return s
  return ""
}

function isHex(s: string): boolean {
  return /^#[0-9a-f]{6}$/i.test(s)
}

/** Black or white, whichever reads better on the given background. */
export function contrastText(hex: string): string {
  if (!isHex(hex)) return "#ffffff"
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return lum > 0.4 ? "#111111" : "#ffffff"
}

function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 32)
}

/** Turn plain text into paragraphs: blank lines split paragraphs, single newlines become <br>. */
function paragraphs(text: string, cls = ""): string {
  const attr = cls ? ` class="${cls}"` : ""
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p${attr}>${escapeHtml(p).replace(/\n/g, "<br>")}</p>`)
    .join("\n      ")
}

// ── Blank blocks & templates ─────────────────────────────────

export function newBlock(type: BlockType): Block {
  const presets: Record<BlockType, Omit<Block, "id" | "type">> = {
    hero: {
      props: { eyebrow: "", heading: "Your big headline", body: "One sentence about what you do and who it's for.", buttonText: "Get in touch", buttonLink: "#contact", image: "" },
      items: [],
    },
    text: { props: { heading: "About us", body: "Tell your story here. Who are you, and why do you do this work?" }, items: [] },
    cards: {
      props: { heading: "What we offer", body: "" },
      items: [
        { title: "First thing", body: "A sentence or two about it.", tag: "" },
        { title: "Second thing", body: "A sentence or two about it.", tag: "" },
        { title: "Third thing", body: "A sentence or two about it.", tag: "" },
      ],
    },
    stats: {
      props: { heading: "" },
      items: [
        { value: "100+", label: "people helped" },
        { value: "12", label: "years running" },
        { value: "40", label: "volunteers" },
      ],
    },
    details: {
      props: { heading: "Visit us" },
      items: [
        { label: "Hours", value: "Mon – Fri, 9am – 5pm" },
        { label: "Address", value: "123 Main Street" },
      ],
    },
    gallery: {
      props: { heading: "Photos" },
      items: [
        { image: "", caption: "" },
        { image: "", caption: "" },
        { image: "", caption: "" },
      ],
    },
    quote: { props: { quote: "Something kind someone said about you.", author: "Happy customer" }, items: [] },
    faq: {
      props: { heading: "Questions" },
      items: [
        { question: "A question people often ask?", answer: "The answer, in a sentence or two." },
        { question: "Another common question?", answer: "Another helpful answer." },
      ],
    },
    contact: {
      props: { heading: "Get in touch", body: "We'd love to hear from you.", email: "hello@example.org", phone: "", address: "", buttonText: "", buttonLink: "" },
      items: [],
    },
  }
  const p = presets[type]
  return { id: uid(), type, props: { ...p.props }, items: p.items.map((i) => ({ ...i })) }
}

function block(type: BlockType, props: Record<string, string>, items?: Record<string, string>[]): Block {
  const b = newBlock(type)
  return { ...b, props: { ...b.props, ...props }, items: items ?? b.items }
}

export type Template = { id: string; label: string; description: string; build: () => Site }

const baseTheme = (palette: PaletteId, font: FontId, corners: CornerId = "round"): Site["theme"] => ({
  palette,
  accent: "",
  font,
  corners,
})

export const TEMPLATES: Template[] = [
  {
    id: "nonprofit",
    label: "Nonprofit",
    description: "Mission, programs, impact numbers, and a volunteer call to action.",
    build: () => ({
      version: 1,
      name: "Riverside Food Pantry",
      showNav: true,
      theme: baseTheme("forest", "classic"),
      blocks: [
        block("hero", {
          eyebrow: "Serving Riverside since 2012",
          heading: "No neighbor should go hungry.",
          body: "We collect, sort, and share fresh groceries with families across Riverside, free and with no questions asked.",
          buttonText: "Volunteer with us",
          buttonLink: "#contact",
        }),
        block("stats", { heading: "" }, [
          { value: "48,000", label: "meals shared last year" },
          { value: "1,200", label: "families each month" },
          { value: "300+", label: "volunteers" },
        ]),
        block("text", {
          heading: "Our mission",
          body: "Riverside Food Pantry started in a church basement with three tables and a lot of canned beans.\n\nToday we partner with local farms and grocery stores to rescue good food that would otherwise be thrown away, and get it to the people who need it.",
        }),
        block("cards", { heading: "Programs", body: "" }, [
          { title: "Weekly pantry", body: "Pick up fresh produce, bread, and staples every Saturday morning.", tag: "Saturdays" },
          { title: "School backpacks", body: "Weekend meal kits that go home with students on Fridays.", tag: "School year" },
          { title: "Senior delivery", body: "Volunteers bring groceries to neighbors who can't make the trip.", tag: "Weekly" },
        ]),
        block("quote", {
          quote: "When my hours got cut, the pantry meant my kids never noticed. Now I volunteer every week.",
          author: "Maria, Riverside parent",
        }),
        block("contact", {
          heading: "Lend a hand",
          body: "Volunteers sort food, pack boxes, and drive deliveries. No experience needed, just show up.",
          email: "volunteer@riversidepantry.org",
          phone: "(555) 201-4410",
          address: "400 River Road, Riverside",
          buttonText: "Donate",
          buttonLink: "https://example.org/donate",
        }),
      ],
    }),
  },
  {
    id: "business",
    label: "Small business",
    description: "Menu or services, opening hours, reviews, and directions.",
    build: () => ({
      version: 1,
      name: "Golden Crust Bakery",
      showNav: true,
      theme: baseTheme("sunset", "editorial", "soft"),
      blocks: [
        block("hero", {
          eyebrow: "Family bakery on Elm Street",
          heading: "Bread worth waking up for.",
          body: "Sourdough, croissants, and cinnamon rolls baked fresh before sunrise, every single day.",
          buttonText: "See the menu",
          buttonLink: "#menu",
        }),
        block("cards", { heading: "Menu", body: "Baked fresh daily. Ask about whole-loaf orders for parties." }, [
          { title: "Country sourdough", body: "Crackly crust, open crumb, 36-hour ferment.", tag: "$8" },
          { title: "Butter croissant", body: "Flaky layers made with real European butter.", tag: "$4" },
          { title: "Cinnamon roll", body: "Soft, gooey, and topped with cream cheese icing.", tag: "$5" },
        ]),
        block("details", { heading: "Hours" }, [
          { label: "Tuesday – Friday", value: "7am – 3pm" },
          { label: "Saturday – Sunday", value: "8am – 2pm" },
          { label: "Monday", value: "Closed" },
        ]),
        block("quote", {
          quote: "The best croissant I've had outside of Paris. We drive 30 minutes every weekend for it.",
          author: "Google review",
        }),
        block("contact", {
          heading: "Come say hi",
          body: "Order ahead for pickup, or just stop by.",
          email: "hello@goldencrust.com",
          phone: "(555) 330-0192",
          address: "18 Elm Street",
          buttonText: "Get directions",
          buttonLink: "https://maps.google.com",
        }),
      ],
    }),
  },
  {
    id: "portfolio",
    label: "Portfolio",
    description: "About you, your projects, and how to reach you.",
    build: () => ({
      version: 1,
      name: "Alex Rivera",
      showNav: true,
      theme: baseTheme("ecily", "tech"),
      blocks: [
        block("hero", {
          eyebrow: "Student · Builder",
          heading: "Hi, I'm Alex. I build things for my community.",
          body: "High school junior learning to code, design, and use AI to make useful stuff for local organizations.",
          buttonText: "See my work",
          buttonLink: "#projects",
        }),
        block("cards", { heading: "Projects", body: "" }, [
          { title: "Food pantry website", body: "Designed and launched a site that helped recruit 40 new volunteers.", tag: "Web" },
          { title: "Study buddy bot", body: "An AI helper that quizzes classmates on their notes.", tag: "AI" },
          { title: "Hackathon game", body: "A two-player browser game built in 24 hours with my team.", tag: "Game" },
        ]),
        block("text", {
          heading: "About me",
          body: "I got into coding at an Ecily hackathon and haven't stopped since. I like turning messy problems into simple tools people actually use.",
        }),
        block("contact", {
          heading: "Let's build something",
          body: "Got a project for a nonprofit or small business? I'd love to help.",
          email: "alex@example.com",
          phone: "",
          address: "",
          buttonText: "",
          buttonLink: "",
        }),
      ],
    }),
  },
  {
    id: "event",
    label: "Event",
    description: "A hackathon, fundraiser, or club event with schedule and FAQ.",
    build: () => ({
      version: 1,
      name: "Spring Hack Day",
      showNav: true,
      theme: baseTheme("ocean", "modern"),
      blocks: [
        block("hero", {
          eyebrow: "Saturday, April 18 · Free",
          heading: "Build something in a day.",
          body: "A free, beginner-friendly hackathon for high schoolers. Bring a laptop, we'll bring the food.",
          buttonText: "Register",
          buttonLink: "https://example.org/register",
        }),
        block("details", { heading: "Schedule" }, [
          { label: "9:00am", value: "Check-in & breakfast" },
          { label: "10:00am", value: "Hacking starts" },
          { label: "1:00pm", value: "Lunch & workshops" },
          { label: "5:00pm", value: "Demos & prizes" },
        ]),
        block("cards", { heading: "Tracks", body: "" }, [
          { title: "AI for good", body: "Use AI to help a local nonprofit or small business.", tag: "" },
          { title: "Games", body: "Make something fun and playable.", tag: "" },
          { title: "Beginner", body: "Never coded before? Start here with a mentor.", tag: "" },
        ]),
        block("faq", { heading: "FAQ" }, [
          { question: "Do I need to know how to code?", answer: "Nope. Most people who come are total beginners." },
          { question: "How much does it cost?", answer: "Nothing. Food, swag, and Wi-Fi are all free." },
          { question: "Can I come without a team?", answer: "Yes! We'll help you find one at check-in." },
        ]),
        block("contact", {
          heading: "Questions?",
          body: "Email the organizers and we'll get back to you within a day.",
          email: "team@springhack.org",
          phone: "",
          address: "Riverside High School, Room 204",
          buttonText: "",
          buttonLink: "",
        }),
      ],
    }),
  },
  {
    id: "blank",
    label: "Blank",
    description: "Just a header. Add sections yourself.",
    build: () => ({
      version: 1,
      name: "My website",
      showNav: false,
      theme: baseTheme("paper", "classic"),
      blocks: [newBlock("hero")],
    }),
  },
]

// ── Validation ───────────────────────────────────────────────
// Anything that didn't come from this tab's own state (localStorage, an edit
// link, a publish request) goes through sanitizeSite before it's used.

export function isSite(x: unknown): x is Site {
  if (!x || typeof x !== "object") return false
  const s = x as Site
  return (
    s.version === 1 &&
    typeof s.name === "string" &&
    !!s.theme &&
    PALETTES.some((p) => p.id === s.theme.palette) &&
    FONTS.some((f) => f.id === s.theme.font) &&
    CORNERS.some((c) => c.id === s.theme.corners) &&
    Array.isArray(s.blocks) &&
    s.blocks.every(
      (b) =>
        b &&
        typeof b.id === "string" &&
        b.type in BLOCKS &&
        b.props &&
        typeof b.props === "object" &&
        Array.isArray(b.items),
    )
  )
}

export const LIMITS = {
  blocks: 40,
  name: 80,
  description: 300,
  text: 4000,
  /** Uploaded photos are already shrunk client-side to ~200KB; this is a backstop. */
  image: 1_500_000,
  /** Whole site as JSON, which is what gets published. */
  siteBytes: 3_000_000,
}

function str(v: unknown, max: number): string {
  return typeof v === "string" ? v.slice(0, max) : ""
}

function cleanFields(fields: Field[], src: unknown): Record<string, string> {
  const o = (src && typeof src === "object" ? src : {}) as Record<string, unknown>
  return Object.fromEntries(
    fields.map((f) => {
      if (f.kind !== "image") return [f.key, str(o[f.key], LIMITS.text)]
      const raw = typeof o[f.key] === "string" ? (o[f.key] as string) : ""
      return [f.key, raw.length <= LIMITS.image && safeImageSrc(raw) ? raw : ""]
    }),
  )
}

/** Rebuild a site from untrusted input, keeping only known fields within limits. */
export function sanitizeSite(x: unknown): Site | null {
  if (!isSite(x)) return null
  const seen = new Set<string>()
  const blocks = x.blocks.slice(0, LIMITS.blocks).map((b): Block => {
    const def = BLOCKS[b.type]
    let id = /^[a-z0-9]{1,16}$/.test(b.id) && !seen.has(b.id) ? b.id : uid()
    while (seen.has(id)) id = uid()
    seen.add(id)
    return {
      id,
      type: def.type,
      props: cleanFields(def.fields, b.props),
      items: def.list ? b.items.slice(0, def.list.max).map((it) => cleanFields(def.list!.fields, it)) : [],
    }
  })
  return {
    version: 1,
    name: str(x.name, LIMITS.name),
    description: str(x.description, LIMITS.description),
    showNav: x.showNav === true,
    theme: {
      palette: x.theme.palette,
      accent: isHex(x.theme.accent) ? x.theme.accent : "",
      font: x.theme.font,
      corners: x.theme.corners,
    },
    blocks,
  }
}

export function slugify(s: string): string {
  return slug(s)
}

function oneLine(s: string, max: number): string {
  const t = s.replace(/\s+/g, " ").trim()
  return t.length > max ? t.slice(0, max - 1).replace(/\s+\S*$/, "") + "…" : t
}

/** The search-result blurb: the student's own, or the first real sentence on the page. */
export function siteDescription(site: Site): string {
  if (site.description?.trim()) return oneLine(site.description, 160)
  for (const b of site.blocks) {
    const text = b.type === "hero" || b.type === "text" || b.type === "contact" ? b.props.body : ""
    if (text?.trim()) return oneLine(text, 160)
  }
  return `${site.name || "A website"}, made with the Ecily Website Maker.`
}

function heroOf(site: Site): Block | undefined {
  return site.blocks.find((b) => b.type === "hero")
}

/** Small, photo-free summary used for gallery cards, so listing sites never loads full pages. */
export type SiteCard = {
  slug: string
  name: string
  eyebrow: string
  heading: string
  blurb: string
  bg: string
  surface: string
  text: string
  muted: string
  accent: string
  onAccent: string
  font: FontId
  radius: string
  button: string
  sections: number
  updatedAt: number
}

export function siteCard(site: Site, slug: string, updatedAt: number): SiteCard {
  const pal = PALETTES.find((x) => x.id === site.theme.palette) ?? PALETTES[0]
  const accent = isHex(site.theme.accent) ? site.theme.accent : pal.accent
  const hero = heroOf(site)
  return {
    slug,
    name: oneLine(site.name || slug, 80),
    eyebrow: oneLine(hero?.props.eyebrow ?? "", 60),
    heading: oneLine(hero?.props.heading || site.name || slug, 120),
    blurb: siteDescription(site),
    bg: pal.bg,
    surface: pal.surface,
    text: pal.text,
    muted: pal.muted,
    accent,
    onAccent: contrastText(accent),
    font: site.theme.font,
    radius: (CORNERS.find((c) => c.id === site.theme.corners) ?? CORNERS[0]).radius,
    button: oneLine(hero?.props.buttonText ?? "", 30),
    sections: site.blocks.length,
    updatedAt,
  }
}

// ── Renderer ─────────────────────────────────────────────────

/** Section anchor ids, derived from headings so links like #menu work. */
export function sectionIds(site: Site): Map<string, string> {
  const used = new Set<string>()
  const ids = new Map<string, string>()
  for (const b of site.blocks) {
    let base = b.type === "hero" ? "top" : b.type === "contact" ? "contact" : slug(b.props.heading || "") || b.type
    let id = base
    for (let n = 2; used.has(id); n++) id = `${base}-${n}`
    used.add(id)
    ids.set(b.id, id)
  }
  return ids
}

/**
 * Rendering context for one block. In the editor preview, text gets
 * contenteditable hooks (data-edit="p:<prop>" or "i:<row>:<field>") so it can
 * be typed into on the canvas; exported HTML never carries any of this.
 */
type Ctx = { preview: boolean }

function editAttr(ctx: Ctx, path: string, multiline = false): string {
  if (!ctx.preview) return ""
  return ` data-edit="${path}"${multiline ? " data-multi" : ""} contenteditable="plaintext-only" spellcheck="true"`
}

/** Paragraph text. In the preview it's wrapped so the whole field is one editable area. */
function richText(ctx: Ctx, text: string, path: string, cls = ""): string {
  const body = paragraphs(text, cls)
  if (!ctx.preview) return body
  return body ? `<div${editAttr(ctx, path, true)}>${body}</div>` : ""
}

function button(ctx: Ctx, text: string, link: string, path: string): string {
  if (!text.trim()) return ""
  return `<a class="btn" href="${escapeHtml(safeHref(link))}"${editAttr(ctx, path)}>${escapeHtml(text)}</a>`
}

function heading(ctx: Ctx, text: string, path: string, tag = "h2"): string {
  return text.trim() ? `<${tag}${editAttr(ctx, path)}>${escapeHtml(text)}</${tag}>` : ""
}

function renderBlock(b: Block, ctx: Ctx): string {
  const p = (k: string) => b.props[k] ?? ""
  const e = (path: string) => editAttr(ctx, path)
  switch (b.type) {
    case "hero": {
      const img = safeImageSrc(p("image"))
      return `<div class="wrap hero${img ? " hero-split" : ""}">
      <div class="hero-copy">
        ${p("eyebrow").trim() ? `<p class="eyebrow"${e("p:eyebrow")}>${escapeHtml(p("eyebrow"))}</p>` : ""}
        ${heading(ctx, p("heading"), "p:heading", "h1")}
        ${richText(ctx, p("body"), "p:body", "lead")}
        ${button(ctx, p("buttonText"), p("buttonLink"), "p:buttonText")}
      </div>
      ${img ? `<img class="hero-img" src="${escapeHtml(img)}" alt="">` : ""}
    </div>`
    }
    case "text":
      return `<div class="wrap narrow">
      ${heading(ctx, p("heading"), "p:heading")}
      ${richText(ctx, p("body"), "p:body")}
    </div>`
    case "cards":
      return `<div class="wrap">
      ${heading(ctx, p("heading"), "p:heading")}
      ${richText(ctx, p("body"), "p:body", "intro")}
      <div class="grid">
        ${b.items
          .map(
            (i, j) => `<article class="card">
          ${(i.tag ?? "").trim() ? `<span class="tag"${e(`i:${j}:tag`)}>${escapeHtml(i.tag)}</span>` : ""}
          ${heading(ctx, i.title ?? "", `i:${j}:title`, "h3")}
          ${richText(ctx, i.body ?? "", `i:${j}:body`)}
        </article>`,
          )
          .join("\n        ")}
      </div>
    </div>`
    case "stats":
      return `<div class="wrap">
      ${heading(ctx, p("heading"), "p:heading")}
      <div class="stats">
        ${b.items
          .map(
            (i, j) =>
              `<div class="stat"><strong${e(`i:${j}:value`)}>${escapeHtml(i.value ?? "")}</strong><span${e(`i:${j}:label`)}>${escapeHtml(i.label ?? "")}</span></div>`,
          )
          .join("\n        ")}
      </div>
    </div>`
    case "details":
      return `<div class="wrap narrow">
      ${heading(ctx, p("heading"), "p:heading")}
      <dl class="rows">
        ${b.items
          .map(
            (i, j) =>
              `<div><dt${e(`i:${j}:label`)}>${escapeHtml(i.label ?? "")}</dt><dd${e(`i:${j}:value`)}>${escapeHtml(i.value ?? "")}</dd></div>`,
          )
          .join("\n        ")}
      </dl>
    </div>`
    case "gallery":
      return `<div class="wrap">
      ${heading(ctx, p("heading"), "p:heading")}
      <div class="gallery">
        ${b.items
          .map((i, j) => {
            const src = safeImageSrc(i.image ?? "")
            const cap = (i.caption ?? "").trim()
            // Empty photo slots are an editor hint only; visitors never see them.
            if (!src && !ctx.preview) return ""
            const pic = src ? `<img src="${escapeHtml(src)}" alt="${escapeHtml(cap)}">` : `<div class="ph">Add a photo</div>`
            return `<figure>${pic}${cap ? `<figcaption${e(`i:${j}:caption`)}>${escapeHtml(cap)}</figcaption>` : ""}</figure>`
          })
          .filter(Boolean)
          .join("\n        ")}
      </div>
    </div>`
    case "quote":
      return `<div class="wrap narrow">
      <blockquote>
        ${richText(ctx, p("quote"), "p:quote")}
        ${p("author").trim() ? `<cite${e("p:author")}>${escapeHtml(p("author"))}</cite>` : ""}
      </blockquote>
    </div>`
    case "faq":
      return `<div class="wrap narrow">
      ${heading(ctx, p("heading"), "p:heading")}
      <div class="faq">
        ${b.items
          .map(
            (i, j) =>
              `<details${ctx.preview ? " open" : ""}><summary>${
                ctx.preview ? `<span${e(`i:${j}:question`)}>${escapeHtml(i.question ?? "")}</span>` : escapeHtml(i.question ?? "")
              }</summary>${richText(ctx, i.answer ?? "", `i:${j}:answer`)}</details>`,
          )
          .join("\n        ")}
      </div>
    </div>`
    case "contact": {
      const email = p("email").trim()
      const phone = p("phone").trim()
      const address = p("address").trim()
      const lines = [
        email && `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>`,
        phone && `<a href="tel:${escapeHtml(phone.replace(/[^\d+]/g, ""))}">${escapeHtml(phone)}</a>`,
        address && `<span>${escapeHtml(address)}</span>`,
      ].filter(Boolean)
      return `<div class="wrap narrow center">
      ${heading(ctx, p("heading"), "p:heading")}
      ${richText(ctx, p("body"), "p:body", "lead")}
      ${lines.length ? `<p class="contact-lines">${lines.join("")}</p>` : ""}
      ${button(ctx, p("buttonText"), p("buttonLink"), "p:buttonText")}
    </div>`
    }
  }
}

function css(site: Site): string {
  const pal = PALETTES.find((x) => x.id === site.theme.palette) ?? PALETTES[0]
  const font = FONTS.find((x) => x.id === site.theme.font) ?? FONTS[0]
  const radius = (CORNERS.find((x) => x.id === site.theme.corners) ?? CORNERS[0]).radius
  const accent = isHex(site.theme.accent) ? site.theme.accent : pal.accent
  return `:root {
  --bg: ${pal.bg};
  --surface: ${pal.surface};
  --text: ${pal.text};
  --muted: ${pal.muted};
  --border: ${pal.border};
  --accent: ${accent};
  --on-accent: ${contrastText(accent)};
  --radius: ${radius};
  --font-heading: ${font.heading};
  --font-body: ${font.body};
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; background: var(--bg); color: var(--text); font: 17px/1.65 var(--font-body); -webkit-font-smoothing: antialiased; }
img { max-width: 100%; display: block; }
a { color: var(--accent); }
h1, h2, h3 { font-family: var(--font-heading); font-weight: ${font.headingWeight}; line-height: 1.12; letter-spacing: -0.015em; margin: 0 0 0.5em; }
h1 { font-size: clamp(2.4rem, 6vw, 4.2rem); }
h2 { font-size: clamp(1.7rem, 3.6vw, 2.5rem); }
h3 { font-size: 1.2rem; }
p { margin: 0 0 1em; }
.wrap { max-width: 1080px; margin: 0 auto; padding: 0 24px; }
.narrow { max-width: 720px; }
.center { text-align: center; }
section { padding: clamp(56px, 9vw, 104px) 0; }
section + section { border-top: 1px solid var(--border); }
.site-nav { position: sticky; top: 0; z-index: 10; background: color-mix(in srgb, var(--bg) 88%, transparent); backdrop-filter: blur(10px); border-bottom: 1px solid var(--border); }
.site-nav .wrap { display: flex; align-items: center; justify-content: space-between; gap: 16px; height: 64px; }
.brand { font-family: var(--font-heading); font-weight: ${font.headingWeight}; font-size: 1.15rem; color: var(--text); text-decoration: none; }
.site-nav ul { display: flex; gap: 22px; list-style: none; margin: 0; padding: 0; }
.site-nav ul a { color: var(--muted); text-decoration: none; font-size: 0.92rem; }
.site-nav ul a:hover { color: var(--text); }
.eyebrow { text-transform: uppercase; letter-spacing: 0.16em; font-size: 0.75rem; font-weight: 600; color: var(--accent); }
.lead { font-size: 1.15rem; color: var(--muted); max-width: 36em; }
.center .lead { margin-left: auto; margin-right: auto; }
.intro { color: var(--muted); max-width: 40em; }
.hero { padding-top: clamp(16px, 4vw, 40px); }
.hero-split { display: grid; grid-template-columns: 1.1fr 1fr; gap: 48px; align-items: center; }
.hero-img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; border-radius: var(--radius); }
.btn { display: inline-block; margin-top: 8px; padding: 14px 26px; border-radius: max(var(--radius), 6px); background: var(--accent); color: var(--on-accent); font-weight: 600; text-decoration: none; transition: transform .15s ease, filter .15s ease; }
.btn:hover { transform: translateY(-1px); filter: brightness(1.06); }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin-top: 28px; }
.card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 26px; }
.card p { color: var(--muted); margin: 0; }
.tag { display: inline-block; margin-bottom: 14px; padding: 3px 10px; border-radius: 999px; background: color-mix(in srgb, var(--accent) 14%, transparent); color: var(--accent); font-size: 0.78rem; font-weight: 600; }
.stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 24px; text-align: center; }
.stat strong { display: block; font-family: var(--font-heading); font-size: clamp(2.2rem, 5vw, 3.2rem); line-height: 1.1; color: var(--accent); }
.stat span { color: var(--muted); }
.rows { margin: 24px 0 0; }
.rows div { display: flex; justify-content: space-between; gap: 24px; padding: 14px 0; border-bottom: 1px solid var(--border); }
.rows dt { font-weight: 600; }
.rows dd { margin: 0; color: var(--muted); text-align: right; }
.gallery { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-top: 28px; }
.gallery figure { margin: 0; }
.gallery img, .gallery .ph { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; border-radius: var(--radius); }
.gallery .ph { display: grid; place-items: center; background: var(--surface); border: 1px dashed var(--border); color: var(--muted); font-size: 0.9rem; }
.gallery figcaption { margin-top: 8px; font-size: 0.9rem; color: var(--muted); }
blockquote { margin: 0; padding-left: 28px; border-left: 3px solid var(--accent); }
blockquote p { font-family: var(--font-heading); font-size: clamp(1.35rem, 3vw, 1.9rem); line-height: 1.35; }
cite { font-style: normal; color: var(--muted); }
cite::before { content: "— "; }
.faq { margin-top: 24px; }
details { border-bottom: 1px solid var(--border); padding: 16px 0; }
summary { cursor: pointer; font-weight: 600; }
details p { color: var(--muted); margin: 10px 0 0; }
.contact-lines { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px 28px; margin: 8px 0 24px; }
.contact-lines span { color: var(--muted); }
footer { padding: 32px 0; border-top: 1px solid var(--border); color: var(--muted); font-size: 0.85rem; }
footer .wrap { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
footer a { color: inherit; }
@media (max-width: 760px) {
  .hero-split { grid-template-columns: 1fr; }
  .site-nav ul { display: none; }
  .rows div { flex-direction: column; gap: 2px; }
  .rows dd { text-align: left; }
}`
}

export type RenderOptions = {
  /** Adds data-block-id hooks + hover outlines so the editor can map clicks to sections. */
  preview?: boolean
  activeId?: string | null
  /** Set when serving a published site: adds a "Report" link to the footer. */
  reportHref?: string
  /** Absolute URL of the published page, for canonical + social tags. */
  canonical?: string
  noindex?: boolean
}

/** The <head> contents. Kept separate so the live preview can skip reloading fonts on every keystroke. */
export function renderHead(site: Site, seo?: Pick<RenderOptions, "canonical" | "noindex">): string {
  const font = FONTS.find((x) => x.id === site.theme.font) ?? FONTS[0]
  return `<meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(site.name || "My website")}</title>${seo ? seoTags(site, seo) : ""}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?${font.query}&display=swap">
  <style>
${css(site)}
  </style>`
}

export function renderBody(site: Site, opts: RenderOptions = {}): string {
  const ids = sectionIds(site)
  const navItems = site.blocks
    .filter((b) => b.type !== "hero" && b.type !== "quote" && b.type !== "stats" && (b.props.heading ?? "").trim())
    .slice(0, 5)
  const nav = site.showNav
    ? `<header class="site-nav">
    <div class="wrap">
      <a class="brand" href="#top">${escapeHtml(site.name || "My website")}</a>
      <ul>
        ${navItems.map((b) => `<li><a href="#${ids.get(b.id)}">${escapeHtml(b.props.heading)}</a></li>`).join("\n        ")}
      </ul>
    </div>
  </header>`
    : ""

  const ctx: Ctx = { preview: !!opts.preview }
  const sections = site.blocks
    .map((b, i) => {
      if (!opts.preview) {
        return `<section id="${ids.get(b.id)}">
    ${renderBlock(b, ctx)}
  </section>`
      }
      const id = escapeHtml(b.id)
      return `<section id="${ids.get(b.id)}" data-block-id="${id}"${opts.activeId === b.id ? " data-active" : ""}>
    ${sectionTools(BLOCKS[b.type].label, i, site.blocks.length)}
    ${renderBlock(b, ctx)}
  </section>
  ${insertBar(b.id)}`
    })
    .join("\n\n  ")
    || (opts.preview
      ? `<section class="__empty" data-insert-after=""><div class="wrap narrow center"><h2>Your page is empty.</h2><p class="lead">Add a section to get started.</p><button type="button" class="btn" data-act="insert">Add a section</button></div></section>`
      : "")

  const year = new Date().getFullYear()
  return `${nav}

  <main>
  ${sections}
  </main>

  <footer>
    <div class="wrap">
      <span>© ${year} ${escapeHtml(site.name || "My website")}</span>
      <span>Made with the <a href="https://ecily.org/build">Ecily Website Maker</a>${
        opts.reportHref ? ` · <a href="${escapeHtml(opts.reportHref)}">Report</a>` : ""
      }</span>
    </div>
  </footer>`
}

/** Search + link-preview tags. Skipped in the live preview so typing doesn't rewrite <head>. */
function seoTags(site: Site, seo: Pick<RenderOptions, "canonical" | "noindex">): string {
  const pal = PALETTES.find((x) => x.id === site.theme.palette) ?? PALETTES[0]
  const title = escapeHtml(site.name || "My website")
  const desc = escapeHtml(siteDescription(site))
  const image = safeImageSrc(heroOf(site)?.props.image ?? "")
  const og = image.startsWith("https://") ? image : ""
  const tags = [
    `<meta name="description" content="${desc}">`,
    `<meta name="theme-color" content="${pal.bg}">`,
    seo.noindex ? `<meta name="robots" content="noindex">` : "",
    seo.canonical ? `<link rel="canonical" href="${escapeHtml(seo.canonical)}">` : "",
    `<meta property="og:type" content="website">`,
    `<meta property="og:title" content="${title}">`,
    `<meta property="og:description" content="${desc}">`,
    seo.canonical ? `<meta property="og:url" content="${escapeHtml(seo.canonical)}">` : "",
    og ? `<meta property="og:image" content="${escapeHtml(og)}">` : "",
    `<meta name="twitter:card" content="${og ? "summary_large_image" : "summary"}">`,
  ]
  return "\n  " + tags.filter(Boolean).join("\n  ")
}

// ── Editor-only canvas chrome (never exported) ──────────────

const svg = (d: string) =>
  `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${d}"/></svg>`

function sectionTools(label: string, index: number, count: number): string {
  const btn = (act: string, title: string, d: string, disabled = false) =>
    `<button type="button" data-act="${act}" title="${title}" aria-label="${title}"${disabled ? " disabled" : ""}>${svg(d)}</button>`
  return `<div class="__tools" contenteditable="false">
      <span class="__label">${escapeHtml(label)}</span>
      ${btn("up", "Move up", "M18 15l-6-6-6 6", index === 0)}
      ${btn("down", "Move down", "M6 9l6 6 6-6", index === count - 1)}
      ${btn("dup", "Duplicate", "M8 8h12v12H8zM4 16V4h12")}
      ${btn("del", "Delete section", "M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14")}
    </div>`
}

function insertBar(afterId: string): string {
  return `<div class="__insert" data-insert-after="${escapeHtml(afterId)}" contenteditable="false"><button type="button" data-act="insert">${svg("M12 5v14M5 12h14")}<span>Add section</span></button></div>`
}

/** Styles for the canvas chrome above: section outlines, toolbars, insert bars, editable text. */
export const PREVIEW_CSS = `
[data-block-id] { position: relative; }
[data-block-id]::after { content: ""; position: absolute; inset: 4px; border-radius: 6px; pointer-events: none; transition: box-shadow .15s ease; }
[data-block-id]:hover::after { box-shadow: inset 0 0 0 1.5px color-mix(in srgb, var(--accent) 45%, transparent); }
[data-block-id][data-active]::after { box-shadow: inset 0 0 0 2px var(--accent); }

.__tools { position: absolute; top: 14px; right: 14px; z-index: 30; display: flex; align-items: center; gap: 2px; padding: 4px; border-radius: 12px;
  background: rgba(17,17,18,.92); color: #fff; box-shadow: 0 8px 24px rgba(0,0,0,.25); backdrop-filter: blur(8px);
  font: 500 11px/1 system-ui, -apple-system, sans-serif; opacity: 0; transform: translateY(-4px); pointer-events: none; transition: opacity .15s ease, transform .15s ease; }
[data-block-id]:hover > .__tools, [data-block-id][data-active] > .__tools { opacity: 1; transform: none; pointer-events: auto; }
.__label { padding: 0 8px 0 6px; letter-spacing: .08em; text-transform: uppercase; color: rgba(255,255,255,.6); }
.__tools button { all: unset; width: 28px; height: 28px; display: grid; place-items: center; border-radius: 8px; cursor: pointer; color: rgba(255,255,255,.75); }
.__tools button:hover { background: rgba(255,255,255,.12); color: #fff; }
.__tools button[data-act="del"]:hover { background: rgba(239,68,68,.2); color: #fca5a5; }
.__tools button:disabled { opacity: .3; pointer-events: none; }

.__insert { position: relative; height: 0; z-index: 25; }
.__insert::before { content: ""; position: absolute; left: 0; right: 0; top: -16px; height: 32px; }
.__insert::after { content: ""; position: absolute; left: 24px; right: 24px; top: -1px; border-top: 2px solid var(--accent); opacity: 0; transition: opacity .15s ease; }
.__insert button { all: unset; position: absolute; left: 50%; top: 0; z-index: 1; transform: translate(-50%, -50%) scale(.9); display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 14px 7px 10px; border-radius: 999px; background: var(--accent); color: var(--on-accent); font: 600 12px/1 system-ui, -apple-system, sans-serif;
  box-shadow: 0 6px 18px rgba(0,0,0,.2); cursor: pointer; opacity: 0; transition: opacity .15s ease, transform .15s ease; }
.__insert:hover::after, .__insert:hover button { opacity: 1; }
.__insert:hover button { transform: translate(-50%, -50%) scale(1); }
.__empty { min-height: 60vh; display: grid; place-items: center; }

[data-edit] { cursor: text; border-radius: 4px; outline: none; transition: box-shadow .12s ease, background-color .12s ease; }
[data-edit]:hover { box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent) 30%, transparent); }
[data-edit]:focus { box-shadow: 0 0 0 2px var(--accent); background: color-mix(in srgb, var(--accent) 6%, transparent); }
[data-edit]:empty::before { content: "Type something…"; opacity: .35; }
a.btn[data-edit]:hover, a.btn[data-edit]:focus { transform: none; filter: none; }
summary [data-edit] { display: inline-block; }
`

/** The complete, standalone index.html a student downloads (or that /s/[slug] serves). */
export function renderSite(site: Site, opts: Pick<RenderOptions, "reportHref" | "canonical" | "noindex"> = {}): string {
  return `<!doctype html>
<html lang="en">
<head>
  ${renderHead(site, opts)}
</head>
<body>
  ${renderBody(site, opts)}
</body>
</html>
`
}
