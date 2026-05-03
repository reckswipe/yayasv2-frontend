import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "var(--void)",
        obsidian: "var(--obsidian)",
        carbon: "var(--carbon)",
        smoke: "var(--smoke)",
        ash: "var(--ash)",
        cream: "var(--cream)",
        parchment: "var(--parchment)",
        gold: "var(--gold)",
        "gold-dim": "var(--gold-dim)",
        blood: "var(--blood)",
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        "space-grotesk": ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      letterSpacing: {
        widest: "0.15em",
      },
    },
  },
  plugins: [],
};
export default config;