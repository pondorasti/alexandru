import { GetStaticPropsContext } from "next"
import dynamic from "next/dynamic"
import { JournalLayout } from "@components/Journal"
import fs from "fs"

const entriesList = {
  "gmail-automatic-forwarder": dynamic(() => import("@data/journal/gmail-automatic-forwarder.mdx")),
  "rfid-hacking-101": dynamic(() => import("@data/journal/rfid-hacking-101.mdx")),
}

type Entries = typeof entriesList
type Slug = keyof Entries
interface IJournalEntry {
  slug: Slug
}

export default function JournalEntry({ slug }: IJournalEntry): JSX.Element {
  const Entry = entriesList[slug]
  return <Entry components={{ wrapper: ({ components, ...rest }) => <JournalLayout {...rest} /> }} />
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const slug = params?.slug as Slug
  return { props: { slug } }
}

export async function getStaticPaths() {
  const fileNames = fs.readdirSync("./data/journal")
  const paths = fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.mdx$/, ""),
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}
