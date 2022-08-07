import Image from "next/image"
import Description from "@components/Description"
import classNames from "@lib/classNames"
import TransitionPage from "@components/TransitionPage"
import BrowserFrame, { transition } from "@components/Experiments/BrowserFrame"

const title = "Experiments"
const description = "Playground to try out new ideas"
interface IMockWebsite {
  className?: string
}

function MockWebsite({ className }: IMockWebsite): JSX.Element {
  return (
    <div
      className={classNames(
        "absolute h-full w-full max-w-md  overflow-hidden rounded-lg border border-white/20 bg-black",
        className ?? ""
      )}
    >
      <div className="flex h-full flex-col items-center justify-center bg-gray-400/25 p-8 dark:bg-gray-500/25">
        <div className="h-3 w-16 rounded-full bg-white/25" />
        <div className="mt-4 h-3 w-32 rounded-full bg-white/10" />
        <div className="mt-12 flex flex-row flex-nowrap space-x-4">
          <div className="h-16 w-16 rounded-xl bg-white/10" />
          <div className="h-16 w-16 rounded-xl bg-white/10" />
          <div className="h-16 w-16 rounded-xl bg-white/10" />
        </div>
      </div>
    </div>
  )
}

export default function Experiments(): JSX.Element {
  return (
    <TransitionPage title={title} description={description}>
      <Description title={title} description={description} />
      <div className="flex flex-col space-y-8">
        {/* <BrowserFrame href="/experiments/time-machine" title="Time Machine" preview>
          <div
            className={classNames(
              "relative flex w-full items-center justify-center opacity-80 group-hover:opacity-80 sm:opacity-40",
              transition
            )}
          >
            <MockWebsite className="-top-4 scale-95" />
            <MockWebsite className="" />
          </div>
        </BrowserFrame> */}

        <BrowserFrame href="/experiments/github-contributions?search=pondorasti" title="Github Contributions" preview>
          <div
            className={classNames(
              "relative m-auto h-full w-full max-w-md grayscale-0 group-hover:grayscale-0 sm:grayscale",
              transition
            )}
          >
            <Image
              src="/images/experiments/github-contributions.svg"
              alt="github contributions graph"
              layout="fill"
              className="dark-img-invert"
            />
          </div>
        </BrowserFrame>
      </div>
    </TransitionPage>
  )
}
