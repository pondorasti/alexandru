import {
  createRootRouteWithContext,
  HeadContent,
  Link,
  Outlet,
  Scripts,
  useRouter
} from "@tanstack/react-router"
import { type QueryClient, useQueryErrorResetBoundary } from "@tanstack/react-query"
import { Button } from "@base-ui/react/button"
import { ArrowLeft, RotateCcw } from "lucide-react"
import { useEffect } from "react"
import { siteQuery } from "../read/queries"
import styles from "../styles.css?url"

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  beforeLoad: async ({ context }) => ({
    origin: (await context.queryClient.ensureQueryData(siteQuery)).origin
  }),
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Macro | Alexandru's nutrition" },
      { name: "description", content: "Alexandru's daily calories, protein, fiber and weight." },
      { name: "robots", content: "noindex" },
      { name: "theme-color", content: "#f2f2f2", media: "(prefers-color-scheme: light)" },
      { name: "theme-color", content: "#0e0e0e", media: "(prefers-color-scheme: dark)" }
    ],
    links: [
      { rel: "stylesheet", href: styles },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" }
    ]
  }),
  component: Root,
  notFoundComponent: NotFound,
  errorComponent: LoadError
})

function NotFound() {
  return (
    <main id="main" className="page-width py-24">
      <p className="mb-3 text-sm text-muted">404</p>
      <h1 className="display">Nothing logged here.</h1>
      <Link to="/" className="control mt-8">
        <ArrowLeft size={16} />
        Back to the dashboard
      </Link>
    </main>
  )
}

function LoadError() {
  const router = useRouter()
  const boundary = useQueryErrorResetBoundary()
  useEffect(() => {
    boundary.reset()
  }, [boundary])
  return (
    <main id="main" className="page-width py-24">
      <h1 className="display">The log is unavailable.</h1>
      <p className="mt-3 text-muted">Please try again in a moment.</p>
      <Button
        className="control mt-6"
        onClick={() => {
          void router.invalidate()
        }}
      >
        <RotateCcw size={16} />
        Try again
      </Button>
    </main>
  )
}

function Root() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-5 focus:left-5 focus:z-50 focus:rounded-full focus:bg-surface focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <header className="page-width flex h-[68px] items-center justify-between gap-4">
          <p className="text-sm font-medium tracking-wide">
            {/* Thin spaces keep the brackets close to the name; only the words are links. */}
            {"[\u2009"}
            <Link to="/" className="text-link">
              macro
            </Link>
            .
            <a
              href="https://alexandru.so"
              target="_blank"
              rel="noreferrer"
              className="text-muted text-link"
            >
              alexandru.so
            </a>
            {"\u2009]"}
          </p>
          {/* Pulled out by the button's padding so the mark lines up with the page edge. */}
          <a
            className="-mr-2 icon-control"
            aria-label="Source on GitHub"
            href="https://github.com/pondorasti/pondorasti/tree/main/apps/macro"
            target="_blank"
            rel="noreferrer"
          >
            <GitHubMark size={20} />
          </a>
        </header>
        <Outlet />
        <Scripts />
      </body>
    </html>
  )
}

/** GitHub's mark (Octicons `mark-github`, MIT); Lucide ships no brand icons. */
function GitHubMark({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
    </svg>
  )
}
