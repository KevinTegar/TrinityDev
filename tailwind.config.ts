import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          base: "#050508",
          secondary: "#0d0d12",
          elevated: "#1a1a24",
        },
        accent: {
          primary: "#60A5FA",
          secondary: "#818CF8",
          tertiary: "#34D399",
          quaternary: "#F472B6",
        },
        text: {
          primary: "#F8FAFC",
          secondary: "#94A3B8",
          tertiary: "#64748B",
        },
        border: {
          default: "#1a1a24",
          hover: "rgba(96, 165, 250, 0.19)",
        },
      },
      fontFamily: {
        display: ["Space Grotesk", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      spacing: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        8: "32px",
        10: "40px",
        12: "48px",
        16: "64px",
        20: "80px",
        24: "96px",
        32: "128px",
      },
      borderRadius: {
        DEFAULT: "8px",
        lg: "16px",
      },
      boxShadow: {
        glow: "0 4px 20px rgba(96, 165, 250, 0.25)",
        "glow-strong": "0 6px 30px rgba(96, 165, 250, 0.4)",
        card: "0 0 30px rgba(96, 165, 250, 0.06)",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #60A5FA, #818CF8)",
        "gradient-dark": "linear-gradient(135deg, #0d0d12, #1a1a24)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "counter": "counter 2s ease-out forwards",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;