import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Alexandru Turcanu</title>
        <meta name="description" content="This the personal website of Alexandru Turcanu, also known as Pondorasti." />
      </Head>

      <main>
        <div className="flex flex-col justify-center">
          {/* <img title="Alexandru Turcanu" alt="photo of me" src="images/faces/octocat.png" /> */}
          <h1 className="text-center text-6xl">Hey there.</h1>
          <h2 className="text-center"><strong>Democratizing</strong> computer aided design 🖲<br />One <strong>feature</strong> at a time</h2>
          {/* href="mailto:alexandru_turcanu@ymail.com" */}
          <button>
            Contact alexandru_turcanu@ymail.com
          </button>
        </div>
      </main>
    </div>
  )
}
