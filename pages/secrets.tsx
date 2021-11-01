import { InferGetStaticPropsType } from "next"
import notion from "@utils/notionClient"

export const getStaticProps = async () => {
  const database_id = "535325d661164beeac5e561977f25fca" // Secrets Database
  const response = await notion.databases.query({
    database_id,
    sorts: [
      {
        property: "Order",
        direction: "ascending",
      },
    ],
  })
  const secrets = response.results.reverse().map(({ properties }: any) => ({
    name: properties["Name"].title[0].plain_text,
    description: properties["Description"].rich_text[0].plain_text,
    creationDate: properties["Creation Date"].rich_text[0].plain_text,
    link: properties["Link"].url,
  }))

  return {
    props: {
      secrets: secrets,
    },
  }
}

export default function Secret({ secrets }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const headerStyling = "uppercase text-left text-xs font-semibold tracking-wider p-3 text-gray-500"
  const rowStyling = "p-3 text-gray-900 whitespace-nowrap"
  const linkStyling = "text-blue-600 hover:text-blue-700 hover:underline"

  return (
    <main>
      <h3 className="title1">Secrets</h3>
      <p className="subtitle">A collection of projects which I have worked on.</p>
      <div className="shadow-lg overflow-x-auto border border-gray-200 rounded-lg">
        <table className="table-auto w-full">
          <thead className="border-b border-gray-200">
            <tr>
              <th className={headerStyling}>Website</th>
              <th className={headerStyling}>Description</th>
              <th className={headerStyling}>Crafted In</th>
            </tr>
          </thead>
          <tbody>
            {secrets.map((website, index) => (
              <tr key={website.name} className={index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50"}>
                <td className={rowStyling}>
                  <a className={linkStyling} href={website.link} target="_blank" rel="noreferrer">
                    {website.name}
                  </a>
                </td>
                <td className={rowStyling}>{website.description}</td>
                <td className={rowStyling}>{website.creationDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
