import Description from "@components/Description"
import TransitionPage from "@components/TransitionPage"
import clsx from "clsx"
import { useState } from "react"

const title = "Book Gallery"
const description = "A digital bookshelf"

interface IBook {
  title: string
  coverUrl: string
}

const books: IBook[] = [
  { title: "1984", coverUrl: "/images/experiments/book-gallery/1984.jpeg" },
  { title: "Steve Jobs", coverUrl: "/images/experiments/book-gallery/steve-jobs.jpeg" },
  {
    title: "Hitcher's guide to the galaxy",
    coverUrl: "/images/experiments/book-gallery/hitchhikers-guide-to-the-galaxy.webp",
  },
  { title: "1984", coverUrl: "/images/experiments/book-gallery/1984.jpeg" },
  { title: "Steve Jobs", coverUrl: "/images/experiments/book-gallery/steve-jobs.jpeg" },
  {
    title: "Hitcher's guide to the galaxy",
    coverUrl: "/images/experiments/book-gallery/hitchhikers-guide-to-the-galaxy.webp",
  },
  { title: "1984", coverUrl: "/images/experiments/book-gallery/1984.jpeg" },
]

const animationStyle = "transition-all duration-500 ease will-change-auto"

export default function TimeMachine(): JSX.Element {
  const [focusedIndex, setFocusedIndex] = useState(0)

  return (
    <TransitionPage title={title} description={description}>
      <Description title={title} description={description} />
      <svg className="invisible absolute inset-0">
        <defs>
          <filter id="paper" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="8" result="noise" />
            <feDiffuseLighting in="noise" lighting-color="white" surfaceScale="1" result="diffLight">
              <feDistantLight azimuth="45" elevation="35" />
            </feDiffuseLighting>
          </filter>
        </defs>
      </svg>
      <div role="list" className="flex flex-row justify-center space-x-4">
        {books.map((book, index) => (
          <button
            role="listitem"
            key={book.title}
            onClick={() => {
              if (index === focusedIndex) {
                setFocusedIndex(-1)
              } else {
                setFocusedIndex(index)
              }
            }}
            className={clsx(
              "flex shrink-0 flex-row items-center",
              focusedIndex !== index && "hover:-translate-y-4 focus:-translate-y-4",
              focusedIndex === index ? "basis-60" : "basis-12",
              animationStyle
            )}
            style={{ perspective: "1000px", WebkitPerspective: "1000px" }}
          >
            <div className={clsx("z-50 h-full w-[46px] shrink-0 border border-gray-900 bg-white py-4 px-2")}>
              <h2 className="text-lg font-medium" style={{ writingMode: "vertical-lr" }}>
                {book.title}
              </h2>
            </div>
            <div
              className={clsx(
                "relative z-10 h-72 shrink-0 origin-left overflow-hidden border border-l-0 border-gray-900 brightness-[0.80] contrast-[2.00]",
                animationStyle
              )}
              style={{
                transformStyle: "preserve-3d",
                transform: `translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(${
                  focusedIndex === index ? "0deg" : "90deg"
                }) rotateZ(0deg) skew(0deg, 0deg)`,
                WebkitTransformStyle: "preserve-3d",
                WebkitTransform: `translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(${
                  focusedIndex === index ? "0deg" : "90deg"
                }) rotateZ(0deg) skew(0deg, 0deg)`,
              }}
            >
              <span
                aria-hidden
                className="pointer-events-none fixed top-0 right-0 z-50 h-full w-full opacity-40 [filter:url(#paper)]"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={book.coverUrl} alt={book.title} className={clsx("h-full w-48 bg-cover", animationStyle)} />
            </div>
          </button>
        ))}
      </div>
    </TransitionPage>
  )
}
