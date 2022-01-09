import Link from "next/link"
import fs from "fs"
import * as matter from "gray-matter"
import Description from "@components/Description"
import { IMeta } from "@lib/types"

interface IJournal {
  slugs: string[]
  metas: IMeta[]
}

export default function Journal({ slugs, metas }: IJournal): JSX.Element {
  return (
    <main>
      <Description title="Journal" description="A collection of random thoughts" />
      {metas.map((meta, index) => (
        <Link key={slugs[index]} href={`journal/${slugs[index]}`} passHref>
          <a className="flex flex-col p-4 my-4 bg-gray-200 rounded-xl bg-opacity-0 hover:bg-opacity-100">
            <h2 className="text-xl font-semibold">{meta.title}</h2>
            <p className="mt-2 text-sm text-gray-400">{meta.description}</p>
          </a>
        </Link>
      ))}
    </main>
  )
}

export async function getStaticProps() {
  const fileNames = fs.readdirSync("./data/journal")
  const slugs = fileNames.map((fileName) => fileName.replace(/\.mdx$/, ""))
  const metas = await Promise.all(
    fileNames.map(async (fileName) => matter.read(`./data/journal/${fileName}`).data as IMeta)
  )

  return { props: { slugs, metas } }
}
