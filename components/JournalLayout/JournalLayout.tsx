import Head from "next/head"

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <article className="prose prose-neutral dark:prose-invert prose-img:rounded-xl prose-pre:rounded-lg prose-a:no-underline prose-headings:font-medium prose-headings:font-['IBM_Plex_Sans'] prose-ul:my-5">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/github-dark.min.css"
        />
      </Head>

      {/* Book Binding */}
      <div className="fixed border-l-2 border-divider border-dotted h-full -ml-6 top-0" />

      {children}
    </article>
  )
}
