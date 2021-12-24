interface ISecret {
  name: string
  description: string
  month: string
  year?: number
  link: string
}

const secrets: ISecret[] = [
  {
    name: "microphone.wtf",
    description: "Experimental microphone audio visualizer",
    month: "Nov 2021",
    year: 2021,
    link: "https://microphone.wtf/",
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
  },
  {
    name: "the-rise-of-micro-computers",
    description: "Fun design challenge!",
    month: "Sep 2020",
    link: "https://alexandru.so/secrets/the-rise-of-micro-computers",
  },
  {
    name: "StonkScorer",
    description: "FTC Scorer - Skystone (iOS)",
    month: "Feb 2020",
    link: "https://github.com/Pondorasti/StonkScorer",
  },
  {
    name: "90s-portfolio",
    description: "Portfolio inspired by Raspberry Pi's CLI",
    month: "Sep 2020",
    link: "https://alexandru.so/secrets/90s-portfolio",
  },
  {
    name: "og-personal-website",
    description: "My first proper personal website",
    month: "Sep 2019",
    year: 2019,
    link: "https://alexandru.so/secrets/og-personal-website",
  },
  {
    name: "Envision",
    description: "My first proper personal website",
    month: "Jul 2019",
    link: "https://alexandru.so/secrets/og-personal-website",
  },
  {
    name: "national-day",
    description: "The first website I've ever created!",
    month: "Sep 2017",
    year: 2017,
    link: "https://alexandru.so/secrets/national-day",
  },
]

export default secrets
