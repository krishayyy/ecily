import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        night: { DEFAULT: "#0E1240", 2: "#151B57", 3: "#1E2670" },
        cream: "#F7F1DE",
        mango: "#F5A623",
        leaf: "#3FA46B",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        display: ["var(--font-bricolage)", "system-ui", "sans-serif"],
        hand: ["var(--font-gaegu)", "cursive"],
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        sway: { "0%,100%": { transform: "rotate(-1.6deg)" }, "50%": { transform: "rotate(1.6deg)" } },
        bob: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-7px)" } },
        swing: { "0%,100%": { transform: "rotate(2.2deg)" }, "50%": { transform: "rotate(-2.2deg)" } },
        wiggle: { "0%,100%": { transform: "rotate(0)" }, "25%": { transform: "rotate(-12deg)" }, "75%": { transform: "rotate(10deg)" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        sway: "sway 5.2s ease-in-out infinite",
        bob: "bob 3.1s ease-in-out infinite",
        swing: "swing 4.4s ease-in-out infinite",
        wiggle: "wiggle 0.5s ease-in-out",
      },
    },
  },
  plugins: [animate],
};
export default config;
