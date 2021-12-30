import { useState, useEffect, RefObject, createRef, useRef, Fragment } from "react"
import * as d3 from "d3"
import { useRouter } from "next/router"
import { useTheme } from "next-themes"
import { useHotkeys } from "react-hotkeys-hook"
import { SearchIcon } from "@heroicons/react/solid"
import classNames from "@lib/classNames"
import { normalizeUtc, formatDate } from "@lib/date"
import type { IContributionsCollection, IUserInformation, IUserInsights } from "@lib/types"

export default function GithubContributions() {
  const { resolvedTheme } = useTheme()
  const router = useRouter()
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
      halloweenDark: {
        NONE: "#1F2937", //"#161B22"
        FIRST_QUARTILE: "#631c03",
        SECOND_QUARTILE: "#bd561d",
        THIRD_QUARTILE: "#fa7a18",
        FOURTH_QUARTILE: "#fddf68",
      },
      halloweenLight: {
        NONE: "#ebedf0",
        FIRST_QUARTILE: "#ffee4a",
        SECOND_QUARTILE: "#ffc501",
        THIRD_QUARTILE: "#fe9600",
        FOURTH_QUARTILE: "#03001c",
      },
    }
    const rectOutline = resolvedTheme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(27, 31, 35, 0.06)"
    const fontFamily =
      "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"
    const today = normalizeUtc(new Date()).toISOString().split("T")[0].substring(5)
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
      .attr("fill", (d) => {
        if (today === "10-31") {
          return resolvedTheme === "dark"
            ? colorPallete.halloweenDark[d.contributionLevel]
            : colorPallete.halloweenLight[d.contributionLevel]
        }
        return resolvedTheme === "dark"
          ? colorPallete.dark[d.contributionLevel]
          : colorPallete.light[d.contributionLevel]
      })
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

    setError(false)
    setLoading(false)
  }

  async function fetchData(username: string) {
    try {
      setLoading(true)

      const res = await fetch(`/api/github-contributions?username=${username}`)
      const payload = (await res.json()) as IUserInformation

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

  // Try to fetch new data based on router changes
  const { search } = router.query
  useEffect(() => {
    const usernameInput = usernameRef.current

    // exit early if usernameRef is null
    if (!usernameInput) {
      return
    }

    if (search !== undefined) {
      usernameInput.value = String(search)
      fetchData(String(search))
    } else {
      router.push("?search=pondorasti", undefined, { shallow: true })
    }
  }, [search])

  // Render graph everytime the refs or color scheme change
  useEffect(() => {
    render()
  }, [svgRefs, resolvedTheme])

  // Focus input form based on hotkeys
  useHotkeys("⌘+k, ctrl+k, /", (event) => {
    event.preventDefault()
    usernameRef.current?.focus()
  })

  // Update router based on input
  function handleInput() {
    const username = usernameRef.current?.value || ""
    router.push("?search=" + username, undefined, { shallow: true })
  }

  return (
    <main>
      <div className="flex flex-col items-center">
        <h1 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Github Contributions
        </h1>
        <p className="mt-4 text-xl text-gray-500 font-medium">visualize, analyze and contrast your commits</p>
        <form
          className="mt-8 mb-12 relative rounded-md shadow-sm w-full md:w-96"
          onSubmit={(event) => {
            event.preventDefault()
            handleInput()
          }}
        >
          <input
            className="focus:ring-blue-300 focus:border-blue-300 dark:focus:ring-blue-900 dark:focus:border-blue-900 dark:bg-gray-800 dark:bg-opacity-40 block text-xl border border-gray-300 rounded-lg w-full md:w-96 p-4 pr-14"
            type="text"
            placeholder="username"
            ref={usernameRef}
          />
          <button className="absolute inset-y-0 right-0 px-3 flex items-center" onClick={() => handleInput()}>
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
              <div className="mb-8 overflow-x-scroll md:-mx-[22px]">
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
    </main>
  )
}
