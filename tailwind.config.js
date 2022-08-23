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
