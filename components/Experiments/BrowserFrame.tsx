import classNames from "@lib/classNames"
import Link from "next/link"
import { MinusIcon, XIcon } from "@heroicons/react/solid"

const circleStyle = "h-3 w-3 rounded-full bg-gray-200 dark:bg-gray-700 opacity-0 xs:opacity-100 text-black flex"
const circleIconStyle = "m-auto h-2.5 w-2.5"
export const transition = "transition-all ease-out duration-300"

interface IBrowserFrame {
  children: React.ReactNode
  className?: string
  href: string
  title: string
  preview?: boolean
}

export default function BrowserFrame({ children, href, title, preview, className }: IBrowserFrame): JSX.Element {
  return (
    <Link href={href} passHref>
      <a
        className={classNames(
          "group flex w-full flex-col overflow-hidden rounded-lg border border-divider",
          preview ? "hover:scale-[1.03]" : "cursor-ne-resize",
          className ?? "",
          transition
        )}
      >
        <div
          className={classNames(
            "relative flex h-12 w-full flex-row items-center space-x-2 px-4",
            "bg-gray-100 text-gray-500 dark:bg-gray-800",
            "group-hover:text-gray-700 dark:group-hover:text-gray-300"
          )}
        >
          <div className={classNames(circleStyle, "group-hover:bg-systemRed", transition)}>
            {/* <XIcon className={circleIconStyle} /> */}
          </div>
          <div className={classNames(circleStyle, "group-hover:bg-systemYellow", transition)}>
            {/* <MinusIcon className={circleIconStyle} /> */}
          </div>
          <div className={classNames(circleStyle, "group-hover:bg-systemGreen", transition)} />

          <span className="flex-grow" />

          <div className="absolute left-0 !ml-0 w-full">
            <div
              className={classNames(
                "mx-auto w-[calc(100%-16px)] whitespace-nowrap rounded-md bg-gray-200 py-1 px-4 text-center text-sm dark:bg-gray-700 xs:w-72 sm:w-80",
                transition
              )}
            >
              {title}
            </div>
          </div>

          {preview && (
            <span
              className={classNames("opacity-0 xs:opacity-100", "translate-x-0 group-hover:translate-x-1", transition)}
            >
              →
            </span>
          )}
        </div>
        <div
          className={classNames(
            "flex h-60 bg-gray-50 glass dark:bg-gray-900 xs:h-80",
            preview ? "p-8" : "",
            transition
          )}
        >
          {children}
        </div>
      </a>
    </Link>
  )
}
