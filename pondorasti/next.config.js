module.exports = {
  rewrites: async () => {
    return [
      {
        source: "/secret/:github-contributions",
        destination: "/secret/:github-contributions/index.html",
      }
    ]
}
}
