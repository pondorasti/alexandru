import Image from "next/image"
import * as Tooltip from "@radix-ui/react-tooltip"
import { useTheme } from "next-themes"
import classNames from "@lib/classNames"

interface ILinkPreview {
  name: string
  href: string
  preview?: string
  alt: string
}

export default function LinkPreview({ name, href, alt, preview }: ILinkPreview) {
  const { resolvedTheme } = useTheme()

  const shimmer = (w: number, h: number, theme?: string) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <rect id="r" width="${w}" height="${h}" fill="${theme === "dark" ? "#0f172a" : "#e2e8f0"}" />
      <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
    </svg>`

  const toBase64 = (str: string) =>
    typeof window === "undefined" ? Buffer.from(str).toString("base64") : window.btoa(str)

  return (
    <Tooltip.Root delayDuration={0}>
      <Tooltip.Trigger asChild>
        <a
          className={classNames(
            "text-blue-600 hover:text-blue-700",
            "relative after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-blue-700 after:rounded-full after:!transition-[width] after:!ease-out after:!duration-200"
          )}
          href={href}
          target="_blank"
          rel="noreferrer"
        >
          {name}
        </a>
      </Tooltip.Trigger>
      <Tooltip.Content
        side="top"
        sideOffset={16}
        className="border bg-white dark:bg-gray-800 p-2 h-40 w-64 rounded-lg border-gray-200 radix-side-top:animate-slide-in animate-slide-out"
      >
        <Image
          src={
            preview ||
            `https://api.microlink.io?url=${href}&screenshot=true&meta=false&colorScheme=${
              resolvedTheme === "dark" ? "dark" : "light"
            }&embed=screenshot.url`
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
