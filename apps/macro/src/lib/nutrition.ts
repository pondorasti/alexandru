import { z } from "zod/mini"
import { KCAL_PER_KG, MORNING_BEFORE } from "../config"

export const MEALS = ["breakfast", "lunch", "dinner", "dessert", "snack", "post-workout"] as const
export const Meal = z.enum(MEALS)
export type Meal = z.infer<typeof Meal>

/** A calendar date, `YYYY-MM-DD`, that exists. */
export const IsoDate = z.string().check(
  z.regex(/^\d{4}-\d{2}-\d{2}$/, "expected a YYYY-MM-DD date"),
  z.refine((value) => {
    const ms = fromIso(value)
    return !Number.isNaN(ms) && toIso(ms) === value
  }, "not a real calendar date")
)

/** A 24-hour local time, `HH:MM`. */
export const Time = z.string().check(z.regex(/^([01]\d|2[0-3]):[0-5]\d$/, "expected HH:MM (24h)"))

export interface Entry {
  date: string
  time: string
  meal: Meal
  item: string
  kcal: number
  protein: number
  carbs: number
  fat: number
  /** Null when the row left fiber blank. */
  fiber: number | null
}

export interface WeighIn {
  date: string
  time: string
  kg: number
}

/** Energy burned over a whole day, as the watch reports it to Apple Health. */
export interface EnergyDay {
  date: string
  resting: number
  active: number
}

export interface BalanceDay {
  date: string
  /** Null when no food was logged. */
  eaten: number | null
  /** Resting plus active energy; null when the day's energy isn't logged. */
  burned: number | null
  /** Eaten minus burned: positive is a surplus. Null unless both are known. */
  balance: number | null
}

export interface Totals {
  kcal: number
  protein: number
  carbs: number
  fat: number
  /** Sum of the entries with fiber logged; blanks count as 0. */
  fiber: number
  /** Entries whose fiber was blank, so `fiber` may be low. */
  fiberUnknown: number
  entries: number
}

export interface DayTotals extends Totals {
  date: string
}

export interface MealGroup {
  meal: Meal
  entries: Entry[]
  totals: Totals
}

export interface WeightPoint {
  date: string
  time: string
  kg: number
  /** Mean of the morning readings in the `ROLLING_DAYS` calendar days ending on `date`. */
  average: number
}

export interface Estimate {
  from: string
  to: string
  /** Slope of the morning weights, in kg a day; null with fewer than two of them. */
  rate: number | null
  /** Mean intake over the days with food logged. */
  eaten: number | null
  /** Mean daily burn the watch reported. */
  burned: number | null
  /**
   * The intake that would hold weight steady: what was eaten, less the energy that went into
   * the weight change. Null unless both the rate and the intake are known.
   */
  maintenance: number | null
}

export interface WeekAverages {
  /** Monday of the week. */
  week: string
  /** Days in the week with any food logged; the averages are over these days. */
  days: number
  kcal: number | null
  protein: number | null
  fiber: number | null
  /** Mean energy burned over the week's days with energy logged. */
  burned: number | null
  /** Mean surplus (or deficit, negative) over the days with both food and energy logged. */
  balance: number | null
  /** Mean morning weight over the week's readings. */
  kg: number | null
}

const DAY_MS = 86_400_000

export const fromIso = (date: string) => Date.parse(`${date}T00:00:00Z`)
export const toIso = (ms: number) => new Date(ms).toISOString().slice(0, 10)
export const addDays = (date: string, days: number) => toIso(fromIso(date) + days * DAY_MS)
export const daysBetween = (from: string, to: string) => (fromIso(to) - fromIso(from)) / DAY_MS

/** Monday on or before `date`. */
export const weekStart = (date: string) =>
  addDays(date, -((new Date(fromIso(date)).getUTCDay() + 6) % 7))

const round = (value: number, digits = 1) => Math.round(value * 10 ** digits) / 10 ** digits
const mean = (values: number[]) =>
  values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null

const byTime = <T extends { date: string; time: string }>(a: T, b: T) =>
  a.date.localeCompare(b.date) || a.time.localeCompare(b.time)

export function sumEntries(entries: Entry[]): Totals {
  const totals: Totals = {
    kcal: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    fiberUnknown: 0,
    entries: entries.length
  }
  for (const entry of entries) {
    totals.kcal += entry.kcal
    totals.protein += entry.protein
    totals.carbs += entry.carbs
    totals.fat += entry.fat
    if (entry.fiber === null) totals.fiberUnknown++
    else totals.fiber += entry.fiber
  }
  for (const key of ["kcal", "protein", "carbs", "fat", "fiber"] as const) {
    totals[key] = round(totals[key])
  }
  return totals
}

/** Totals for every logged day, oldest first. */
export function dailyTotals(entries: Entry[]): DayTotals[] {
  const days = new Map<string, Entry[]>()
  for (const entry of entries) days.set(entry.date, [...(days.get(entry.date) ?? []), entry])
  return [...days.keys()].sort().map((date) => ({ date, ...sumEntries(days.get(date)!) }))
}

/** One slot per calendar day from `from` to `to`, null where nothing was logged. */
export function calendarDays(totals: DayTotals[], from: string, to: string) {
  const byDate = new Map(totals.map((day) => [day.date, day]))
  const days: { date: string; totals: DayTotals | null }[] = []
  for (let date = from; date <= to; date = addDays(date, 1)) {
    days.push({ date, totals: byDate.get(date) ?? null })
  }
  return days
}

/** Eaten against burned for every calendar day from `from` to `to`. */
export function energyBalance(
  totals: DayTotals[],
  energy: EnergyDay[],
  from: string,
  to: string
): BalanceDay[] {
  const burnedOn = new Map(energy.map((day) => [day.date, day.resting + day.active]))
  return calendarDays(totals, from, to).map(({ date, totals }) => {
    const eaten = totals?.kcal ?? null
    const burned = burnedOn.get(date) ?? null
    return {
      date,
      eaten,
      burned,
      balance: eaten === null || burned === null ? null : round(eaten - burned, 0)
    }
  })
}

/**
 * A day's entries in time order, grouped into runs of the same meal, so an afternoon snack
 * and an evening snack stay apart.
 */
export function groupMeals(entries: Entry[]): MealGroup[] {
  const runs: { meal: Meal; entries: Entry[] }[] = []
  for (const entry of [...entries].sort(byTime)) {
    const last = runs.at(-1)
    if (last?.meal === entry.meal) last.entries.push(entry)
    else runs.push({ meal: entry.meal, entries: [entry] })
  }
  return runs.map((run) => ({ ...run, totals: sumEntries(run.entries) }))
}

/** The first reading before `MORNING_BEFORE` on each day, oldest first. */
export function morningWeights(weighIns: WeighIn[]): WeighIn[] {
  const mornings = new Map<string, WeighIn>()
  for (const reading of [...weighIns].sort(byTime)) {
    if (reading.time < MORNING_BEFORE && !mornings.has(reading.date)) {
      mornings.set(reading.date, reading)
    }
  }
  return [...mornings.values()]
}

/**
 * Pairs each reading with the mean of the readings in the `days` calendar days ending on its
 * date. The window is by date, not count, so gaps in logging shrink it rather than reach back.
 */
export function rollingAverage(readings: WeighIn[], days: number): WeightPoint[] {
  const sorted = [...readings].sort(byTime)
  return sorted.map((reading) => {
    const from = addDays(reading.date, -(days - 1))
    const window = sorted.filter((other) => other.date >= from && other.date <= reading.date)
    return { ...reading, average: round(mean(window.map((other) => other.kg))!, 2) }
  })
}

/** Averages per Monday-start week, newest first, over the days that have food logged. */
export function weeklyAverages(
  totals: DayTotals[],
  mornings: WeighIn[],
  energy: EnergyDay[]
): WeekAverages[] {
  const weeks = new Map<
    string,
    { days: DayTotals[]; kg: number[]; burned: number[]; balance: number[] }
  >()
  const week = (date: string) => {
    const key = weekStart(date)
    if (!weeks.has(key)) weeks.set(key, { days: [], kg: [], burned: [], balance: [] })
    return weeks.get(key)!
  }
  const eatenOn = new Map(totals.map((day) => [day.date, day.kcal]))
  for (const day of totals) week(day.date).days.push(day)
  for (const reading of mornings) week(reading.date).kg.push(reading.kg)
  for (const day of energy) {
    const burned = day.resting + day.active
    const eaten = eatenOn.get(day.date)
    week(day.date).burned.push(burned)
    if (eaten !== undefined) week(day.date).balance.push(eaten - burned)
  }
  const average = (values: number[], digits: number) => {
    const value = mean(values)
    return value === null ? null : round(value, digits)
  }
  return [...weeks.keys()]
    .sort()
    .reverse()
    .map((key) => {
      const { days, kg, burned, balance } = weeks.get(key)!
      return {
        week: key,
        days: days.length,
        kcal: average(
          days.map((day) => day.kcal),
          0
        ),
        protein: average(
          days.map((day) => day.protein),
          1
        ),
        fiber: average(
          days.map((day) => day.fiber),
          1
        ),
        burned: average(burned, 0),
        balance: average(balance, 0),
        kg: average(kg, 2)
      }
    })
}

/**
 * Least-squares slope of the morning weights from `from` to `to`, in kg a day: steadier than
 * the change between two rolling averages, since every reading in the window counts.
 */
export function weightRate(mornings: WeighIn[], from: string, to: string): number | null {
  const points = mornings
    .filter((reading) => reading.date >= from && reading.date <= to)
    .map((reading) => ({ x: daysBetween(from, reading.date), y: reading.kg }))
  if (new Set(points.map((point) => point.x)).size < 2) return null
  const mx = mean(points.map((point) => point.x))!
  const my = mean(points.map((point) => point.y))!
  const covariance = points.reduce((sum, point) => sum + (point.x - mx) * (point.y - my), 0)
  const variance = points.reduce((sum, point) => sum + (point.x - mx) ** 2, 0)
  return covariance / variance
}

/** Gain rate, intake, burn and the maintenance they imply, over `from` to `to`. */
export function estimate(
  totals: DayTotals[],
  energy: EnergyDay[],
  mornings: WeighIn[],
  from: string,
  to: string
): Estimate {
  const within = (day: { date: string }) => day.date >= from && day.date <= to
  const rate = weightRate(mornings, from, to)
  const eaten = mean(totals.filter(within).map((day) => day.kcal))
  const burned = mean(energy.filter(within).map((day) => day.resting + day.active))
  return {
    from,
    to,
    rate,
    eaten: eaten === null ? null : round(eaten, 0),
    burned: burned === null ? null : round(burned, 0),
    maintenance: rate === null || eaten === null ? null : round(eaten - rate * KCAL_PER_KG, 0)
  }
}

/** The day a trend at `kg` on `date`, moving `rate` kg a day, reaches `goal`; null if it never does. */
export function reachDate(date: string, kg: number, rate: number | null, goal: number) {
  if (kg >= goal) return date
  if (!rate || rate <= 0) return null
  return addDays(date, Math.ceil((goal - kg) / rate))
}
