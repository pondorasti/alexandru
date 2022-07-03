import Image from "next/image"
import * as Tooltip from "@radix-ui/react-tooltip"
import { useTheme } from "next-themes"
import classNames from "@lib/classNames"
import { preload } from "swr"
import { useEffect } from "react"

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

const fetcher = (url: string) => fetch(url).then(res => res.blob())

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

  const imageSrc =
    preview ||
    `/_next/image?url=api/screenshot?url=${sanitizedHref}&colorScheme=${resolvedTheme === "dark" ? "dark" : "light"}`
  useEffect(() => {
    console.log(imageSrc)
    preload(imageSrc, fetcher)
  }, [imageSrc])

  return (
    <Tooltip.Root delayDuration={0}>
      <Tooltip.Trigger asChild>
        <a
          className={classNames(
            style === "neutral" ? neutralHighlight : blueHighlight,
            "relative whitespace-nowrap after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:rounded-full hover:after:w-full",
            "after:ease after:transition-[width] after:duration-200 hover:after:ease-out"
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
        className="h-40 w-64 animate-slide-in rounded-lg border bg-white p-2 border-divider radix-state-closed:animate-slide-out dark:bg-gray-900"
      >
        <Image
          src={imageSrc}
          alt={alt}
          className="overflow-hidden rounded-md p-2"
          width={240}
          height={144}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(240, 144, resolvedTheme))}`}
          objectFit="cover"
          priority
          unoptimized={!!preview}
        />
      </Tooltip.Content>
    </Tooltip.Root>
  )
}
