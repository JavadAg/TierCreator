/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter", "sans-serif"]
      },
      colors: {
        customgrey: {
          100: "#fafafa",
          200: "#eaeaea",
          220: "#c8c8c8",
          240: "#b4b4b4",
          300: "#999",
          400: "#888",
          500: "#666",
          600: "#444",
          700: "#333",
          800: "#111"
        }
      },
      boxShadow: {
        100: "0px 2px 4px rgba(0,0,0,.1)",
        200: "0px 4px 8px rgba(0,0,0,.12)",
        300: "0px 5px 10px rgba(0,0,0,.12)",
        400: "0px 8px 30px rgba(0,0,0,.12)",
        500: "0px 30px 60px rgba(0,0,0,.12)"
      }
    }
  },
  plugins: [require("tw-elements/dist/plugin")]
}
