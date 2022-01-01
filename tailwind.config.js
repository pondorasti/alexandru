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
        "slide-in": {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "slide-out": {
          "0%": { opacity: 1, transform: "translateY(0px)" },
          "100%": { opacity: 0, transform: "translateY(10px)" },
        },
      },
      animation: {
        "slide-in": "slide-in 0.2s ease-out",
        "slide-out": "slide-out 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("nightwind"),
    require("@tailwindcss/line-clamp"),
    require("tailwindcss-radix")(),
    plugin(function ({ addUtilities, addComponents }) {
      addUtilities({
        ".bg-blur": {
          "@apply bg-opacity-50 bg-gray-50 dark:bg-opacity-50 backdrop-filter backdrop-blur": {},
        },
        ".px-body": {
          "@apply px-4 sm:px-6": {},
        },
        // TODO: make component
        ".title1": {
          "@apply text-2xl font-bold text-gray-900 tracking-tight sm:text-3xl mb-3": {},
        },
        ".subtitle": {
          "@apply text-gray-500 mb-5": {},
        },
      }),
        addComponents({
          ".divider-y": {
            "@apply h-full w-px bg-gray-200 bg-opacity-50": {},
          },
          ".divider-x": {
            "@apply h-px w-full bg-gray-200 bg-opacity-50": {},
          },
        })
    }),
  ],
}
