import { useState, useEffect } from "react"
import { Transition } from "@headlessui/react"

interface ITransitionPage {
  children: JSX.Element
}

export default function TransitionPage({ children }: ITransitionPage): JSX.Element {
  const [displayChildren, setDisplayChildren] = useState(children)
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (children !== displayChildren) {
      setShow(false)
    }
  }, [children])

  return (
    <Transition
      show={show}
      // enter="transition duration-300"
      // enterFrom="opacity-0"
      // enterTo="opacity-100"
      leave="transition duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      afterLeave={() => {
        setDisplayChildren(children)
        setShow(true)
      }}
    >
      {displayChildren}
    </Transition>
  )
}
