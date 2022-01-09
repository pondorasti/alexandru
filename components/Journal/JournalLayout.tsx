import Head from "next/head"

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <article className="prose prose-neutral dark:prose-invert">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/github-dark.min.css"
        />
      </Head>
      {children}
    </article>
  )
}
