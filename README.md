# ecily.org

Marketing site for [Ecily](https://ecily.org), an iOS app that teaches personal finance to teenagers through decisions they can actually lose. The app itself lives in [krishayyy/ecilyapp](https://github.com/krishayyy/ecilyapp).

This repo also hosts **Ecily Research** (`research.ecily.org`, or `/research` in dev), a research copilot for students: ask a question, get a synthesized answer grounded in real academic and credible sources with inline citations — built to make research more efficient, not to write the essay for you.

## What's here

- **Landing page** — hero, mission, feature and world sections, and a credibility marquee.
- **Waitlist and chapter signup** — `/api/waitlist` and `/api/chapter` routes, forwarded to a Google Sheet via `scripts/sheet-webhook.gs`.
- **Legal and support pages** — `/privacy`, `/terms`, `/support`, and `/team`, which back the App Store listing's required URLs.
- **Ecily Research** (`app/research`) — a Claude-style chat UI that queries Semantic Scholar (academic papers) and a `.gov`/`.edu`/credible-org-restricted web search (Tavily), then has Groq synthesize a cited answer. Accounts and saved search history run on Supabase; run `scripts/research-schema.sql` once in your Supabase project to create the table.

## Stack

Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion and GSAP for motion. Deployed on Netlify.

## Running locally

```bash
npm install && npm run dev
```

Copy `.env.example` to `.env.local` and fill in your own values first — the signup routes need the webhook target set, and Ecily Research needs `GROQ_API_KEY` (required), `TAVILY_API_KEY` (optional — academic-only results without it), and the two Supabase vars (optional — no saved history without them).
