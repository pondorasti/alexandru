import Link from "next/link"
import Image from "next/image"
import Description from "@components/Description"
import classNames from "@lib/classNames"
import TransitionPage from "@components/TransitionPage"

export default function Experiments(): JSX.Element {
  const circleStyle = "h-3 w-3 rounded-full bg-gray-200 dark:bg-gray-700 opacity-0 xs:opacity-100"
  const transition = "transition-all ease-out duration-300"

  return (
    <TransitionPage>
      <Description title="Experiments" description="Playground to try out new ideas" />
      <div>
        <Link href="/experiments/github-contributions?search=pondorasti" passHref>
          <a
            className={classNames(
              "group flex w-full flex-col overflow-hidden rounded-lg border border-divider hover:scale-[1.03]",
              transition
            )}
          >
            <div className="relative flex h-12 w-full flex-row items-center space-x-2 bg-gray-100 px-4 text-gray-500 group-hover:text-gray-700 dark:bg-gray-800 dark:group-hover:text-gray-300">
              <div className={classNames(circleStyle, "group-hover:bg-systemRed", transition)}></div>
              <div className={classNames(circleStyle, "group-hover:bg-systemYellow", transition)}></div>
              <div className={classNames(circleStyle, "group-hover:bg-systemGreen", transition)}></div>
              <span className="flex-grow" />
              <div className="absolute left-0 !ml-0 w-full">
                <div
                  className={classNames(
                    "mx-auto w-[calc(100%-16px)] whitespace-nowrap rounded-md bg-gray-200 py-1 px-4 text-center text-sm dark:bg-gray-700 xs:w-72 sm:w-80",
                    transition
                  )}
                >
                  Github Contributions
                </div>
              </div>
              <span
                className={classNames(
                  "opacity-0 xs:opacity-100",
                  "translate-x-0 group-hover:translate-x-1",
                  transition
                )}
              >
                →
              </span>
            </div>
            <div className={classNames("flex h-60 bg-gray-50 p-8 glass dark:bg-gray-900 xs:h-80", transition)}>
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
            </div>
          </a>
        </Link>
      </div>
    </TransitionPage>
  )
}
