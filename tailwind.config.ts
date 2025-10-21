import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#059669" }, // emerald-600
        accent: { DEFAULT: "#f59e0b" },  // amber-500
      },
      borderRadius: {
        xl2: "1rem",
      }
    },
  },
  plugins: [],
} satisfies Config;

// sync: 2025-10-21
