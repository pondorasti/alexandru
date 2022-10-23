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
      <div role="list" className="flex flex-row justify-center space-x-4">
        {books.map((book, index) => (
          <button
            role="listitem"
            key={book.title}
            onClick={() => {
              setFocusedIndex((focusedIndex + 1) % 2)
            }}
            className={clsx(
              "flex shrink-0 flex-row items-center overflow-hidden rounded-sm",
              // focusedIndex !== index && "hover:-translate-y-4",
              focusedIndex === index ? "basis-60" : "basis-12",
              animationStyle
            )}
            style={{ perspective: "1000px", WebkitPerspective: "1000px" }}
          >
            <div className="h-full w-[46px] border border-gray-900 bg-red-200 py-4 px-2">
              <h2 className="text-lg font-medium" style={{ writingMode: "vertical-lr" }}>
                {book.title}
              </h2>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={book.coverUrl}
              alt={book.title}
              className={clsx(
                "h-72 w-[193px] origin-left border border-l-0 border-gray-900 bg-blue-500 bg-cover",
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
            />
          </button>
        ))}
      </div>
    </TransitionPage>
  )
}
