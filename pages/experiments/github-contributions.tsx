import { useState, useEffect, RefObject, createRef, useRef, Fragment } from "react"
import * as d3 from "d3"
import { useTheme } from "next-themes"
import { SearchIcon } from "@heroicons/react/solid"
import classNames from "@utils/classNames"

const api = "https://api.github.com/graphql"
const ghToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN ?? ""
const ghHeaders = { Authorization: `bearer ${ghToken}` }

interface IContributionWeek {
  color: string
  contributionCount: number
  contributionLevel: "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE"
  date: string
}
interface IContributionsCollection {
  data: {
    user: {
      contributionsCollection: {
        year?: number
        contributionYears: number[]
        contributionCalendar: {
          totalContributions: number
          weeks: {
            contributionDays: IContributionWeek[]
          }[]
        }
      }
    }
  }
}

interface IUserInsights {
  longestStreak: number
  currentStreak: number
  totalContributions: number
  firstContributionDate: string
}
interface IUserInformation {
  collections: IContributionsCollection[]
  insights: IUserInsights
}

function normalizeUtc(date: Date): Date {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
}

function formatDate(date: Date): string {
  const getOrdinalNum = (n: number) =>
    n + (n > 0 ? ["th", "st", "nd", "rd"][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : "")

  const day = getOrdinalNum(date.getDate())
  const month = date.toLocaleDateString("en-us", { month: "long" })
  const year = date.toLocaleDateString("en-us", { year: "numeric" })

  return `${month} ${day} ${year}`
}

async function fetchYearlyContributions(username: string, year: number): Promise<IContributionsCollection> {
  const body = {
    query: `query {
        user(login: "${username}") {
          contributionsCollection(from: "${year}-01-01T00:00:00.000Z", to: "${year}-12-31T00:00:00.000Z") {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  color
                  contributionCount
                  contributionLevel
                  date
                }
              }
            }
          }
        }
      }`,
  }
  const response = await fetch(api, {
    method: "POST",
    body: JSON.stringify(body),
    headers: ghHeaders,
  })
  const data = (await response.json()) as IContributionsCollection
  data.data.user.contributionsCollection.year = year

  return data
}

async function fetchAllContributions(username: string): Promise<IUserInformation> {
  const body = {
    query: `query {
        user(login: "${username}") {
          contributionsCollection {
            contributionYears
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  color
                  contributionCount
                  contributionLevel
                  date
                }
              }
            }
          }
        }
      }`,
  }
  const response = await fetch(api, {
    method: "POST",
    body: JSON.stringify(body),
    headers: ghHeaders,
  })
  const collections: IContributionsCollection[] = []
  const currentCollection = (await response.json()) as IContributionsCollection
  collections.push(currentCollection)

  if (currentCollection.data.user === null) {
    throw new Error("User not found.")
  }

  const years = currentCollection.data.user.contributionsCollection.contributionYears

  let longestStreak = 0
  let currentStreak = -1
  let potentialStreak = 0
  let totalContributions = 0
  let firstContributionDate = ""
  let prevContribution = 0
  const today = normalizeUtc(new Date()).toISOString().split("T")[0]
  for (let year of years) {
    const collection = fetchYearlyContributions(username, year)
    const resolvedCollection = await collection
    collections.push(resolvedCollection)

    const contributionCalendar = resolvedCollection.data.user.contributionsCollection.contributionCalendar
    const contributions = contributionCalendar.weeks
    totalContributions += contributionCalendar.totalContributions
    for (let contribution of [...contributions].reverse()) {
      for (let day of [...contribution.contributionDays].reverse()) {
        if (day.contributionCount === 0) {
          longestStreak = Math.max(potentialStreak, longestStreak)
          if (currentStreak === -1 && day.date < today) {
            currentStreak = Math.max(potentialStreak, currentStreak)
          }

          potentialStreak = 0
        } else {
          potentialStreak += 1
          firstContributionDate = day.date
        }

        prevContribution = day.contributionCount
      }
    }
  }

  return { collections, insights: { longestStreak, currentStreak, totalContributions, firstContributionDate } }
}

export default function GithubContributions() {
  const { resolvedTheme } = useTheme()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const usernameRef = useRef<HTMLInputElement>(null)
  const [collections, setCollections] = useState<IContributionsCollection[]>([])
  const [insights, setInsights] = useState<IUserInsights>()
  const [svgRefs, setSvgRefs] = useState<RefObject<SVGSVGElement>[]>([])

  const insightCardStyling =
    "bg-white dark:bg-gray-800 border border-gray-200 shadow-lg hover:shadow-2xl p-6 flex flex-col items-center overflow-hidden !transform !transition !duration-300 !ease-out rounded-lg hover:scale-[1.03]"
  const insightTitleStyling = "text-3xl font-bold"
  const insightSubtitleStyling = "mt-1 text-md leading-6 font-medium text-gray-500"

  function drawChart(payload: IContributionsCollection, svgRef: RefObject<SVGSVGElement>) {
    const contributions = payload.data.user.contributionsCollection.contributionCalendar.weeks

    const chartWidth = 740
    const chartHeight = 88
    const topMargin = 12
    const leftMargin = 24

    // Source: https://github.com/github/feedback/discussions/7078
    const colorPallete = {
      dark: {
        NONE: "#1F2937", //"#161B22"
        FIRST_QUARTILE: "#0E4429",
        SECOND_QUARTILE: "#006D32",
        THIRD_QUARTILE: "#26A641",
        FOURTH_QUARTILE: "#39D353",
      },
      light: {
        NONE: "#EBEDF0",
        FIRST_QUARTILE: "#9BE9A8",
        SECOND_QUARTILE: "#30C463",
        THIRD_QUARTILE: "#30A14E",
        FOURTH_QUARTILE: "#216d39",
      },
    }
    const rectOutline = resolvedTheme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(27, 31, 35, 0.06)"
    const fontFamily =
      "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const months = contributions.reduce((months, item) => {
      item.contributionDays.forEach((contribution) => {
        const date = normalizeUtc(new Date(contribution.date))

        const month = date.toLocaleDateString("en-us", { month: "short" })
        if (!months.includes(month)) {
          months.push(month)
        }
      })
      return months
    }, new Array<string>())

    const svg = d3
      .select(svgRef.current)
      .attr("width", chartWidth + leftMargin)
      .attr("height", chartHeight + topMargin)

    // clean-up previous render
    svg.selectAll("*").remove()

    // Chart
    const chartContainer = svg
      .append("g")
      .attr("id", "chartContainer")
      .attr("transform", `translate(${leftMargin}, ${topMargin})`)
    const weekPaths = chartContainer
      .selectAll("g")
      .data(contributions)
      .enter()
      .append("g")
      .attr("transform", (d, i) => `translate(${i * 14}, 0)`)

    const contributionRects = weekPaths
      .selectAll("rect")
      .data((d) => {
        return d.contributionDays
      })
      .enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", (d, i) => i * 13)
      .attr("width", 10)
      .attr("height", 10)
      .attr("rx", 2)
      .attr("ry", 2)
      .attr(
        "style",
        `shape-rendering: geometricPrecision; outline: 1px solid ${rectOutline}; outline-offset: -1px; border-radius: 2px`
      )
      .attr("fill", (d) =>
        resolvedTheme === "dark" ? colorPallete.dark[d.contributionLevel] : colorPallete.light[d.contributionLevel]
      )
      .append("title")
      .text(
        (d) =>
          `${d.contributionCount} contribution${d.contributionCount === 1 ? "" : "s"} on ${formatDate(
            normalizeUtc(new Date(d.date))
          )}`
      )

    // Top Axis
    const topAxis = svg.append("g").attr("id", "topAxis")
    topAxis
      .selectAll("text")
      .data(months)
      .enter()
      .append("text")
      .text((d) => d)
      .attr("x", (d, i) => leftMargin + (chartWidth / months.length) * i)
      .attr("y", (d) => 7)
      .style("font-size", "9px")
      .style("font-family", fontFamily)
      .style("fill", resolvedTheme === "dark" ? "#fff" : "#000")

    // Left Axis
    const leftAxis = svg.append("g").attr("id", "leftAxis")
    leftAxis
      .selectAll("text")
      .data(days)
      .enter()
      .append("text")
      .text((d) => d)
      .attr("x", (d) => 0)
      .attr("y", (d, i) => topMargin + 9 + (chartHeight / days.length) * i)
      .attr("style", (d, i) => `display: ${i % 2 === 1 ? "block" : "none"}`)
      .style("font-size", "9px")
      .style("font-family", fontFamily)
      .style("fill", resolvedTheme === "dark" ? "#fff" : "#000")

    // Tooltip
    // const tooltip = svg.append("g").attr("id", "tooltip").style("opacity", 0)
    // const tooltipText = tooltip
    //   .append("text")
    //   .attr("id", "tooltipText")
    //   .style("fill", resolvedTheme === "dark" ? "#fff" : "#000")

    // const mouseover = () => {
    //   tooltip.style("opacity", 1)
    // }

    // const mouseleave = () => {
    //   tooltip.style("opacity", 0)
    // }

    // const mousemove = (event: any, d: IContributionWeek) => {
    //   tooltipText.text(
    //     `${d.contributionCount} contribution${d.contributionCount === 1 ? "" : "s"} on ${formatDate(
    //       normalizeUtc(new Date(d.date))
    //     )}`
    //   )

    //   // const x = event.pageX
    //   // const y = event.pageY
    //   // console.log(`x: ${event.pageX}`)
    //   // console.log(`y: ${event.pageY}`)
    //   // console.log("\n")
    //   const [x, y] = d3.pointer(event)
    //   tooltip.attr("transform", `translate(${event.pageX}, ${y})`)
    // }
    // contributionRects.on("mousemove", mousemove).on("mouseleave", mouseleave).on("mouseover", mouseover)

    setError(false)
    setLoading(false)
  }

  async function fetchData() {
    try {
      setLoading(true)

      const username = usernameRef.current?.value || ""
      const payload = await fetchAllContributions(username)

      const newRefs = new Array(payload.collections.length)
        .fill(undefined)
        .map((_, i) => svgRefs[i] || createRef<SVGSVGElement>())

      setCollections(payload.collections)
      setInsights(payload.insights)
      setSvgRefs(newRefs)
    } catch (error) {
      setError(true)
      setLoading(false)
    }
  }

  function render() {
    collections.forEach((item, i) => {
      if (svgRefs[i] && svgRefs[i].current) {
        drawChart(item, svgRefs[i])
      }
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    render()
  }, [svgRefs, resolvedTheme])

  return (
    <div className="flex flex-col md:items-center">
      <div className="flex flex-col items-center">
        <h1 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Github Contributions
        </h1>
        <p className="mt-4 text-xl text-gray-500 font-medium">visualize, analyze and contrast your commits</p>
        <form
          className="mt-8 mb-12 relative rounded-md shadow-sm w-full md:w-96"
          onSubmit={(event) => {
            event.preventDefault()
            fetchData()
          }}
        >
          <input
            className="focus:ring-blue-300 focus:border-blue-300 dark:focus:ring-blue-900 dark:focus:border-blue-900 dark:bg-gray-800 dark:bg-opacity-40 block text-xl border border-gray-300 rounded-lg w-full md:w-96 p-4 pr-14"
            type="text"
            placeholder="username"
            defaultValue="pondorasti"
            ref={usernameRef}
          />
          <button className="absolute inset-y-0 right-0 px-3 flex items-center" onClick={() => fetchData()}>
            {!loading ? (
              <SearchIcon className="h-8 w-8 text-gray-400" aria-hidden="true" />
            ) : (
              <div className="h-8 w-8 flex">
                <svg
                  className="animate-spin h-6 w-6 text-black m-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            )}
          </button>
        </form>
      </div>
      <div
        className={classNames(
          "flex flex-col items-center",
          "transition duration-300 ease-out transform",
          loading || !error ? "opacity-0" : "opacity-100",
          loading || !error ? "" : "translate-y-4"
        )}
      >
        <p className="mt-2 text-black text-lg text-gray-500">
          Uh oh! It looks like the user you&apos;re looking for doesn&#39;t exist.
        </p>
      </div>

      <div
        className={classNames(
          "-mt-9",
          "transition duration-300 ease-out transform",
          loading || error ? "opacity-0" : "opacity-100",
          loading || error ? "" : "translate-y-4"
        )}
      >
        {collections.map((item, i) => {
          const numberOfContributions = item.data.user.contributionsCollection.contributionCalendar.totalContributions
          const year = item.data.user.contributionsCollection.year

          return (
            <Fragment key={i}>
              <div className="mb-8 overflow-x-scroll">
                <p className="pb-2 pl-5 inline-block text-md font-medium text-gray-900">
                  {numberOfContributions} contribution{numberOfContributions === 1 ? "" : "s"} in{" "}
                  {year !== undefined ? year : "the last year"}
                </p>
                <svg ref={svgRefs[i]} className="overflow-visible" />
              </div>
              {i === 0 && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 gap-4 mb-8">
                    <div className={insightCardStyling}>
                      <div className={insightTitleStyling}>{insights?.currentStreak}</div>
                      <div className={insightSubtitleStyling}>Current Streak</div>
                    </div>
                    <div className={insightCardStyling}>
                      <div className={insightTitleStyling}>{insights?.longestStreak}</div>
                      <div className={insightSubtitleStyling}>Longest Streak</div>
                    </div>
                    <div className={insightCardStyling}>
                      <div className={insightTitleStyling}>{insights?.totalContributions}</div>
                      <div className={insightSubtitleStyling}>Total Contributions</div>
                    </div>
                    <div className={insightCardStyling}>
                      <div className={insightTitleStyling}>
                        {formatDate(normalizeUtc(new Date(insights?.firstContributionDate ?? new Date())))}
                      </div>
                      <div className={insightSubtitleStyling}>First Contribution</div>
                    </div>
                  </div>
                  <div className="mb-8 max-w-screen-md w-full bg-gray-200 bg-opacity-75 h-px" />
                </>
              )}
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
