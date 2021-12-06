import { useEffect } from "react"
import { AppProps } from "next/app"
import { useRouter } from "next/router"
import * as Fathom from "fathom-client"
import "tailwindcss/tailwind.css"
import { ThemeProvider } from "next-themes"
import NavigationBar from "@components/NavigationBar"

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  // Fathom
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
      <NavigationBar />
      <div className="px-body">
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  )
}
