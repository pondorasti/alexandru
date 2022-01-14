import { Transition } from "@headlessui/react"

interface ITransitionPageContent {
  children: JSX.Element | JSX.Element[]
  className?: string
}

export default function TransitionPageContent({ children, className }: ITransitionPageContent): JSX.Element {
  return (
    <Transition
      appear
      show
      enter="transition-all duration-500 delay-[200ms]"
      enterFrom="opacity-0"
      enterTo="opacity-100"
    >
      <div className={className}>{children}</div>
    </Transition>
  )
}
