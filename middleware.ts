import type { NextRequest, NextFetchEvent } from "next/server"
import { NextResponse, userAgent } from "next/server"

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - static (static files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|static|favicon.ico).*)",
  ],
}

export function middleware(req: NextRequest, event: NextFetchEvent) {
  const pathname = req.nextUrl.pathname
  const { isBot } = userAgent(req)

  const sendAnalytics = async () => {
    const slug = pathname.slice(pathname.indexOf("/")) || "/"

    const url = req.nextUrl.clone()
    url.pathname = "/api/view"

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      })

      if (res.status !== 200) console.error("Failed to send analytics", res)
    } catch (error) {
      console.error(error)
    }
  }

  // Don't wait for sendAnalytics() to finish before continuing the response.
  if (!isBot) event.waitUntil(sendAnalytics())

  return NextResponse.next()
}
