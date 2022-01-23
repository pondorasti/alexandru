import LinkPreview from "@components/LinkPreview"

export default function Footer(): JSX.Element {
  return (
    <footer className="body pb-px">
      <hr />
      <div className="my-16 text-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-light">
        Crafted with care by{" "}
        <span className="font-normal">
          <LinkPreview
            name="Alexandru"
            href="https://twitter.com/Pondorasti"
            preview="/images/twitter-preview.png"
            alt="Alexandru Turcanu's Twitter"
            style="neutral"
          />
        </span>
      </div>
    </footer>
  )
}
