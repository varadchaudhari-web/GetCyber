import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        cyber: {
          blue: "#2563EB",
          "blue-light": "#3B82F6",
          "blue-dark": "#1D4ED8",
          green: "#22C55E",
          "green-light": "#4ADE80",
          "green-dark": "#16A34A",
          red: "#EF4444",
          yellow: "#F59E0B",
          purple: "#8B5CF6",
          cyan: "#06B6D4",
          orange: "#F97316",
        },
        dark: {
          bg: "#0F172A",
          surface: "#111827",
          card: "#1E293B",
          border: "#2D3748",
          "border-light": "#374151",
          muted: "#374151",
          text: "#94A3B8",
          "text-bright": "#CBD5E1",
          "text-white": "#F1F5F9",
        },
      },
      backgroundImage: {
        "cyber-gradient": "linear-gradient(135deg, #0F172A 0%, #111827 50%, #0F172A 100%)",
        "blue-gradient": "linear-gradient(135deg, #1D4ED8 0%, #2563EB 50%, #3B82F6 100%)",
        "green-gradient": "linear-gradient(135deg, #16A34A 0%, #22C55E 50%, #4ADE80 100%)",
        "card-gradient": "linear-gradient(135deg, rgba(30,41,59,0.8) 0%, rgba(17,24,39,0.9) 100%)",
        "hero-gradient": "linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(17,24,39,0.85) 50%, rgba(15,23,42,0.95) 100%)",
        "glow-blue": "radial-gradient(circle at center, rgba(37,99,235,0.3) 0%, transparent 70%)",
        "glow-green": "radial-gradient(circle at center, rgba(34,197,94,0.2) 0%, transparent 70%)",
      },
      boxShadow: {
        "cyber-blue": "0 0 20px rgba(37,99,235,0.4), 0 0 60px rgba(37,99,235,0.1)",
        "cyber-green": "0 0 20px rgba(34,197,94,0.4), 0 0 60px rgba(34,197,94,0.1)",
        "cyber-red": "0 0 20px rgba(239,68,68,0.4)",
        "glass": "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
        "card": "0 4px 24px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.03)",
        "card-hover": "0 8px 40px rgba(37,99,235,0.2), 0 2px 0 rgba(37,99,235,0.1)",
      },
      animation: {
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "scan-line": "scanLine 3s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "blink": "blink 1s step-end infinite",
        "slide-up": "slideUp 0.3s ease-out",
        "fade-in": "fadeIn 0.4s ease-out",
        "count-up": "countUp 1s ease-out",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(37,99,235,0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(37,99,235,0.8), 0 0 80px rgba(37,99,235,0.3)" },
        },
        scanLine: {
          "0%": { top: "0%" },
          "100%": { top: "100%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        slideUp: {
          from: { transform: "translateY(20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        countUp: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
