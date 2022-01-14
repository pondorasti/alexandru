import Link from "next/link"
import Image from "next/image"
import TransitionPageContent from "@components/TransitionPageContent"
import Description from "@components/Description"
import classNames from "@lib/classNames"

export default function Experiments(): JSX.Element {
  const circleStyle = "h-3 w-3 rounded-full bg-gray-200 dark:bg-gray-700 opacity-0 xs:opacity-100"
  const transition = "transition-all ease-out duration-300"
  return (
    <>
      <Description title="Experiments" description="A playground to try out new ideas" />
      <TransitionPageContent>
        <Link href="/experiments/github-contributions?search=pondorasti" passHref>
          <a
            className={classNames(
              "flex flex-col w-full border border-divider rounded-lg overflow-hidden group hover:scale-[1.03]",
              transition
            )}
          >
            <div className="relative bg-gray-100 dark:bg-gray-800 h-12 px-4 w-full flex flex-row items-center space-x-2 text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300">
              <div className={classNames(circleStyle, "group-hover:bg-systemRed", transition)}></div>
              <div className={classNames(circleStyle, "group-hover:bg-systemYellow", transition)}></div>
              <div className={classNames(circleStyle, "group-hover:bg-systemGreen", transition)}></div>
              <span className="flex-grow" />
              <div className="absolute left-0 !ml-0 w-full">
                <div
                  className={classNames(
                    "bg-gray-200 dark:bg-gray-700 rounded-md mx-auto w-[calc(100%-16px)] xs:w-72 sm:w-80 py-1 px-4 text-sm text-center whitespace-nowrap",
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
            <div className={classNames("h-60 xs:h-80 p-8 flex bg-gray-50 dark:bg-gray-900 glass", transition)}>
              <div
                className={classNames(
                  "relative w-full h-full max-w-md m-auto grayscale-0 sm:grayscale group-hover:grayscale-0",
                  transition
                )}
              >
                <Image
                  src="/images/experiments/github-contributions.svg"
                  alt="github contributions graph"
                  layout="fill"
                />
              </div>
            </div>
          </a>
        </Link>
      </TransitionPageContent>
    </>
  )
}
