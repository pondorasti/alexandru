import { energy, meals, weighIns } from "virtual:macro-content"
import {
  ESTIMATE_DAYS,
  GOALS,
  RECENT_DAYS,
  RECENT_WEEKS,
  ROLLING_DAYS,
  TIME_ZONE,
  WEIGHT_DAYS
} from "../config"
import {
  addDays,
  type BalanceDay,
  calendarDays,
  dailyTotals,
  type DayTotals,
  energyBalance,
  type Estimate,
  estimate,
  groupMeals,
  type MealGroup,
  morningWeights,
  reachDate,
  rollingAverage,
  sumEntries,
  type Totals,
  type WeekAverages,
  weeklyAverages,
  type WeightPoint
} from "../lib/nutrition"

export interface Day {
  date: string
  meals: MealGroup[]
  totals: Totals
  /** Nearest logged days on either side. */
  prev: string | null
  next: string | null
}

export interface Progress {
  /** Over the `ESTIMATE_DAYS` ending on the last day with energy (or a weigh-in) logged. */
  estimate: Estimate
  /** The latest rolling-average weight, which the goals are measured from. */
  current: { date: string; kg: number }
  goals: { label: string; kg: number; by: string; eta: string | null }[]
}

export interface Dashboard {
  /** Today's date in `TIME_ZONE`. */
  today: string
  /** The latest logged day, which is usually today. */
  latest: Day | null
  recent: { date: string; totals: DayTotals | null }[]
  /** Eaten against burned over the same days as `recent`. */
  balance: BalanceDay[]
  weights: WeightPoint[]
  progress: Progress | null
  weeks: WeekAverages[]
}

const totals = dailyTotals(meals)
const dates = totals.map((day) => day.date)
const mornings = morningWeights(weighIns)
const trend = rollingAverage(mornings, ROLLING_DAYS)

export const localDate = (now = new Date()) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE }).format(now)

export function getDay(date: string): Day | null {
  const index = dates.indexOf(date)
  if (index === -1) return null
  const entries = meals.filter((entry) => entry.date === date)
  return {
    date,
    meals: groupMeals(entries),
    totals: sumEntries(entries),
    prev: dates[index - 1] ?? null,
    next: dates[index + 1] ?? null
  }
}

function getProgress(): Progress | null {
  const latest = trend.at(-1)
  const to = energy.at(-1)?.date ?? latest?.date
  if (!latest || !to) return null
  const range = estimate(totals, energy, mornings, addDays(to, -(ESTIMATE_DAYS - 1)), to)
  const current = { date: latest.date, kg: latest.average }
  return {
    estimate: range,
    current,
    goals: GOALS.map((goal) => ({
      ...goal,
      eta: reachDate(current.date, current.kg, range.rate, goal.kg)
    }))
  }
}

export function getDashboard(): Dashboard {
  const last = dates.at(-1)
  const lastWeighIn = trend.at(-1)?.date
  const range = last ? ([addDays(last, -(RECENT_DAYS - 1)), last] as const) : null
  return {
    today: localDate(),
    latest: last ? getDay(last) : null,
    recent: range ? calendarDays(totals, ...range) : [],
    balance: range ? energyBalance(totals, energy, ...range) : [],
    weights: lastWeighIn
      ? trend.filter((point) => point.date > addDays(lastWeighIn, -WEIGHT_DAYS))
      : [],
    progress: getProgress(),
    weeks: weeklyAverages(totals, mornings, energy).slice(0, RECENT_WEEKS)
  }
}
