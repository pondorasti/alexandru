const defaultTheme = require("tailwindcss/defaultTheme")
const plugin = require("tailwindcss/plugin")
const colors = require("tailwindcss/colors")

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    nightwind: {
      typography: {
        color: "#c2c7ca",
        h1: {
          color: "#f4f4f6",
        },
        h2: {
          color: "#f4f4f6",
        },
        h3: {
          color: "#f4f4f6",
        },
        h4: {
          color: "#f4f4f6",
        },
        pre: {
          color: "gray.200",
          backgroundColor: "#18191a",
        },
        a: {
          color: "gray.400",
        },
        code: {
          color: "gray.400",
        },
        "a code": {
          color: "gray.400",
        },
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        gray: colors.slate,
      },
      keyframes: {
        "scale-in": {
          "0%": { opacity: 0, transform: "scale(0)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        "slide-down": {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "scale-in": "scale-in 0.2s ease-in-out",
        "slide-down": "slide-down 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-up": "slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("nightwind"),
    require("@tailwindcss/line-clamp"),
    require("nightwind"),
    require("tailwindcss-radix")(),
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
        ".title1": {
          "@apply text-2xl font-bold text-gray-900 tracking-tight sm:text-3xl mb-3": {},
        },
        ".subtitle": {
          "@apply text-gray-500 mb-5": {},
        },
        kbd: {
          "@apply inline-flex items-center border border-gray-200 rounded px-2 text-sm font-sans font-medium text-gray-400":
            {},
        },
      })
    }),
  ],
}
