import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111110",
        paper: "#F2EFE9",
        vermilion: "#E8390E",
      },
      fontFamily: {
        display: ["var(--font-clash)", "sans-serif"],
        body: ["var(--font-general)", "sans-serif"],
        serif: ["var(--font-instrument)", "serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      fontSize: {
        "display-2xl": ["clamp(3.25rem, 11vw, 10rem)", { lineHeight: "0.92", letterSpacing: "-0.02em" }],
        "display-xl": ["clamp(2.75rem, 7.5vw, 6.5rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(1.9rem, 4.5vw, 3.6rem)", { lineHeight: "1.05", letterSpacing: "-0.01em" }],
        "display-md": ["clamp(1.4rem, 2.6vw, 2.1rem)", { lineHeight: "1.15" }],
        meta: ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.14em" }],
      },
    },
  },
  plugins: [],
};

export default config;
