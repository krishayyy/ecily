import type { Config } from "tailwindcss";

/* Tokens live in app/globals.css as CSS custom properties; this file only maps
   them onto Tailwind's scale. Adding a raw hex to a component is a regression —
   if a value is missing here, add it here. */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "var(--canvas)",
          sunk: "var(--canvas-sunk)",
        },
        hairline: {
          DEFAULT: "var(--hairline)",
          strong: "var(--hairline-strong)",
        },
        ink: {
          DEFAULT: "var(--ink)",
          2: "var(--ink-2)",
          3: "var(--ink-3)",
        },
        sage: "var(--sage)",
        theatre: {
          DEFAULT: "var(--theatre)",
          rise: "var(--theatre-rise)",
          line: "var(--theatre-line)",
        },
        "on-theatre": {
          DEFAULT: "var(--on-theatre)",
          2: "var(--on-theatre-2)",
        },
      },

      /* One type scale. Sizes are fluid where they need to survive a phone and
         a 27" display; fixed where fluidity would only cause drift. */
      fontSize: {
        display: [
          "clamp(2.75rem, 7vw, 5.25rem)",
          { lineHeight: "0.98", letterSpacing: "-0.032em" },
        ],
        title: [
          "clamp(2rem, 4.5vw, 3.25rem)",
          { lineHeight: "1.06", letterSpacing: "-0.026em" },
        ],
        heading: [
          "clamp(1.5rem, 2.6vw, 2.05rem)",
          { lineHeight: "1.16", letterSpacing: "-0.02em" },
        ],
        subhead: [
          "1.1875rem",
          { lineHeight: "1.32", letterSpacing: "-0.012em" },
        ],
        lead: [
          "clamp(1.0625rem, 1.4vw, 1.1875rem)",
          { lineHeight: "1.62", letterSpacing: "-0.004em" },
        ],
        body: ["1rem", { lineHeight: "1.66" }],
        small: ["0.875rem", { lineHeight: "1.58" }],
        caption: ["0.8125rem", { lineHeight: "1.5" }],
      },

      spacing: {
        section: "var(--section)",
        "section-sm": "var(--section-sm)",
        "section-lg": "var(--section-lg)",
      },

      maxWidth: {
        measure: "34rem", // ~66ch — the body-copy measure, used everywhere
        shell: "72rem",
      },

      borderRadius: {
        card: "1.25rem",
        panel: "1.75rem",
      },

      transitionTimingFunction: {
        ease: "var(--ease)",
      },
      transitionDuration: {
        fast: "var(--dur-fast)",
        DEFAULT: "var(--dur)",
        slow: "var(--dur-slow)",
      },

      boxShadow: {
        /* Shadows are ink-tinted, never neutral black — a pure-black shadow on
           an ivory ground reads grey and dirty. */
        lift: "0 1px 2px rgba(54,69,59,0.04), 0 8px 24px rgba(54,69,59,0.07)",
        "lift-lg":
          "0 2px 4px rgba(54,69,59,0.04), 0 18px 48px rgba(54,69,59,0.10)",
        theatre: "0 24px 64px rgba(20,28,22,0.45)",
      },
    },
  },
  plugins: [],
};
export default config;
