import { useState, useEffect } from "react"
import { Transition } from "@headlessui/react"
import { useRouter } from "next/router"

interface ITransitionPage {
  children: React.ReactNode
}

export default function TransitionPage({ children }: ITransitionPage): JSX.Element {
  const [displayChildren, setDisplayChildren] = useState(children)
  const [displayRoute, setDisplayRoute] = useState("")
  const [show, setShow] = useState(true)
  const [animateEnter, setAnimateEnter] = useState(true)
  const router = useRouter()

  const transition = "transition duration-300"

  useEffect(() => {
    if (router.route !== displayRoute) {
      setShow(false)
      setAnimateEnter(router.route !== "/")
    }
  }, [children])

  console.log(animateEnter)

  return (
    // <Transition
    //   show={show}
    //   enter={animateEnter ? transition : transition}
    //   enterFrom="opacity-0"
    //   enterTo="opacity-100"
    //   leave={transition}
    //   leaveFrom="opacity-100"
    //   leaveTo="opacity-0"
    //   afterLeave={() => {
    //     setDisplayChildren(children)
    //     setDisplayRoute(router.route)
    //     setShow(true)
    //   }}
    // >
    <div>{children}</div>
    // </Transition>
  )
}
