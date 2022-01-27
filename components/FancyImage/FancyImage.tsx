import NextImage from "next/image"
import { useTheme } from "next-themes"
import shimmer from "@lib/shimmer"

interface IFancyImage {
  src: string
  alt: string
  width: number
  height: number
  caption?: string
}

export default function FancyImage({ src, alt, width, height, caption }: IFancyImage): JSX.Element {
  const { resolvedTheme } = useTheme()

  return (
    <div className="flex flex-col items-center">
      <NextImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="mx-auto"
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${shimmer(240, 144, resolvedTheme)}`}
      />
      {caption && <p className="mt-1 mb-0 text-sm font-light text-gray-600 dark:text-gray-400">{caption}</p>}
    </div>
  )
}
