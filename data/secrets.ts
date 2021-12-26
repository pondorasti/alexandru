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
    month: "Nov 2021",
    year: 2021,
    link: "https://microphone.wtf/",
    linkPreview: "/images/secrets/microphone.webp",
  },
  {
    name: "makeschool.fail",
    description: "Conservatory of Make School before it shutdown",
    month: "Jul 2021",
    link: "https://makeschool.fail/",
  },
  {
    name: "boringstocks.live",
    description: "Stocks for the average trader",
    month: "April 2021",
    link: "https://boringstocks.live",
  },
  {
    name: "scriptcommands.com",
    description: "Unofficial Marketplace for Raycast Script Commands",
    month: "Mar 2021",
    link: "https://scriptcommands.com/",
  },
  {
    name: "teamo-design",
    description: "Design Assets of my first startup",
    month: "Dec 2020",
    year: 2020,
    link: "https://alexandru.so/secrets/teamo-design",
  },
  {
    name: "sushi",
    description: "Just a Netflix meme...",
    month: "Nov 2020",
    link: "https://alexandru.so/secrets/sushi",
  },
  {
    name: "amie",
    description: "An amie.so clone to hone my skills",
    month: "Oct 2020",
    link: "https://alexandru.so/secrets/amie",
  },
  {
    name: "SimonDraws!",
    description: "Swift Student Challenge Submission for WWDC2020",
    month: "Jun 2020",
    link: "https://github.com/Pondorasti/SimonDraws",
    linkPreview: "/images/secrets/SimonDraws.webp",
  },
  {
    name: "the-rise-of-micro-computers",
    description: "Fun design challenge!",
    month: "Sep 2020",
    link: "https://alexandru.so/secrets/the-rise-of-micro-computers",
    linkPreview: "/images/secrets/the-rise-of-micro-computers.webp",
  },
  {
    name: "StonkScorer",
    description: "FTC Scorer - Skystone (iOS)",
    month: "Feb 2020",
    link: "https://github.com/Pondorasti/StonkScorer",
    linkPreview: "/images/secrets/StonkScorer.webp",
  },
  {
    name: "90s-portfolio",
    description: "Portfolio inspired by Raspberry Pi's CLI",
    month: "Sep 2020",
    link: "https://alexandru.so/secrets/90s-portfolio",
    linkPreview: "/images/secrets/90s-portfolio.webp",
  },
  {
    name: "og-personal-website",
    description: "My first proper personal website",
    month: "Sep 2019",
    year: 2019,
    link: "https://alexandru.so/secrets/og-personal-website",
    linkPreview: "/images/secrets/og-personal-website.png",
  },
  {
    name: "Envision",
    description: "Habit Tracker (iOS)",
    month: "Jul 2019",
    link: "https://www.producthunt.com/posts/envision-2",
  },
  {
    name: "national-day",
    description: "The first website I've ever created!",
    month: "Sep 2017",
    year: 2017,
    link: "https://alexandru.so/secrets/national-day",
    linkPreview: "/images/secrets/national-day.png",
  },
]

export default secrets
