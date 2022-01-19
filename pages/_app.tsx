import { useEffect } from "react"
import { AppProps } from "next/app"
import { useRouter } from "next/router"
import * as Fathom from "fathom-client"
import Inspect from "inspx"
import "tailwindcss/tailwind.css"
import { ThemeProvider } from "next-themes"
import NavigationBar from "@components/NavigationBar"
import LinkPreview from "@components/LinkPreview"
import classNames from "@lib/classNames"
import TransitionPage from "@components/TransitionPage"

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  // Fathom Analytics
  // Source: https://vercel.com/guides/deploying-nextjs-using-fathom-analytics-with-vercel
  const router = useRouter()
  useEffect(() => {
    Fathom.load("LTCIFPOU", {
      url: "https://rook.alexandru.so/script.js",
      includedDomains: ["alexandru.so"],
    })

    function onRouteChangeComplete() {
      Fathom.trackPageview()
    }
    // Record a pageview when route changes
    router.events.on("routeChangeComplete", onRouteChangeComplete)

    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete)
    }
  }, [])

  const hideGradient = router.route.includes("journal")
  const hideFooter = router.route === "/"

  return (
    <ThemeProvider attribute="class" storageKey="app-theme" defaultTheme="system">
      <Inspect>
        <div className="max-w-screen-lg mx-auto">
          <span
            className={classNames(
              "rounded-full bg-gradient-to-r",
              "dark:from-rose-700 dark:via-pink-700 dark:to-purple-700 dark:opacity-60",
              "from-blue-300 via-cyan-300 to-green-300 opacity-70",
              "-z-50 w-full aspect-square max-w-screen-lg filter blur-3xl",
              "bottom-[calc(100%-200px)] dark:bottom-[calc(100%-180px)]",
              hideGradient ? "absolute" : "fixed"
            )}
          />
        </div>
        <NavigationBar />
        <TransitionPage>
          <main className="body">
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Component {...pageProps} />
          </main>
          <footer className={classNames("body", hideFooter ? "hidden" : "")}>
            <hr />
            <div className="my-16 text-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-light">
              Crafted with care by{" "}
              <span className="font-normal">
                <LinkPreview
                  name="Alexandru"
                  href="https://twitter.com/Pondorasti"
                  preview="/images/twitter-preview.png"
                  alt="Alexandru Turcanu's Twitter"
                  style="neutral"
                />
              </span>
            </div>
          </footer>
        </TransitionPage>
      </Inspect>
    </ThemeProvider>
  )
}
