import { Transition } from "@headlessui/react"
import classNames from "@lib/classNames"

interface IDescription {
  title: string
  description: string
  hideBreak?: boolean
}

export default function Description({ title, description, hideBreak = false }: IDescription): JSX.Element {
  const transition = "transition-all duration-300"

  return (
    <>
      <Transition
        appear
        show
        enter={classNames(transition)}
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
      >
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-50 tracking-tight text-center mb-3">
          {title}
        </h1>
      </Transition>
      <Transition
        appear
        show
        enter={classNames(transition, "delay-[50ms]")}
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
      >
        <p className="text-base text-gray-600 dark:text-gray-400 text-center mb-10">{description}</p>
      </Transition>
      {!hideBreak && (
        <Transition
          appear
          show
          enter={classNames(transition, "delay-[200ms]")}
          enterFrom="scale-x-0"
          enterTo="scale-x-100"
        >
          <hr />
        </Transition>
      )}
    </>
  )
}
