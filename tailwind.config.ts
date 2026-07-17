import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          purple: "#A855F7",
          magenta: "#D946EF",
          cyan: "#22D3EE",
          blue: "#3B82F6",
        },
        dark: {
          base: "#050507",
          card: "#0D0D12",
          border: "#1A1A2E",
          muted: "#B4B4C0",
        },
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #A855F7 0%, #D946EF 35%, #22D3EE 70%, #3B82F6 100%)",
        "brand-gradient-r":
          "linear-gradient(to right, #A855F7, #D946EF, #22D3EE, #3B82F6)",
        "brand-gradient-hero":
          "radial-gradient(ellipse at top left, rgba(168,85,247,0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(34,211,238,0.10) 0%, transparent 50%)",
        "card-glass":
          "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
        "glow-purple":
          "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(168,85,247,0.25) 0%, transparent 70%)",
        "glow-cyan":
          "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(34,211,238,0.15) 0%, transparent 70%)",
      },
      boxShadow: {
        "glow-purple": "0 0 40px rgba(168,85,247,0.3)",
        "glow-cyan": "0 0 40px rgba(34,211,238,0.2)",
        "glow-brand": "0 0 60px rgba(168,85,247,0.2), 0 0 100px rgba(34,211,238,0.1)",
        card: "0 4px 24px rgba(0,0,0,0.4)",
        "card-hover": "0 8px 40px rgba(168,85,247,0.2), 0 4px 24px rgba(0,0,0,0.4)",
      },
      animation: {
        shimmer: "shimmer 3s linear infinite",
        "spin-slow": "spin 8s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        marquee: "marquee 25s linear infinite",
        "marquee-reverse": "marquee 25s linear infinite reverse",
        "gradient-x": "gradient-x 6s ease infinite",
        "fade-up": "fade-up 0.6s ease forwards",
        "fade-in": "fade-in 0.4s ease forwards",
        "scale-in": "scale-in 0.3s ease forwards",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "20px",
        "4xl": "24px",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
