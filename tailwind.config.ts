import type { Config } from "tailwindcss";

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
        cream: "#F7F6F1",
        paper: "#FBFAF7",
        ink: "#16150F",
        sand: "#CACF85",
        sage: "#8CBA80",
        slate: "#658E9C",
        grape: "#4D5382",
        plum: "#514663",
      },
    },
  },
  plugins: [],
};
export default config;
