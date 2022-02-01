import Image from "next/image"
import * as Tooltip from "@radix-ui/react-tooltip"
import { useTheme } from "next-themes"
import classNames from "@lib/classNames"

interface ILinkPreview {
  name: string
  href: string
  preview?: string
  alt: string
  style?: "neutral" | "blue"
  showExternalIndicator?: boolean
}

// dark:text-gray-100 dark:hover:text-gray-50

const neutralHighlight = classNames(
  "text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-50",
  "after:bg-gray-700 after:hover:bg-gray-900 dark:after:bg-gray-200 dark:after:hover:bg-gray-50"
)
const blueHighlight = classNames(
  "text-blue-600 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-400",
  "after:bg-blue-600 after:hover:bg-blue-700 dark:after:bg-blue-300 dark:after:hover:bg-blue-400"
)

export default function LinkPreview({
  name,
  href,
  alt,
  preview,
  style = "blue",
  showExternalIndicator = true,
}: ILinkPreview) {
  const { resolvedTheme } = useTheme()

  const shimmer = (w: number, h: number, theme?: string) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <rect id="r" width="${w}" height="${h}" fill="${theme === "dark" ? "#171717" : "#e2e8f0"}" />
      <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
    </svg>`

  const toBase64 = (str: string) =>
    typeof window === "undefined" ? Buffer.from(str).toString("base64") : window.btoa(str)

  const sanitizedHref = href.replace(/:/g, "%3A").replace(/\//g, "%2F").replace(/#/g, "%23")

  return (
    <Tooltip.Root delayDuration={0}>
      <Tooltip.Trigger asChild>
        <a
          className={classNames(
            style === "neutral" ? neutralHighlight : blueHighlight,
            "relative whitespace-nowrap after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:rounded-full",
            "after:transition-[width] after:ease hover:after:ease-out after:duration-200"
          )}
          href={href}
          target="_blank"
          rel="noreferrer"
        >
          {name}
          {showExternalIndicator && " ↗"}
        </a>
      </Tooltip.Trigger>
      <Tooltip.Content
        side="top"
        sideOffset={16}
        className="border border-divider bg-white dark:bg-gray-900 p-2 h-40 w-64 rounded-lg animate-slide-in radix-state-closed:animate-slide-out"
      >
        <Image
          src={
            preview ||
            `https://alexandru.so/api/screenshot/${sanitizedHref}&colorScheme=${
              resolvedTheme === "dark" ? "dark" : "light"
            }`
          }
          alt={alt}
          className="rounded-md overflow-hidden p-2"
          width={240}
          height={144}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(240, 144, resolvedTheme))}`}
          objectFit="cover"
        />
      </Tooltip.Content>
    </Tooltip.Root>
  )
}
