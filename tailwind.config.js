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
          DEFAULT: "#C5A059", // More muted, elegant gold
          bright: "#D4AF37",
          dim: "#8C6D1F",
        },
        electric: "#4A90E2", // Softer blue
        void: "#030303",
        midnight: "#08080A", // Slightly raised from pure black for depth
        surface: "rgba(255, 255, 255, 0.03)",
        "surface-bright": "rgba(255, 255, 255, 0.07)",
        border: {
          DEFAULT: "rgba(255, 255, 255, 0.08)",
          subtle: "rgba(255, 255, 255, 0.04)",
        }
      },
      fontFamily: {
        display: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'micro': '0.6rem',
        'display-lg': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.5rem, 4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
      },
      borderRadius: {
        'super': '1.5rem', // Less rounded for a more modern feel
      },
      letterSpacing: {
        'tightest': '-0.05em',
        'widest-xl': '0.3em',
      },
      boxShadow: {
        'premium': '0 20px 40px rgba(0, 0, 0, 0.4)',
        'gold-glow': '0 0 20px rgba(197, 160, 89, 0.1)',
      },
      backdropBlur: {
        'premium': '40px',
      }
    },
  },
  plugins: [],
}
