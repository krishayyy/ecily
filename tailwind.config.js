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
          DEFAULT: "#D4AF37", // Warm premium gold
          bright: "#F5D142",
          dim: "#8C6D1F",
        },
        electric: "#3B82F6",
        void: "#030303",
        graphite: "#121212",
        midnight: "#050508",
        onyx: "#0A0A0A",
        border: {
          subtle: "rgba(255, 255, 255, 0.05)",
          bright: "rgba(255, 255, 255, 0.1)",
        },
        accent: {
          gold: "#D4AF37",
          blue: "#3B82F6",
          purple: "#6366F1",
          rose: "#E11D48",
          emerald: "#10B981",
        }
      },
      fontFamily: {
        display: ['"Inter"', 'sans-serif'], // I'll use Inter as a base but style it heavily
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'micro': '0.65rem',
        'display-lg': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '0.9', letterSpacing: '-0.04em' }],
        'display-md': ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
      },
      letterSpacing: {
        'tightest': '-0.05em',
        'widest-xl': '0.3em',
      },
      borderRadius: {
        'super': '2.5rem',
      },
      boxShadow: {
        'soft-glow': '0 0 40px rgba(0, 0, 0, 0.8)',
        'gold-bloom': '0 0 30px rgba(212, 175, 55, 0.2)',
        'blue-bloom': '0 0 30px rgba(59, 130, 246, 0.2)',
      },
      backdropBlur: {
        'premium': '40px',
      }
    },
  },
  plugins: [],
}
