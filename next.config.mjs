import rehypeHighlight from "rehype-highlight"
import remarkFrontmatter from "remark-frontmatter"
import nextMDX from "@next/mdx"

const withMDX = nextMDX({
  options: {
    remarkPlugins: [remarkFrontmatter],
    rehypePlugins: [rehypeHighlight],
  },
})

export default withMDX({
  images: {
    domains: ["api.microlink.io"],
  },

  // Support MDX files as pages:
  pageExtensions: ["mdx", "tsx", "ts", "jsx", "js"],

  rewrites: async () => {
    return [
      {
        source: "/resume",
        destination: "/assets/resume.pdf",
      },
      {
        source: "/secrets/teamo-design",
        destination: "/secrets/teamo-design/index.html",
      },
      {
        source: "/secrets/github-contributions",
        destination: "/secrets/github-contributions/index.html",
      },
      {
        source: "/secrets/sushi",
        destination: "/secrets/sushi/index.html",
      },
      {
        source: "/secrets/amie",
        destination: "/secrets/amie/index.html",
      },
      {
        source: "/secrets/the-rise-of-micro-computers",
        destination: "/secrets/the-rise-of-micro-computers/index.html",
      },
      {
        source: "/secrets/90s-portfolio",
        destination: "/secrets/90s-portfolio/index.html",
      },
      {
        source: "/secrets/og-personal-website",
        destination: "/secrets/og-personal-website/index.html",
      },
      {
        source: "/secrets/og-personal-website/apps",
        destination: "/secrets/og-personal-website/apps/index.html",
      },
      {
        source: "/secrets/og-personal-website/awards",
        destination: "/secrets/og-personal-website/awards/index.html",
      },
      {
        source: "/secrets/og-personal-website/experience",
        destination: "/secrets/og-personal-website/experience/index.html",
      },
      {
        source: "/secrets/national-day",
        destination: "/secrets/national-day/index.html",
      },
    ]
  },
})
