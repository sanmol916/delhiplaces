import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0a0a12",
          800: "#11111d",
          700: "#16162a",
          600: "#1d1d35",
        },
        neon: {
          violet: "#7c3aed",
          fuchsia: "#ec4899",
          lime: "#c6f135",
          cyan: "#22d3ee",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "grad-brand": "linear-gradient(135deg,#7c3aed 0%,#ec4899 100%)",
        "grad-lime": "linear-gradient(135deg,#c6f135 0%,#22d3ee 100%)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(124,58,237,0.25), 0 18px 60px -18px rgba(236,72,153,0.55)",
        "glow-lime": "0 0 40px -8px rgba(198,241,53,0.55)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        float: "float 6s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
