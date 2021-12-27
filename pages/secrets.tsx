import { Fragment } from "react"
import Image from "next/image"
import LinkPreview from "@components/LinkPreview"
import * as Tooltip from "@radix-ui/react-tooltip"
import classNames from "@utils/classNames"
import secrets from "../data/secrets"

export default function Secret(): JSX.Element {
  const headerStyling = "uppercase text-left text-xs font-semibold tracking-wider text-gray-500 whitespace-nowrap"
  const rowStyling = "p-3 text-gray-900 whitespace-nowrap"
  const linkStyling = "text-blue-600 hover:text-blue-700"
  const dividerStyling = "h-full w-px bg-gray-200 bg-opacity-50"

  return (
    <main>
      <h3 className="title1">Secrets</h3>
      <p className="subtitle">A collection of projects which I have worked on.</p>
      <div className="shadow-lg overflow-x-auto overflow-y-hidden border border-gray-200 rounded-lg ml-12 md:ml-0">
        <table className="table-auto w-full">
          <thead className="border-b border-gray-200">
            <tr>
              <th className={classNames(headerStyling, "p-3")}>Website</th>
              <th className={classNames(headerStyling, "p-3")}>Description</th>
            </tr>
          </thead>
          <tbody>
            {secrets.map((website, index) => (
              <Fragment key={website.name}>
                <tr className="absolute">
                  <td className="absolute p-0 pr-3 h-12 w-11 -left-11 flex flex-col justify-center items-center">
                    <div className={classNames(dividerStyling, index === 0 ? "opacity-0" : "")} />
                    {website.year && <div className={classNames(headerStyling, "py-1")}>{website.year}</div>}
                    <div className={classNames(dividerStyling, index + 1 === secrets.length ? "opacity-0" : "")} />
                  </td>
                </tr>
                <tr className={index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50"}>
                  <td className={rowStyling}>
                    <LinkPreview name={website.name} href={website.href} preview={website.preview} alt={website.name} />
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
