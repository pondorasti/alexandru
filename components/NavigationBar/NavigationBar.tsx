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
    <header className="sticky top-0 z-30 px-body bg-blur mb-10">
      <div className="flex items-center justify-between py-5 border-b border-opacity-75 border-gray-200 h-navbar">
        <Link href="/">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="text-gray-900 text-md font-normal">
            <span className="mr-2">🤯</span>
            Alexandru
          </a>
        </Link>

        <div className="flex items-center space-x-3">
          <Link href="/experiments/github-contributions">
            <a className="navbar-link">Contributions</a>
          </Link>
          <Link href="/secrets">
            <a className="navbar-link">Secrets</a>
          </Link>
          {/* <a
            className="navbar-link"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/pondorasti/"
          >
            <span className="sr-only">GitHub account</span>
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z"></path>
            </svg>
          </a> */}

          <a className="navbar-link" target="_blank" rel="noopener noreferrer" href="https://twitter.com/Pondorasti/">
            <span className="sr-only">Twitter account</span>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z"></path>
            </svg>
          </a>

          <a className="navbar-link" target="_blank" rel="noopener noreferrer" href="https://github.com/pondorasti/">
            <span className="sr-only">GitHub account</span>
            <svg viewBox="0 0 16 16" fill="currentColor" width="18" height="18">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </a>

          <DynamicDarkModeSwitch
            className="navbar-link"
            checked={resolvedTheme === "dark"}
            onChange={handleDarkModeSwitch}
            size={20}
          />
        </div>
      </div>
    </header>
  )
}
