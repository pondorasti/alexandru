import { useState, useEffect, RefObject, createRef } from "react"
import * as d3 from "d3"
import { fetchAllContributions, IContributionsCollection } from "./fetchContributions"

export default function GithubContributions() {
  const [collections, setCollections] = useState<IContributionsCollection[]>([])
  const [svgRefs, setSvgRefs] = useState<RefObject<SVGSVGElement>[]>([])

  function drawChart(payload: IContributionsCollection, svgRef: RefObject<SVGSVGElement>) {
    const contributions = payload.data.user.contributionsCollection.contributionCalendar.weeks

    const chartWidth = 740
    const chartHeight = 88
    const topMargin = 12
    const leftMargin = 24

    // Source: https://github.com/github/feedback/discussions/7078
    const colorPallete = {
      dark: {
        NONE: "#161B22",
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
    const fontFamily =
      "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const months = contributions.reduce((months, item) => {
      item.contributionDays.forEach((contribution) => {
        const utcDate = new Date(contribution.date)
        const date = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000)

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

    weekPaths
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
        "shape-rendering: geometricPrecision; outline: 1px solid rgba(27, 31, 35, 0.06); outline-offset: -1px; border-radius: 2px"
      )
      .attr("fill", (d) => colorPallete.light[d.contributionLevel])

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
  }

  async function fetchData() {
    const payload = await fetchAllContributions("pondorasti")

    const newRefs = new Array(payload.length).fill(undefined).map((_, i) => svgRefs[i] || createRef<SVGSVGElement>())

    setCollections(payload)
    setSvgRefs(newRefs)
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    collections.forEach((item, i) => {
      if (svgRefs[i] && svgRefs[i].current) {
        drawChart(item, svgRefs[i])
      }
    })
  }, [svgRefs])

  return (
    <div className="mb-6">
      {collections.map((item, i) => {
        const numberOfContributions = item.data.user.contributionsCollection.contributionCalendar.totalContributions
        return (
          <div key={i} className="mb-8">
            <div className="pb-2 pl-5">
              {numberOfContributions} contribution{numberOfContributions === 1 ? "" : "s"} in the last year
            </div>
            <svg ref={svgRefs[i]}></svg>
          </div>
        )
      })}
    </div>
  )
}
