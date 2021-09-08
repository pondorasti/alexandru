interface IWebsite {
  name: string;
  description: string;
  creationDate: string;
  link: string;
}

const secretWebsites: IWebsite[] = [
  { name: "makeschool.fail", description: "A conservatory of everything Make School related before it shutdown", creationDate: "Jul 2021", link: "https://makeschool.fail/" },
  { name: "scriptcommands.com", description: "Unofficial Marketplace for Raycast Script Commands", creationDate: "Mar 2021", link: "https://scriptcommands.com/" },
  { name: "teamo-design", description: "Design Assets of my first startup", creationDate: "Dec 2020", link: "/secrets/teamo-design" },
  { name: "github-contributions", description: "Utility URL for showing Github stats on my always on display", creationDate: "Nov 2020", link: "/secrets/github-contributions" },
  { name: "sushi", description: "Just a Netflix meme...", creationDate: "Nov 2020", link: "/secrets/sushi" },
  { name: "amie", description: "An amie.so clone to hone my skills", creationDate: "Oct 2020", link: "/secrets/amie" },
  { name: "the-rise-of-micro-computers", description: "Fun design challenge!", creationDate: "Sep 2020", link: "/secrets/the-rise-of-micro-computers" },
  { name: "90s-portfolio", description: "Portfolio inspired by Raspberry Pi's CLI", creationDate: "Sep 2020", link: "/secrets/90s-portfolio" },
  { name: "og-personal-website", description: "My first proper personal website", creationDate: "Sep 2019", link: "/" },
  { name: "national-day", description: "The first website I've ever created!", creationDate: "Sep 2017", link: "/secrets/national-day" },
]

export default function Secret() {
  const headerStyling = "uppercase text-left text-xs font-semibold tracking-wider p-3 text-gray-500"
  const rowStyling = "p-3 text-gray-900 whitespace-nowrap"
  const linkStyling = "text-blue-600 hover:text-blue-700 hover:underline"

  return (
    <main className="pt-10">
      <h3 className="text-2xl font-bold text-gray-900 tracking-tight sm:text-3xl mb-3">Secrets</h3>
      <p className="text-gray-500 mb-5">A collection of projects which I have worked on.</p>
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
            {secretWebsites.map((website, index) => (
              <tr key={website.name} className={index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50"}>
                <td className={rowStyling}>
                  <a className={linkStyling} href={website.link} target="_blank">{website.name}</a>
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