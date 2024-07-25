/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {},
  daisyui: {
    themes: ["light", "dark"],
  },
  plugins: [
    // require("@tailwindcss/forms"),
    // require("tailwindcss-animate"),
    // require("@tailwindcss/typography"),
    require("daisyui"),
  ],
};
