import { Transition } from "@headlessui/react"
import classNames from "@lib/classNames"
import { useEffect, useState } from "react"
import { titleStyle, descriptionStyle } from "./styles"
import type { IDescription } from "./types"
import Description from "./Description"

export default function AnimatedDescription({ title, description, hideBreak = false }: IDescription): JSX.Element {
  const transition = "transition-all duration-500"
  const [show, setShow] = useState(false)
  useEffect(() => {
    setShow(true)
  }, [])

  return (
    <div className="relative">
      <Transition show={show} as="div" className="absolute w-full">
        <Transition.Child
          enter={classNames(transition)}
          enterFrom="opacity-0 -translate-y-2"
          enterTo="opacity-100 translate-y-0"
        >
          <h1 className={titleStyle}>{title}</h1>
        </Transition.Child>
        <Transition.Child
          enter={classNames(transition, "delay-[300ms]")}
          enterFrom="opacity-0 -translate-y-2"
          enterTo="opacity-100 translate-y-0"
        >
          <p className={descriptionStyle}>{description}</p>
        </Transition.Child>
        {!hideBreak && (
          <Transition.Child enter={classNames(transition, "delay-[600ms]")} enterFrom="scale-x-0" enterTo="scale-x-100">
            <hr />
          </Transition.Child>
        )}
      </Transition>
      <div className="invisible">
        <Description title={title} description={description} />
      </div>
    </div>
  )
}
