interface ISecret {
  name: string
  description: string
  month: string
  year?: number
  link: string
  linkPreview?: string
}

const secrets: ISecret[] = [
  {
    name: "microphone.wtf",
    description: "Experimental microphone audio visualizer",
    month: "November",
    year: 2021,
    link: "https://microphone.wtf/",
    linkPreview: "/images/secrets/microphone.webp",
  },
  // {
  //   name: "fishcake.io",
  //   description: "Digital hawker food",
  //   month: "November",
  //   link: "https://www.fishcake.io/",
  // },
  {
    name: "makeschool.fail",
    description: "Conservatory of Make School before it shutdown",
    month: "July",
    link: "https://makeschool.fail/",
  },
  {
    name: "scriptcommands.com",
    description: "Unofficial Marketplace for Raycast Script Commands",
    month: "April",
    link: "https://scriptcommands.com/",
  },
  {
    name: "boringstocks.live",
    description: "Stocks for the average trader",
    month: "March",
    link: "https://boringstocks.live",
    linkPreview:
      "https://api.microlink.io?url=https%3A%2F%2Fboringstocks.live%2F&screenshot=true&meta=false&waitForTimeout=500&embed=screenshot.url",
  },
  {
    name: "teamo-design",
    description: "Design Assets of my first startup",
    month: "December",
    year: 2020,
    link: "https://alexandru.so/secrets/teamo-design",
    linkPreview: "/images/secrets/teamo-design.webp",
  },
  // {
  //   name: "sushi",
  //   description: "Just a Netflix meme...",
  //   month: "November",
  //   link: "https://alexandru.so/secrets/sushi",
  //   linkPreview: "/images/secrets/sushi.webp",
  // },
  // {
  //   name: "amie",
  //   description: "An amie.so clone to hone my skills",
  //   month: "October",
  //   link: "https://alexandru.so/secrets/amie",
  // },
  {
    name: "the-rise-of-micro-computers",
    description: "Fun design challenge!",
    month: "September",
    link: "https://alexandru.so/secrets/the-rise-of-micro-computers",
    linkPreview: "/images/secrets/the-rise-of-micro-computers.webp",
  },
  {
    name: "90s-portfolio",
    description: "Portfolio inspired by Raspberry Pi's CLI",
    month: "September",
    link: "https://alexandru.so/secrets/90s-portfolio",
    linkPreview: "/images/secrets/90s-portfolio.webp",
  },
  {
    name: "SimonDraws!",
    description: "Swift Student Challenge recipient of WWDC2020",
    month: "June",
    link: "https://github.com/Pondorasti/SimonDraws",
    linkPreview: "/images/secrets/SimonDraws.webp",
  },
  {
    name: "StonkScorer",
    description: "FTC Scorer - Skystone (iOS)",
    month: "February",
    link: "https://github.com/Pondorasti/StonkScorer",
    linkPreview: "/images/secrets/StonkScorer.webp",
  },
  {
    name: "og-personal-website",
    description: "My first proper personal website",
    month: "September",
    year: 2019,
    link: "https://alexandru.so/secrets/og-personal-website",
    linkPreview: "/images/secrets/og-personal-website.png",
  },
  {
    name: "Envision",
    description: "Habit Tracker (iOS)",
    month: "July",
    link: "https://www.producthunt.com/posts/envision-2",
  },
  {
    name: "Memoji",
    description: "Scholarship recipient of WWDC2018",
    month: "May",
    year: 2018,
    link: "https://github.com/Pondorasti/Memoji",
    linkPreview: "/images/secrets/memoji.webp",
  },
  {
    name: "national-day",
    description: "The first website I've ever created!",
    month: "September",
    year: 2017,
    link: "https://alexandru.so/secrets/national-day",
    linkPreview: "/images/secrets/national-day.png",
  },
]

export default secrets
