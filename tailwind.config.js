/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "rgba(148,163,184,0.15)",
        foreground: "#0f172a",
        muted: "#64748b",
        mutedForeground: "#94a3b8",
        card: "rgba(255,255,255,0.6)",
      },
    },
  },
  plugins: [],
};
