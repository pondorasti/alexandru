import { Transition } from "@headlessui/react"
import classNames from "@lib/classNames"
import { titleStyle, descriptionStyle } from "./styles"
import type { IDescription } from "./types"

export default function Description({ title, description, hideBreak = false }: IDescription): JSX.Element {
  const transition = "transition-all duration-500"

  return (
    <>
      <Transition
        appear
        show
        enter={classNames(transition)}
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
      >
        <h1 className={titleStyle}>{title}</h1>
      </Transition>
      <Transition
        appear
        show
        enter={classNames(transition, "delay-[300ms]")}
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
      >
        <p className={descriptionStyle}>{description}</p>
      </Transition>
      {!hideBreak && (
        <Transition
          appear
          show
          enter={classNames(transition, "delay-[600ms]")}
          enterFrom="scale-x-0"
          enterTo="scale-x-100"
        >
          <hr />
        </Transition>
      )}
    </>
  )
}
