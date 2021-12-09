import { Client } from "@notionhq/client"

const notionToken = process.env.NEXT_PUBLIC_NOTION_TOKEN ?? ""

const notion = new Client({ auth: notionToken })

export default notion
