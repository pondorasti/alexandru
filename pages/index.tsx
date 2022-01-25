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
          <span className="inline-block relative group overflow-hidden top-[6px] cursor-text">
            <span className="invisible">best in class apps</span>
            <span
              className={classNames(
                redGradient,
                "absolute top-0 left-0 group-hover:-translate-y-full",
                "transition-transform ease-in-out duration-500 hover:duration-300"
              )}
            >
              best in class apps
            </span>
            <span
              className={classNames(
                redGradient,
                "absolute top-0 left-0 translate-y-full group-hover:translate-y-0",
                "transition-transform ease-in-out duration-500 hover:duration-300"
              )}
            >
              best in class apps
            </span>
          </span>
          , obsessed with designing{" "}
          <span
            className={classNames(
              "bg-gradient-to-r from-green-500 to-blue-600 dark:from-blue-400 dark:via-cyan-400 dark:to-green-500 text-transparent bg-clip-text",
              "after:bg-gradient-to-r",
              "relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-[113px]",
              "after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100",
              "after:transition-transform after:ease-in-out after:duration-300"
            )}
          >
            fluid interfaces
          </span>
          , and{" "}
          <span className="relative group">
            <span
              className={classNames(
                "absolute -inset-0",
                "bg-gradient-to-r from-blue-500 to-purple-400",
                "rounded-lg blur group-hover:blur-md opacity-20 group-hover:opacity-40",
                "transition-all ease-in-out duration-300 animate-tilt"
              )}
            ></span>
            <span className="relative bg-gradient-to-r from-blue-500 to-purple-400 text-transparent bg-clip-text">
              perfectionist
            </span>
          </span>{" "}
          at heart.
        </p>
        <p className="text-gray-600 dark:text-gray-400 mt-4">
          Currently working at{" "}
          <a
            className={classNames(
              "animate-text-shimmer bg-[linear-gradient(110deg,#0F0F0F,45%,#f5f5f5,55%,#0F0F0F)] dark:bg-[linear-gradient(110deg,#fafafa,45%,#171717,55%,#fafafa)] bg-[length:250%_100%]",
              "bg-clip-text text-transparent cursor-ne-resize inline-block",
              "hover:scale-105 transition-transform ease-in-out duration-200"
            )}
            href="mailto:alexandru_turcanu@ymail.com"
          >
            [HIRE ME]
          </a>
        </p>
      </Transition>
    </>
  )
}
