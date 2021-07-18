interface IWebsite {
  name: string;
  description: string;
  creationDate: string;
  link: string;
}

const secretWebsites: IWebsite[] = [
  { name: "90s-portfolio", description: "Inspired by Raspberry Pi's CLI", creationDate: "Sep 2020", link: "/secrets/90s-portfolio" },
  { name: "teamo-design", description: "Design Assets of my first startup", creationDate: "Dec 2020", link: "/secrets/teamo-design" },
  { name: "github-contributions", description: "Utility URL for showing Github stats on my always on display", creationDate: "Nov 2020", link: "/secrets/github-contributions" },
]

export default function Secret() {

  const headerStyling = "border-b-[3px] uppercase text-left text-xs font-medium tracking-wider py-1 px-3 text-gray-500 border-gray-500"
  const rowStyling = "p-3 text-gray-900"

  return (
    <main className="`pt-10">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className={headerStyling}>Website</th>
            <th className={headerStyling}>Description</th>
            <th className={headerStyling}>Crafted In</th>
          </tr>
        </thead>
        <tbody>
          {secretWebsites.map((website) => (
            <tr>
              <td className={rowStyling}>
                <a href={website.link} target="_blank">{website.name}</a>
              </td>
              <td className={rowStyling}>{website.description}</td>
              <td className={rowStyling}>{website.creationDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}