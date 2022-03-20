import { Transition } from "@headlessui/react"
import { AnimatedDescription } from "@components/Description"
import classNames from "@lib/classNames"

export default function Home(): JSX.Element {
  const redGradient = "bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-transparent bg-clip-text"

  return (
    <>
      <AnimatedDescription title="Alexandru Ţurcanu" description="Full Stack Engineer" />
      <Transition
        appear
        show
        enter="transition-all duration-500 delay-[600ms]"
        enterFrom="scale-90 opacity-0"
        enterTo="scale-100 opacity-100"
      >
        <p className="text-gray-600 dark:text-gray-400">
          On a journey to create{" "}
          <span className="group relative top-[6px] inline-block cursor-text overflow-hidden">
            <span className="invisible">best in class apps</span>
            <span
              className={classNames(
                redGradient,
                "absolute top-0 left-0 group-hover:-translate-y-full",
                "transition-transform duration-500 ease-in-out hover:duration-300"
              )}
            >
              best in class apps
            </span>
            <span
              className={classNames(
                redGradient,
                "absolute top-0 left-0 translate-y-full group-hover:translate-y-0",
                "transition-transform duration-500 ease-in-out hover:duration-300"
              )}
            >
              best in class apps
            </span>
          </span>
          , obsessed with designing{" "}
          <span
            className={classNames(
              "bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-cyan-400 dark:to-green-500",
              "after:bg-gradient-to-r",
              "relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-[113px]",
              "after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100",
              "after:transition-transform after:duration-300 after:ease-in-out"
            )}
          >
            fluid interfaces
          </span>
          , and{" "}
          <span className="group relative">
            <span
              className={classNames(
                "absolute -inset-0",
                "bg-gradient-to-r from-blue-500 to-purple-400",
                "rounded-lg opacity-20 blur group-hover:opacity-40 group-hover:blur-md",
                "animate-tilt transition-all duration-300 ease-in-out"
              )}
            ></span>
            <span className="relative bg-gradient-to-r from-blue-500 to-purple-400 bg-clip-text text-transparent">
              perfectionist
            </span>
          </span>{" "}
          at heart.
        </p>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Currently working at{" "}
          <a
            className={classNames(
              "animate-text-shimmer bg-[linear-gradient(110deg,#F6A6A6,45%,#f5f5f5,55%,#F6A6A6)] bg-[length:250%_100%] dark:bg-[linear-gradient(110deg,#F6A6A6,45%,#171717,55%,#F6A6A6)]",
              "inline-block cursor-ne-resize bg-clip-text text-transparent",
              "transition-transform duration-200 ease-in-out hover:scale-105"
            )}
            href="mailto:alexandru_turcanu@ymail.com"
          >
            Amie
          </a>
        </p>
      </Transition>
    </>
  )
}
