import { fileURLToPath } from "node:url"
import { describe, expect, it } from "vite-plus/test"
import { loadContent } from "./load"

describe("repo content", () => {
  it("loads every CSV, sorted oldest first", () => {
    const { meals, weighIns, energy } = loadContent(
      fileURLToPath(new URL("../../content", import.meta.url))
    )
    expect(meals.length).toBeGreaterThan(0)
    expect(weighIns.length).toBeGreaterThan(0)
    expect(energy.length).toBeGreaterThan(0)
    for (const rows of [meals, weighIns, energy]) {
      const keys = rows.map((row) => `${row.date} ${"time" in row ? row.time : ""}`)
      expect(keys).toEqual([...keys].sort())
    }
  })
})
