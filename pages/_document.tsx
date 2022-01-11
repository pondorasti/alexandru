import NextDocument, { Html, Head, Main, NextScript } from "next/document"

export default class Document extends NextDocument {
  render(): JSX.Element {
    return (
      <Html lang="en" className="nightwind">
        <Head>
          {/* Favicon */}
          <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
          <link rel="manifest" href="/favicons/site.webmanifest" />
          <link rel="shortcut icon" href="/favicons/favicon.ico" />

          {/* Inter Font */}
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />

          <meta
            name="description"
            content="This the personal website of Alexandru Turcanu, also known as Pondorasti."
          />
        </Head>
        <body className="bg-gray-50 dark:bg-gray-900 selection:bg-fuchsia-600 selection:text-fuchsia-50">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
