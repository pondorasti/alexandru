const defaultTheme = require("tailwindcss/defaultTheme")
const plugin = require("tailwindcss/plugin")

module.exports = {
  mode: "jit",
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("nightwind"),
    require("@tailwindcss/line-clamp"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".h-navbar": {
          height: "69px",
        },
        ".top-navbar": {
          top: "69px",
        },
        ".navbar-link": {
          "@apply text-sm font-medium text-black opacity-70 hover:opacity-100": {},
        },
        ".bg-blur": {
          "@apply bg-opacity-50 bg-gray-50 dark:bg-opacity-50 backdrop-filter backdrop-blur": {},
        },
        ".px-body": {
          "@apply px-4 sm:px-6 xl:px-8": {},
        },
        kbd: {
          "@apply inline-flex items-center border border-gray-200 rounded px-2 text-sm font-sans font-medium text-gray-400":
            {},
        },
      })
    }),
  ],
}
