import { NextApiRequest, NextApiResponse } from "next"
import supabase from "@lib/supabase/private"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Skip analytics tracking if on development
  if (process.env.NODE_ENV === "development") return res.status(200).end()

  if (req.method === "POST") {
    await supabase.rpc("increment_views", { page_slug: req.body.slug })
    return res.status(200).send("Success")
  } else {
    return res.status(400).send("Invalid request method")
  }
}
