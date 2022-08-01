import { Transition } from "@headlessui/react"
import React from "react"
import { NextSeo } from "next-seo"

interface ITransitionPage {
  children: React.ReactNode
}

export default function TransitionPage({ children }: ITransitionPage): JSX.Element {
  return (
    <>
      <NextSeo
        title="Simple Usage Example"
        description="A short description goes here."
        openGraph={{
          type: "website",
          locale: "en_IE",
          url: "https://alexandru.so/",
          site_name: "Alexandru Turcanu",
        }}
        twitter={{
          handle: "@handle",
          site: "@pondorasti",
          cardType: "summary_large_image",
        }}
      />
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
    </>
  )
}
