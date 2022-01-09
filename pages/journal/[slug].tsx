import { GetStaticPropsContext } from "next"
import dynamic from "next/dynamic"
import fs from "fs"
import * as matter from "gray-matter"
import { JournalLayout } from "@components/Journal"
import { IMeta } from "@lib/types"

const entriesList = {
  "gmail-automatic-forwarder": dynamic(() => import("@data/journal/gmail-automatic-forwarder.mdx")),
  "rfid-hacking-101": dynamic(() => import("@data/journal/rfid-hacking-101.mdx")),
}

type Entries = typeof entriesList
type Slug = keyof Entries
interface IJournalEntry {
  slug: Slug
  meta: IMeta
}

export default function JournalEntry({ slug, meta }: IJournalEntry): JSX.Element {
  const Entry = entriesList[slug]
  return <Entry components={{ wrapper: ({ components, ...rest }) => <JournalLayout {...rest} /> }} />
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const slug = params?.slug as Slug
  const meta = matter.read(`./data/journal/${slug}.mdx`).data as IMeta

  return { props: { slug, meta } }
}

export async function getStaticPaths() {
  const fileNames = fs.readdirSync("./data/journal")
  const paths = fileNames.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.mdx$/, ""),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}
