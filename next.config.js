module.exports = {
  rewrites: async () => {
    return [
      {
        source: "/secrets/teamo-design",
        destination: "/secrets/teamo-design/index.html",
      },
      {
        source: "/secrets/github-contributions",
        destination: "/secrets/github-contributions/index.html",
      },
      {
        source: "/secrets/amie",
        destination: "/secrets/amie/index.html",
      },
      {
        source: "/secrets/90s-portfolio",
        destination: "/secrets/90s-portfolio/index.html",
      },
      {
        source: "/",
        destination: "/secrets/og-personal-website/index.html",
      },
      {
        source: "/apps",
        destination: "/secrets/og-personal-website/apps/index.html",
      },
      {
        source: "/awards",
        destination: "/secrets/og-personal-website/awards/index.html",
      },
      {
        source: "/experience",
        destination: "/secrets/og-personal-website/experience/index.html",
      },
    ]
  },
}
