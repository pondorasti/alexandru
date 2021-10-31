import Link from "next/link"
import dynamic from "next/dynamic"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { DarkModeSwitch } from "react-toggle-dark-mode"

// Source: https://github.com/vercel/next.js/issues/4515#issuecomment-810635574
const DynamicDarkModeSwitch = dynamic(
  () => {
    const promise = import("react-toggle-dark-mode").then((module) => module.DarkModeSwitch)
    return promise
  },
  { ssr: false, loading: () => <DarkModeSwitch checked={false} onChange={() => undefined} /> }
)

export default function NavigationBar(): JSX.Element {
  const [, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  // When mounted on client, show theme switcher
  useEffect(() => setMounted(true), [])

  function handleDarkModeSwitch() {
    if (resolvedTheme === "dark") {
      setTheme("light")
    } else if (resolvedTheme === "light") {
      setTheme("dark")
    }
  }

  return (
    <header className="sticky top-0 z-30 px-body bg-blur">
      <div className="flex items-center justify-between py-5 border-b border-opacity-75 border-gray-200 h-navbar bg-blur">
        <Link href="/">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="text-gray-900 text-md font-normal flex items-center">🤯 Alexandru Turcanu</a>
        </Link>

        <div className="flex items-center space-x-3">
          <DynamicDarkModeSwitch
            className="navbar-link"
            checked={resolvedTheme === "dark"}
            onChange={handleDarkModeSwitch}
            size={20}
          />

          <a className="navbar-link" target="_blank" rel="noopener noreferrer" href="https://github.com/pondorasti/">
            <span className="sr-only">GitHub account</span>
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  )
}
