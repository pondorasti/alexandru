import { describe, expect, it } from "vite-plus/test"
import {
  addDays,
  calendarDays,
  dailyTotals,
  energyBalance,
  estimate,
  type Entry,
  groupMeals,
  IsoDate,
  morningWeights,
  reachDate,
  rollingAverage,
  weekStart,
  weeklyAverages,
  weightRate
} from "./nutrition"

const entry = (date: string, time: string, values: Partial<Entry> = {}): Entry => ({
  date,
  time,
  meal: "snack",
  item: "Item",
  kcal: 100,
  protein: 10,
  carbs: 10,
  fat: 5,
  fiber: 2,
  ...values
})

describe("dates", () => {
  it("accepts only real YYYY-MM-DD dates", () => {
    expect(IsoDate.safeParse("2028-02-29").success).toBe(true)
    for (const bad of ["2026-02-29", "2026-13-01", "2026-00-10", "2026-1-01", "today"]) {
      expect(IsoDate.safeParse(bad).success).toBe(false)
    }
  })

  it("adds days across months and finds the Monday of a week", () => {
    expect(addDays("2026-02-28", 1)).toBe("2026-03-01")
    expect(addDays("2026-03-01", -1)).toBe("2026-02-28")
    // Daylight saving ends in Los Angeles on Nov 1, 2026; calendar math must not drift.
    expect(addDays("2026-10-31", 2)).toBe("2026-11-02")
    expect(weekStart("2026-10-13")).toBe("2026-10-12")
    expect(weekStart("2026-10-12")).toBe("2026-10-12")
    expect(weekStart("2026-10-18")).toBe("2026-10-12")
  })
})

describe("dailyTotals", () => {
  it("sums each day, counting blank fiber as 0 and flagging it", () => {
    const totals = dailyTotals([
      entry("2026-10-02", "08:00", { kcal: 520, protein: 38.4, fiber: 9 }),
      entry("2026-10-01", "12:00", { kcal: 780, protein: 48, fiber: null }),
      entry("2026-10-02", "19:00", { kcal: 330.5, protein: 7.2, fiber: 5.1 })
    ])
    expect(totals).toEqual([
      {
        date: "2026-10-01",
        kcal: 780,
        protein: 48,
        carbs: 10,
        fat: 5,
        fiber: 0,
        fiberUnknown: 1,
        entries: 1
      },
      {
        date: "2026-10-02",
        kcal: 850.5,
        protein: 45.6,
        carbs: 20,
        fat: 10,
        fiber: 14.1,
        fiberUnknown: 0,
        entries: 2
      }
    ])
  })

  it("fills calendar gaps with null", () => {
    const totals = dailyTotals([entry("2026-10-01", "08:00"), entry("2026-10-03", "08:00")])
    expect(
      calendarDays(totals, "2026-10-01", "2026-10-03").map((day) => day.totals?.kcal ?? null)
    ).toEqual([100, null, 100])
  })
})

describe("groupMeals", () => {
  it("groups consecutive entries of the same meal, in time order", () => {
    const groups = groupMeals([
      entry("2026-10-01", "19:00", { meal: "dinner", kcal: 400 }),
      entry("2026-10-01", "08:00", { meal: "breakfast", kcal: 300 }),
      entry("2026-10-01", "15:00", { meal: "snack" }),
      entry("2026-10-01", "15:05", { meal: "snack", kcal: 50 }),
      entry("2026-10-01", "20:15", { meal: "dessert", kcal: 310 }),
      entry("2026-10-01", "21:30", { meal: "snack" }),
      entry("2026-10-01", "08:00", { meal: "breakfast", kcal: 5 })
    ])
    expect(groups.map((group) => [group.meal, group.totals.kcal, group.entries.length])).toEqual([
      ["breakfast", 305, 2],
      ["snack", 150, 2],
      ["dinner", 400, 1],
      ["dessert", 310, 1],
      ["snack", 100, 1]
    ])
  })
})

describe("weights", () => {
  it("keeps the first reading before noon on each day", () => {
    expect(
      morningWeights([
        { date: "2026-10-01", time: "21:10", kg: 73.4 },
        { date: "2026-10-01", time: "07:20", kg: 72.4 },
        { date: "2026-10-01", time: "09:00", kg: 72.2 },
        { date: "2026-10-02", time: "12:00", kg: 73.1 },
        { date: "2026-10-03", time: "11:59", kg: 72.6 }
      ])
    ).toEqual([
      { date: "2026-10-01", time: "07:20", kg: 72.4 },
      { date: "2026-10-03", time: "11:59", kg: 72.6 }
    ])
  })

  it("averages over a calendar-day window, not a count of readings", () => {
    const readings = [
      { date: "2026-10-01", time: "07:00", kg: 70 },
      { date: "2026-10-02", time: "07:00", kg: 71 },
      { date: "2026-10-04", time: "07:00", kg: 72 },
      { date: "2026-10-07", time: "07:00", kg: 73 },
      { date: "2026-10-08", time: "07:00", kg: 75 }
    ]
    expect(rollingAverage(readings, 7).map((point) => point.average)).toEqual([
      70, 70.5, 71, 71.5, 72.75
    ])
    expect(rollingAverage(readings, 3).map((point) => point.average)).toEqual([
      70, 70.5, 71.5, 73, 74
    ])
  })
})

describe("weeklyAverages", () => {
  it("averages logged days and morning weights per Monday week, newest first", () => {
    const totals = dailyTotals([
      entry("2026-10-04", "08:00", { kcal: 2000, protein: 100, fiber: 20 }),
      entry("2026-10-05", "08:00", { kcal: 3000, protein: 120, fiber: 30 }),
      entry("2026-10-07", "08:00", { kcal: 2500, protein: 101, fiber: null })
    ])
    const mornings = [
      { date: "2026-10-05", time: "07:00", kg: 72 },
      { date: "2026-10-06", time: "07:00", kg: 72.5 }
    ]
    const energy = [
      { date: "2026-10-05", resting: 1600, active: 600 },
      { date: "2026-10-06", resting: 1600, active: 400 }
    ]
    expect(weeklyAverages(totals, mornings, energy)).toEqual([
      {
        week: "2026-10-05",
        days: 2,
        kcal: 2750,
        protein: 110.5,
        fiber: 15,
        burned: 2100,
        balance: 800,
        kg: 72.25
      },
      {
        week: "2026-09-28",
        days: 1,
        kcal: 2000,
        protein: 100,
        fiber: 20,
        burned: null,
        balance: null,
        kg: null
      }
    ])
  })
})

describe("energyBalance", () => {
  it("subtracts burned from eaten per calendar day, null where either is missing", () => {
    const totals = dailyTotals([
      entry("2026-10-05", "08:00", { kcal: 2600, protein: 100, fiber: 20 }),
      entry("2026-10-07", "08:00", { kcal: 1900, protein: 100, fiber: 20 })
    ])
    const energy = [
      { date: "2026-10-05", resting: 1580, active: 620 },
      { date: "2026-10-06", resting: 1570, active: 300 }
    ]
    expect(energyBalance(totals, energy, "2026-10-05", "2026-10-07")).toEqual([
      { date: "2026-10-05", eaten: 2600, burned: 2200, balance: 400 },
      { date: "2026-10-06", eaten: null, burned: 1870, balance: null },
      { date: "2026-10-07", eaten: 1900, burned: null, balance: null }
    ])
  })
})

describe("weightRate", () => {
  const mornings = [
    { date: "2026-10-01", time: "08:00", kg: 54 },
    { date: "2026-10-03", time: "08:00", kg: 54.4 },
    { date: "2026-10-05", time: "08:00", kg: 54.4 },
    { date: "2026-10-07", time: "08:00", kg: 54.6 }
  ]

  it("fits a least-squares line through the readings in the window, in kg a day", () => {
    expect(weightRate(mornings, "2026-10-01", "2026-10-07")).toBeCloseTo(0.09, 10)
  })

  it("needs readings on two different days", () => {
    expect(weightRate(mornings, "2026-10-06", "2026-10-30")).toBeNull()
  })
})

describe("estimate", () => {
  it("takes the energy the weight change stored out of the intake", () => {
    const totals = dailyTotals([
      entry("2026-10-01", "08:00", { kcal: 2600, protein: 100, fiber: 20 }),
      entry("2026-10-02", "08:00", { kcal: 2800, protein: 100, fiber: 20 })
    ])
    const energy = [{ date: "2026-10-01", resting: 1600, active: 600 }]
    const mornings = [
      { date: "2026-10-01", time: "08:00", kg: 54 },
      { date: "2026-10-08", time: "08:00", kg: 54.7 }
    ]
    expect(estimate(totals, energy, mornings, "2026-10-01", "2026-10-08")).toEqual({
      from: "2026-10-01",
      to: "2026-10-08",
      rate: expect.closeTo(0.1, 10),
      eaten: 2700,
      burned: 2200,
      maintenance: 1930
    })
  })
})

describe("reachDate", () => {
  it("projects the trend forward to the goal, rounding up to a whole day", () => {
    expect(reachDate("2026-11-02", 54.7, 0.06, 56.7)).toBe("2026-12-06")
  })

  it("is the given day once the goal is reached, and null when the trend never gets there", () => {
    expect(reachDate("2026-11-02", 57, 0.06, 56.7)).toBe("2026-11-02")
    expect(reachDate("2026-11-02", 54.7, -0.01, 56.7)).toBeNull()
    expect(reachDate("2026-11-02", 54.7, null, 56.7)).toBeNull()
  })
})
