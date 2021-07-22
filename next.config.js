module.exports = {
  rewrites: async () => {
    return [
      {
        source: "/secrets/:github-contributions",
        destination: "/secrets/:github-contributions/index.html",
      },
      {
        source: "/secrets/:90s-portfolio",
        destination: "/secrets/:90s-portfolio/index.html",
      },
      {
        source: "/secrets/:teamo-design",
        destination: "/secrets/:teamo-design/index.html",
      },
      {
        source: "/:journal",
        destination: "/secrets/:journal/index.html",
      },
    ]
  },
}
