import { useRef, useEffect } from "react"
import * as d3 from "d3"
import payload from "./payload.json"

export default function GithubContributions() {
  const svgRef = useRef<SVGSVGElement>(null)

  function drawChart() {
    const contributions = payload.data.user.contributionsCollection.contributionCalendar.weeks

    const chartWidth = 740
    const chartHeight = 88
    const topMargin = 12
    const leftMargin = 24

    const fontFamily =
      "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"

    const svg = d3
      .select(svgRef.current)
      .attr("width", chartWidth + leftMargin)
      .attr("height", chartHeight + topMargin)

    // Chart
    const chartContainer = svg
      .append("g")
      .attr("id", "chartContainer")
      .attr("transform", (d, i) => `translate(${leftMargin}, ${topMargin})`)
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
      .attr("fill", (d) => d.color)

    // Top Axis
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    // const xScale = d3.scaleLinear().domain([1, 12]).range([0, chartWidth])
    const topAxis = svg.append("g").attr("id", "topAxis")
    topAxis
      .selectAll("text")
      .data(months)
      .enter()
      .append("text")
      .text((d) => d)
      .attr("x", (d, i) => leftMargin + (chartWidth / months.length) * i) // leftMargin + xScale(i)
      .attr("y", (d) => 7)
      .style("font-size", "9px")
      .style("font-family", fontFamily)

    // Left Axis
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    // const yScale = d3.scalePoint().domain(days).range([0, chartHeight])
    const leftAxis = svg.append("g").attr("id", "leftAxis")
    leftAxis
      .selectAll("text")
      .data(days)
      .enter()
      .append("text")
      .text((d) => d)
      .attr("x", (d) => 0)
      .attr("y", (d, i) => topMargin + 9 + (chartHeight / days.length) * i) // topMargin + 9 + yScale(i)
      .attr("style", (d, i) => `display: ${i % 2 === 1 ? "block" : "none"}`)
      .style("font-size", "9px")
      .style("font-family", fontFamily)
  }

  useEffect(() => {
    drawChart()
  }, [svgRef])

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  )
}
