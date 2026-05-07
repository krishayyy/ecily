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
        void: "#050508",
        dark: {
          base: "#0A0A0F",
          surface: "#12121A",
          card: "#1A1A26",
          border: "#2A2A3A",
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
        rounded: ['"Inter"', 'sans-serif'], // Use Inter as a base, rounded in CSS if needed
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        'full': '999px',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
