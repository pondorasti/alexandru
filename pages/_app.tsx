import { useEffect } from "react"
import { AppProps } from "next/app"
import { useRouter } from "next/router"
import * as Fathom from "fathom-client"
import "tailwindcss/tailwind.css"
import { ThemeProvider } from "next-themes"
import NavigationBar from "@components/NavigationBar"
import LinkPreview from "@components/LinkPreview"
import Inspect from "inspx"

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

  return (
    <ThemeProvider attribute="class" storageKey="app-theme" defaultTheme="system">
      <Inspect>
        <div className="max-w-screen-lg mx-auto">
          <span className="rounded-full bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 opacity-50 fixed -z-50 w-full aspect-square max-w-screen-lg -inset-y-[85%] md:-inset-y-[calc(1024px*0.80)] filter blur-3xl"></span>
        </div>
        <NavigationBar />
        <main className="body">
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...pageProps} />
        </main>
        <footer className="body">
          <hr />
          <div className="my-16 text-center text-gray-500 text-xs sm:text-sm font-light">
            Crafted with care by{" "}
            <span className="text-gray-600 hover:text-gray-700 font-normal">
              <LinkPreview
                name="Alexandru Turcanu"
                href="https://twitter.com/Pondorasti"
                preview="/images/twitter-preview.png"
                alt="Alexandru Turcanu's Twitter"
              />
            </span>
          </div>
        </footer>
      </Inspect>
    </ThemeProvider>
  )
}
