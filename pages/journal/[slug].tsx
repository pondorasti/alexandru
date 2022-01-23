import { GetStaticPropsContext } from "next"
import dynamic from "next/dynamic"
import fs from "fs"
import * as matter from "gray-matter"
import JournalLayout from "@components/JournalLayout"
import { IMeta } from "@lib/types"
import LinkPreview from "@components/LinkPreview"
import Description from "@components/Description"

const entriesList = {
  "dns-ad-blocker-with-pi-hole-and-docker": dynamic(
    () => import("@data/journal/dns-ad-blocker-with-pi-hole-and-docker.mdx")
  ),
  "dynamic-programming-for-dummies": dynamic(() => import("@data/journal/dynamic-programming-for-dummies.mdx")),
  "gmail-automatic-forwarder": dynamic(() => import("@data/journal/gmail-automatic-forwarder.mdx")),
  "rfid-hacking-101": dynamic(() => import("@data/journal/rfid-hacking-101.mdx")),
}

type Entries = typeof entriesList
type Slug = keyof Entries
interface IJournalEntry {
  slug: Slug
  meta: IMeta<Slug>
}

export default function JournalEntry({ meta }: IJournalEntry): JSX.Element {
  const Entry = entriesList[meta.slug]

  return (
    <>
      <Description title={meta.title} description={meta.description} />
      <Entry
        components={{
          wrapper: ({ ...rest }) => <JournalLayout {...rest} />,
          a: props => <LinkPreview name={props.children as string} href={props.href || ""} alt="" />,
        }}
      />
    </>
  )
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const slug = params?.slug as Slug
  const meta = matter.read(`./data/journal/${slug}.mdx`).data as IMeta<Slug>

  return { props: { meta } }
}

export async function getStaticPaths() {
  const fileNames = fs.readdirSync("./data/journal")
  const paths = await Promise.all(
    fileNames.map(fileName => {
      const meta = matter.read(`./data/journal/${fileName}`).data as IMeta<Slug>
      return {
        params: {
          slug: meta.slug,
        },
      }
    })
  )

  return {
    paths,
    fallback: false,
  }
}
