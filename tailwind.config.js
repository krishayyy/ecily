/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#F5C842",
          deep: "#D4A017",
          glow: "#FFE066",
        },
        void: "#030303",
        dark: {
          base: "#0A0A0F",
          surface: "#0D0D12",
          card: "#14141A",
          border: "#1F1F26",
        },
        wallStreet: {
          green: "#00FF88",
          gold: "#FFD700",
        },
        crypto: {
          neon: "#00F5FF",
          purple: "#8B5CF6",
        },
        taxBlue: "#3B82F6",
        creditPink: "#EC4899",
        jobOrange: "#F97316",
        budgetTeal: "#14B8A6",
        realEstateBrown: "#A16207",
        mindsetViolet: "#7C3AED",
        success: "#22C55E",
        error: "#EF4444",
        warning: "#F59E0B",
        streakFire: "#FF6B35",
        xpBlue: "#6366F1",
      },
      fontFamily: {
        rounded: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        'sm': '12px',
        'md': '20px',
        'lg': '32px',
        'xl': '48px',
        'full': '999px',
      },
      boxShadow: {
        'premium': '0 20px 50px rgba(0, 0, 0, 0.5)',
        'glow-gold': '0 0 30px rgba(245, 200, 66, 0.3)',
        'glow-blue': '0 0 30px rgba(99, 102, 241, 0.3)',
      }
    },
  },
  plugins: [],
}
