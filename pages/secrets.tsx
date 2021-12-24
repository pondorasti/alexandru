import { Fragment } from "react"
import Image from "next/image"
import * as Tooltip from "@radix-ui/react-tooltip"
import classNames from "@utils/classNames"
import secrets from "../data/secrets"

export default function Secret(): JSX.Element {
  const headerStyling = "uppercase text-left text-xs font-semibold tracking-wider p-3 text-gray-500 whitespace-nowrap"
  const rowStyling = "p-3 text-gray-900 whitespace-nowrap"
  const linkStyling = "text-blue-600 hover:text-blue-700 hover:underline"
  const legendStyling = "absolute h-12 w-16 -left-16 hidden md:flex justify-center items-center"

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
            </tr>
          </thead>
          <tbody>
            {secrets.map((website, index) => (
              <Fragment key={website.name}>
                <div className="absolute">
                  {website.year ? (
                    <div className={classNames(headerStyling, legendStyling, "text-center")}>{website.year}</div>
                  ) : (
                    <div className={legendStyling}>
                      <div className="h-full w-px bg-gray-200 bg-opacity-50" />
                    </div>
                  )}
                </div>
                <tr className={index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50"}>
                  <td className={rowStyling}>
                    <Tooltip.Root delayDuration={0}>
                      <Tooltip.Trigger asChild>
                        <a className={linkStyling} href={website.link} target="_blank" rel="noreferrer">
                          {website.name}
                        </a>
                      </Tooltip.Trigger>
                      <Tooltip.Content
                        side="top"
                        sideOffset={16}
                        className="radix-state-close:animate-slide-down radix-state-open:border-5 radix-side-top:animate-slide-up bg-white dark:bg-gray-800 p-2 h-40 w-64 rounded-lg border-gray-200"
                      >
                        <Image
                          src={`https://api.microlink.io?url=${website.link}&screenshot=true&meta=false&embed=screenshot.url`}
                          alt={website.name}
                          className="rounded-md"
                          width={240}
                          height={144}
                        />
                      </Tooltip.Content>
                    </Tooltip.Root>
                  </td>
                  <td className={rowStyling}>{website.description}</td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
