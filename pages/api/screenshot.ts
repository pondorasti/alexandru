import type { NextApiRequest, NextApiResponse } from "next"
import chrome from "chrome-aws-lambda"

interface IQuery {
  url?: string
  colorScheme?: "light" | "dark"
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { url, colorScheme } = req.query as IQuery

  if (url) {
    const browser = await chrome.puppeteer.launch({
      executablePath: await chrome.executablePath,
      args: chrome.args,
      headless: chrome.headless,
    })

    const page = await browser.newPage()

    const viewportOptions = {
      width: 1280,
      height: 800,
      deviceScaleFactor: 2,
    }

    await page.setViewport(viewportOptions)
    await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: colorScheme || "light" }])
    await page.goto(url, { waitUntil: "networkidle2" })

    const imageBuffer = await page.screenshot({ type: "webp" })

    await browser.close()
    res.setHeader("Content-Type", "image/webp")
    res.status(200).end(imageBuffer)
  } else {
    res.status(404)
  }
}
