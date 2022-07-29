import { Transition } from "@headlessui/react"
import React from "react"

interface ITransitionPage {
  children: React.ReactNode
}

export default function TransitionPage({ children }: ITransitionPage): JSX.Element {
  return (
    <Transition
      appear
      show
      as="div"
      enter="transition duration-500 ease-in-out"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition duration-500 ease-in-out"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </Transition>
  )
}
