import type { NextApiRequest, NextApiResponse } from "next"
import captureWebsite from "capture-website"

interface IQuery {
  url?: string
  darkMode?: boolean
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { url, darkMode } = req.query as IQuery

  if (url) {
    console.log(url, darkMode)
    const screenshot = await captureWebsite.base64(url, {
      darkMode: darkMode || false,
      type: "webp",
    })

    const imageBuffer = Buffer.from(screenshot, "base64")

    res.setHeader("Content-Type", "image/webp")
    res.status(200).end(imageBuffer)
  } else {
    res.status(502)
  }
}
