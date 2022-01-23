const defaultTheme = require("tailwindcss/defaultTheme")
const plugin = require("tailwindcss/plugin")
const colors = require("tailwindcss/colors")

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.mdx",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        systemRed: "#ff5f57",
        systemYellow: "#febb2e",
        systemGreen: "#5FC454",
        gray: {
          ...colors.neutral,

          // 400: "#737373",
          // 500: "#525252",
          // 600: "#404040",
          700: "#262626",
          // 700: "#191919",
          800: "#171717",
          900: "#0F0F0F",
        },
      },
      opacity: {
        15: ".15",
      },
      keyframes: {
        "slide-in": {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "slide-out": {
          "0%": { opacity: 1, transform: "translateY(0px)" },
          "100%": { opacity: 0, transform: "translateY(16px)" },
        },
      },
      animation: {
        "slide-in": "slide-in 0.2s ease-out",
        "slide-out": "slide-out 0.2s ease",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("tailwindcss-radix")(),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".bg-blur": {
          "@apply bg-gray-50 bg-opacity-20 dark:bg-gray-900 dark:bg-opacity-20 backdrop-blur": {},
        },
        ".body": {
          "@apply max-w-screen-sm mx-4 sm:mx-auto": {},
        },
        ".border-divider": {
          "@apply border-black border-opacity-10 dark:border-white dark:border-opacity-10": {},
        },
        ".highlight": {
          "@apply bg-black bg-opacity-[0.03] dark:bg-white dark:bg-opacity-[0.05]": {},
        },
        ".glass": {
          "@apply !bg-opacity-60 dark:!bg-opacity-60": {},
        },
      })
    }),
    plugin(function ({ addComponents }) {
      addComponents({
        ".divider-y": {
          "@apply h-full w-px bg-black bg-opacity-10 dark:bg-white dark:bg-opacity-10": {},
        },
        ".divider-x": {
          "@apply h-px w-full bg-black bg-opacity-10 dark:bg-white dark:bg-opacity-10": {},
        },
      })
    }),
    plugin(function ({ addBase }) {
      addBase({
        hr: {
          "@apply my-16 mx-auto w-20 border-divider": {},
        },
      })
    }),
  ],
}
