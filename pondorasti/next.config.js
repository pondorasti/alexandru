module.exports = {
  rewrites: async () => {
    return [
      {
        source: "/secret/:github-contributions",
        destination: "/secret/:github-contributions/index.html",
      },
      {
        source: "/secret/:90s-portfolio",
        destination: "/secret/:90s-portfolio/index.html",
      }
    ]
}
}
