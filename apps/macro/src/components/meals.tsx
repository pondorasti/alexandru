import type { Entry, MealGroup, Totals } from "../lib/nutrition"
import { grams, kcal, label } from "../lib/format"

/** "Orange juice (8 oz)" -> name "Orange juice", details "8 oz". */
function describeItem(item: string) {
  const match = /^(.*?)\s*\((.*)\)\s*$/.exec(item)
  return match ? { name: match[1], details: match[2] } : { name: item, details: undefined }
}

const Macros = ({ of }: { of: Pick<Entry, "protein" | "carbs" | "fat" | "fiber"> }) => (
  <>
    {grams(of.protein)} P · {grams(of.carbs)} C · {grams(of.fat)} F ·{" "}
    {of.fiber === null ? "–" : grams(of.fiber)} fiber
  </>
)

/**
 * A day's items in one table, in time order. The meal is named under the time where it
 * changes, and a stronger rule marks the change; an item's details show on hover, and a bar
 * under its calories is its share of the day. On small screens the macro columns fold into
 * a line under the food.
 */
export function MealList({ meals, totals }: { meals: MealGroup[]; totals: Totals }) {
  const share = (value: number) =>
    `${Math.min(100, totals.kcal ? (value / totals.kcal) * 100 : 0)}%`
  const column = "hidden text-right align-top sm:table-cell"
  return (
    <section aria-label="Meals" className="card overflow-x-auto">
      <table className="w-full text-sm tabular-nums sm:min-w-[720px]">
        <thead className="text-left text-xs text-muted">
          <tr>
            <th className="w-21 pb-3 font-normal">Time</th>
            <th className="pb-3 font-normal sm:min-w-64">Food</th>
            <th className="w-20 pb-3 pl-4 text-right font-normal sm:w-28">Calories</th>
            <th className={`${column} w-20 pb-3 font-normal`}>Protein</th>
            <th className={`${column} w-20 pb-3 font-normal`}>Carbs</th>
            <th className={`${column} w-20 pb-3 font-normal`}>Fat</th>
            <th className={`${column} w-20 pb-3 font-normal`}>Fiber</th>
          </tr>
        </thead>
        {meals.map(({ meal, entries }, index) => (
          <tbody key={index} className="border-t border-muted/60">
            {entries.map((entry, i) => {
              const { name, details } = describeItem(entry.item)
              return (
                <tr key={i} className={i ? "border-t border-line/60" : ""}>
                  <td className="py-2 pr-3 align-top">
                    {(i === 0 || entry.time !== entries[i - 1].time) && entry.time}
                    {i === 0 && (
                      <span className="block text-[11px] tracking-wide text-muted uppercase">
                        {label(meal)}
                      </span>
                    )}
                  </td>
                  <td className="py-2 pr-3 align-top" title={details}>
                    {name}
                    <span className="block text-xs text-muted sm:hidden">
                      <Macros of={entry} />
                    </span>
                  </td>
                  <td className="py-2 pl-4 align-top">
                    <span className="block text-right">{kcal(entry.kcal)}</span>
                    <span className="mt-1.5 block h-1 rounded-full bg-track">
                      <span
                        className="block h-full rounded-full bg-muted"
                        style={{ width: share(entry.kcal) }}
                      />
                    </span>
                  </td>
                  <td className={`${column} py-2 text-muted`}>{grams(entry.protein)} g</td>
                  <td className={`${column} py-2 text-muted`}>{grams(entry.carbs)} g</td>
                  <td className={`${column} py-2 text-muted`}>{grams(entry.fat)} g</td>
                  <td className={`${column} py-2 text-muted`}>
                    {entry.fiber === null ? "–" : `${grams(entry.fiber)} g`}
                  </td>
                </tr>
              )
            })}
          </tbody>
        ))}
        <tfoot>
          <tr className="border-t border-muted/60 font-medium">
            <td colSpan={2} className="pt-4">
              Total
              <span className="block text-xs font-normal text-muted sm:hidden">
                <Macros of={totals} />
              </span>
            </td>
            <td className="pt-4 pl-4 text-right align-top">{kcal(totals.kcal)}</td>
            <td className={`${column} pt-4`}>{grams(totals.protein)} g</td>
            <td className={`${column} pt-4`}>{grams(totals.carbs)} g</td>
            <td className={`${column} pt-4`}>{grams(totals.fat)} g</td>
            <td className={`${column} pt-4`}>{grams(totals.fiber)} g</td>
          </tr>
        </tfoot>
      </table>
    </section>
  )
}
