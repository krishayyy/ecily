# ecily.org

Marketing site for [Ecily](https://ecily.org), an iOS app that teaches personal finance to teenagers through decisions they can actually lose. The app itself lives in [krishayyy/ecilyapp](https://github.com/krishayyy/ecilyapp).

## What's here

- **Landing page** — hero, mission, feature and world sections, and a credibility marquee.
- **Waitlist and chapter signup** — `/api/waitlist` and `/api/chapter` routes, forwarded to a Google Sheet via `scripts/sheet-webhook.gs`.
- **Legal and support pages** — `/privacy`, `/terms`, `/support`, and `/team`, which back the App Store listing's required URLs.

## Stack

Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion and GSAP for motion. Deployed on Netlify.

## Running locally

```bash
npm install && npm run dev
```

Copy `.env.example` to `.env.local` and fill in your own values first — the signup routes need the webhook target set.
