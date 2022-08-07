import Image from "next/image"
import Description from "@components/Description"
import classNames from "@lib/classNames"
import TransitionPage from "@components/TransitionPage"
import BrowserFrame, { transition } from "@components/Experiments/BrowserFrame"

const data = [
  { href: "https://alexandru.so", title: "Today" },
  { href: "https://alexandru.so", title: "Today" },
  { href: "https://alexandru.so", title: "Today" },
  { href: "https://alexandru.so", title: "Today" },
  { href: "https://alexandru.so", title: "Today" },
]

const title = "Time Machine"
const description = "Explore my website through progression of time"

export default function TimeMachine(): JSX.Element {
  return (
    <TransitionPage title={title} description={description}>
      <Description title={title} description={description} />
      <div className="relative mt-32 h-96">
        {data.map(({ href, title }, index) => (
          <div
            key={index}
            className="absolute w-full"
            style={{
              zIndex: 100 - index,
              // opacity: 1 - 0.1 * index,
              transform: `translateY(${-26 * index * (1 - 0.02 * index)}px) scaleY(${1 - 0.05 * index}) scaleX(${
                1 - 0.05 * index
              })`,
            }}
          >
            <BrowserFrame href={href} title={title}>
              <iframe src={href} className="w-full" />
            </BrowserFrame>
          </div>
        ))}
      </div>
    </TransitionPage>
  )
}
