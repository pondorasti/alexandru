interface IProject {
  name: string
  description: string
  month: string
  year?: number
  href: string
  preview?: string
}

const secrets: IProject[] = [
  {
    name: "Manual Pages",
    description: "Dynamically generated docs for 450+ CLIs",
    month: "February",
    year: 2022,
    href: "https://fig.io/manual",
    preview: "/images/secrets/man-pages.png",
  },
  {
    name: "tailwindcss-snippets",
    description: "Collection of animation snippets made for TailwindCSS",
    month: "January",
    href: "https://snippets.alexandru.so/",
    preview: "/images/secrets/tailwindcss-snippets.png",
  },
  {
    name: "microphone.wtf",
    description: "Experimental microphone audio visualizer",
    month: "November",
    year: 2021,
    href: "https://microphone.wtf/",
    preview: "/images/secrets/microphone.webp",
  },
  // {
  //   name: "fishcake.io",
  //   description: "Digital hawker food",
  //   month: "November",
  //   href: "https://www.fishcake.io/",
  // },
  {
    name: "makeschool.fail",
    description: "Conservatory of Make School before it shutdown",
    month: "July",
    href: "https://makeschool.fail/",
  },
  {
    name: "scriptcommands.com",
    description: "Unofficial Marketplace for Raycast Script Commands",
    month: "April",
    href: "https://scriptcommands.com/",
  },
  {
    name: "boringstocks.live",
    description: "Stocks for the average trader",
    month: "March",
    href: "https://boringstocks.live",
    preview:
      "https://api.microlink.io?url=https%3A%2F%2Fboringstocks.live%2F&screenshot=true&meta=false&waitForTimeout=500&embed=screenshot.url",
  },
  // {
  //   name: "teamo",
  //   description: "Initial prototype of my first startup",
  //   month: "December",
  //   href: "https://alexandru.so/secrets/teamo",
  //   preview: "/images/secrets/teamo-design.webp",
  // },
  {
    name: "teamo-design",
    description: "Design Assets of my first startup",
    month: "December",
    year: 2020,
    href: "https://alexandru.so/secrets/teamo-design",
    preview: "/images/secrets/teamo-design.png",
  },
  // {
  //   name: "sushi",
  //   description: "Just a Netflix meme...",
  //   month: "November",
  //   href: "https://alexandru.so/secrets/sushi",
  //   preview: "/images/secrets/sushi.webp",
  // },
  // {
  //   name: "amie",
  //   description: "An amie.so clone to hone my skills",
  //   month: "October",
  //   href: "https://alexandru.so/secrets/amie",
  // },
  {
    name: "the-rise-of-micro-computers",
    description: "Fun design challenge!",
    month: "September",
    href: "https://alexandru.so/secrets/the-rise-of-micro-computers",
    preview: "/images/secrets/the-rise-of-micro-computers.png",
  },
  {
    name: "90s-portfolio",
    description: "Portfolio inspired by Raspberry Pi's CLI",
    month: "September",
    href: "https://alexandru.so/secrets/90s-portfolio",
    preview: "/images/secrets/90s-portfolio.png",
  },
  {
    name: "SimonDraws!",
    description: "Swift Student Challenge recipient of WWDC2020",
    month: "June",
    href: "https://github.com/Pondorasti/SimonDraws",
    preview: "/images/secrets/SimonDraws.webp",
  },
  {
    name: "StonkScorer",
    description: "FTC Scorer - Skystone (iOS)",
    month: "February",
    href: "https://github.com/Pondorasti/StonkScorer",
    preview: "/images/secrets/StonkScorer.webp",
  },
  {
    name: "og-personal-website",
    description: "My first proper personal website",
    month: "September",
    year: 2019,
    href: "https://alexandru.so/secrets/og-personal-website",
    preview: "/images/secrets/og-personal-website.png",
  },
  {
    name: "Envision",
    description: "Habit Tracker (iOS)",
    month: "July",
    href: "https://www.producthunt.com/posts/envision-2",
  },
  {
    name: "Memoji",
    description: "Scholarship recipient of WWDC2018",
    month: "May",
    year: 2018,
    href: "https://github.com/Pondorasti/Memoji",
    preview: "/images/secrets/memoji.webp",
  },
  {
    name: "national-day",
    description: "The first website I've ever created!",
    month: "September",
    year: 2017,
    href: "https://alexandru.so/secrets/national-day",
    preview: "/images/secrets/national-day.png",
  },
]

export default secrets
