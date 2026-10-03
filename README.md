# ecily.org

Marketing site for [Ecily](https://ecily.org), an iOS app that teaches personal finance to teenagers through decisions they can actually lose. The app itself lives in [krishayyy/ecilyapp](https://github.com/krishayyy/ecilyapp).

## What's here

- **Landing page** — hero, mission, feature and world sections, and a credibility marquee.
- **Waitlist and chapter signup** — `/api/waitlist` and `/api/chapter` routes, forwarded to a Google Sheet via `scripts/sheet-webhook.gs`.
- **Website Maker** — `/build`, a no-signup site builder for the AI-for-good class. Students start from a template, edit sections, and either download a standalone `index.html` or publish to `ecily.org/s/<name>`. Published sites live in Upstash Redis (`lib/siteStore.ts`); the server rebuilds every page from validated JSON, so it never accepts raw HTML, and serves it with a no-script CSP. Owners edit with a secret token kept in their browser. Published sites are indexable (canonical + Open Graph tags; `SITES_NOINDEX=1` turns that off). Students can opt in to the community gallery at `/gallery`; submissions wait for review at `/gallery/admin` (unlocked with `SITES_ADMIN_TOKEN`), and approved sites also go in `/sitemap.xml`. Takedowns: the Take down button there, or `DELETE /api/sites/<name>` with `SITES_ADMIN_TOKEN`.
- **Legal and support pages** — `/privacy`, `/terms`, `/support`, and `/team`, which back the App Store listing's required URLs.

## Stack

Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion and GSAP for motion. Deployed on Netlify.

## Running locally

```bash
npm install && npm run dev
```

Copy `.env.example` to `.env.local` and fill in your own values first — the signup routes need the webhook target set.
