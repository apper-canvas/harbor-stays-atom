/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1e3a5f",
        secondary: "#d4af37",
        accent: "#2563eb",
        surface: "#ffffff",
        background: "#f8fafc",
        success: "#059669",
        warning: "#d97706",
        error: "#dc2626",
        info: "#0284c7",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};