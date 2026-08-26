export interface World {
  id: number
  name: string
  accent: string
  accentDim: string
  label: string
  tagline: string
  feature: string
  detail: string
}

export const worlds: World[] = [
  {
    id: 1,
    name: "Budget City",
    accent: "#C9A96E",
    accentDim: "rgba(201,169,110,0.12)",
    label: "WORLD 01 / 08",
    tagline: "Where every dollar has a job.",
    feature: "Budgeting Basics",
    detail: "Learn the 50/30/20 rule, track spending by category, and build a budget that actually sticks, without a spreadsheet.",
  },
  {
    id: 2,
    name: "Wall Street",
    accent: "#5EA88A",
    accentDim: "rgba(94,168,138,0.12)",
    label: "WORLD 02 / 08",
    tagline: "Play the market. Risk nothing.",
    feature: "Paper Trading",
    detail: "Buy and sell real stocks with $10,000 of simulated cash. See how the market moves before you put in a single dollar.",
  },
  {
    id: 3,
    name: "Tax Town",
    accent: "#6B9BC4",
    accentDim: "rgba(107,155,196,0.12)",
    label: "WORLD 03 / 08",
    tagline: "Keep more of what you earn.",
    feature: "Taxes Demystified",
    detail: "Understand W-2s, deductions, and why your paycheck is smaller than you expected, with laws tailored to your state.",
  },
  {
    id: 4,
    name: "Credit City",
    accent: "#C47B96",
    accentDim: "rgba(196,123,150,0.12)",
    label: "WORLD 04 / 08",
    tagline: "Build credit before you need it.",
    feature: "Credit Scores",
    detail: "Learn what moves your score up or down, how to build credit as a teen, and why it matters for your first apartment.",
  },
  {
    id: 5,
    name: "First Job",
    accent: "#D4956A",
    accentDim: "rgba(212,149,106,0.12)",
    label: "WORLD 05 / 08",
    tagline: "Get paid. Keep more.",
    feature: "Paychecks & Rights",
    detail: "Decode your first paycheck, know your minimum wage rights by state, and learn the difference between W-2 and 1099.",
  },
  {
    id: 6,
    name: "Crypto Zone",
    accent: "#8B94D4",
    accentDim: "rgba(139,148,212,0.12)",
    label: "WORLD 06 / 08",
    tagline: "Hype vs. reality.",
    feature: "Crypto & Volatility",
    detail: "Understand what blockchain actually is, why crypto is volatile, and how to think about speculation vs. investing.",
  },
  {
    id: 7,
    name: "Real Estate",
    accent: "#A08F74",
    accentDim: "rgba(160,143,116,0.12)",
    label: "WORLD 07 / 08",
    tagline: "Own something that lasts.",
    feature: "Rent vs. Buy",
    detail: "Learn how mortgages work, what equity means, and whether renting or buying makes more sense at different life stages.",
  },
  {
    id: 8,
    name: "Money Mindset",
    accent: "#9E7EC4",
    accentDim: "rgba(158,126,196,0.12)",
    label: "WORLD 08 / 08",
    tagline: "The game starts in your head.",
    feature: "Psychology of Money",
    detail: "Explore lifestyle inflation, delayed gratification, and the mental traps that keep people broke, even high earners.",
  },
]
