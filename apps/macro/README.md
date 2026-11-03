# Macro

Alexandru's nutrition dashboard: daily calories, protein and fiber against targets, the
meals behind them, the morning-weight trend, and the energy balance of eating against
burning. The logs live in this repository as three CSV files, and they're public, as is
this repository's history.

## Stack

TanStack Start, Router and Query; React; Tailwind CSS with system light/dark mode; a
Cloudflare Worker. No database: `content/` is validated at build time and bundled into
the Worker. Pages are server-rendered on each request; changes to the logs reach the
site by deploying.

## Data

All three files are UTF-8 CSV with the exact header shown, one row per line, appended in any
order (rows are sorted by date and time when loaded). `date` is `YYYY-MM-DD` and `time`
is 24-hour `HH:MM`, both America/Los_Angeles wall-clock time. Numbers are plain
non-negative decimals with a `.` and no units or thousands separators. Quote a field
with `"` if it contains a comma, a quote (doubled, `""`) or a newline; `&` and `'` need
no quoting.

### `content/meals.csv`

One row per food item.

```csv
date,time,meal,item,kcal,protein_g,carbs_g,fat_g,fiber_g
2026-10-08,10:04,breakfast,Strawberries 180g,58,1.2,13.8,0.5,3.6
2026-10-08,13:55,lunch,CookUnity Pink Sauce Rigatoni with Chicken 422g,870,61,60,40,
2026-10-10,12:30,lunch,Half CookUnity Mom's Sunday Sauce Rigatoni w/ fennel sausage & meatballs (211g),395,22.5,34,17.5,2
2026-10-13,11:07,snack,"Strawberries, raspberries",30,0.6,7,0.3,2
```

- `meal` is one of `breakfast`, `lunch`, `dinner`, `dessert`, `snack`, `post-workout`.
  Consecutive rows of the same meal show as one card. The last example row shows the
  quoting a comma needs.
- `fiber_g` may be left blank when unknown. It counts as 0 in the day's total, and the
  page notes how many items had none logged. Every other column is required.

### `content/weigh-ins.csv`

One row per morning reading, in kilograms.

```csv
date,time,kg
2026-10-07,08:54,53.43
2026-10-08,09:07,53.25
```

Only the morning reading is logged, taken after a shower and before breakfast, at the
time the scale recorded it. It comes from the Fitdays scale through Apple Health. The
first reading before 12:00 is the day's morning weight, the one charted and averaged;
afternoon and evening readings aren't logged. To discard a mis-weigh, delete its row
rather than adding a second morning reading after it.

### `content/energy.csv`

One row per finished day: the energy Apple Watch reports to Apple Health as burned, in
kilocalories, rounded to whole numbers. `resting_kcal` is resting (basal) energy and
`active_kcal` is active energy; the day's burn is their sum.

```csv
date,resting_kcal,active_kcal
2026-10-13,1570,716
2026-10-14,1576,593
```

A date appears at most once. A day still in progress isn't logged, so today shows no
balance until tomorrow.

### Validation

`src/content/` parses every file whenever the site builds, the dev server loads them, or
the tests run, and exposes the rows as `virtual:macro-content` (server only). A wrong
header, a malformed or impossible date, an unknown meal, a missing or non-numeric
amount, a wrong number of fields, or a date logged twice in `energy.csv` fails with every
problem listed as
`content/<file>:<line>: <column>: <problem>`, so a broken log never deploys.

## Targets and settings

`src/config.ts` holds the targets (2,500 kcal, 110 g protein, 20 g fiber a day), the
time zone, the morning cutoff, the rolling-average window (7 calendar days), and how
many days and weeks the dashboard shows.

- The rolling average for a morning is the mean of the morning readings in the 7
  calendar days ending on it, so a missed weigh-in shortens the window instead of
  reaching further back.
- Weekly averages run Monday to Sunday. Food averages are over the days with anything
  logged; a day with nothing logged is treated as missing, not as zero.
- The energy balance is eaten minus burned for each day with both logged: positive is a
  surplus, negative a deficit. Its averages, and the weekly Burned and Balance columns,
  cover only the days with the numbers they need.
- The dashboard's "Today" is the latest logged day; it's labeled Today or Yesterday when
  it is one in Los Angeles.

## Layout

- `content/`: the three CSV logs.
- `src/config.ts`: targets and dashboard settings.
- `src/content/`: the CSV parser, row validation, and the Vite plugin behind
  `virtual:macro-content`.
- `src/lib/`: daily totals, meal grouping, morning weights, energy balance, rolling and
  weekly averages, and formatting, shared by server and browser.
- `src/read/`: the server functions and query options.
- `src/components/` and `src/routes/`: the dashboard (`/`) and day pages (`/days/<date>`).

## Local Development

From the repository root:

```sh
bun install
cd apps/macro
bun run dev
```

The dev server reloads when anything under `content/` changes.

## Cloudflare Deployment

Resources in account `630f294bcb2c1e9b751d9fe0655a453a` (851):

- Worker name: `alexandru-macro`
- Public origin: `https://macro.alexandru.so`

Pushing to `main` deploys automatically once the Worker is connected to this repository
through Cloudflare Workers Builds, which runs
`bun run typecheck && bun run test && bun run build` and then `npx wrangler deploy` from
`apps/macro` when a push touches `apps/macro/*` or `bun.lock`. `bun run deploy`
deploys manually through an authorized Wrangler login.

The Workers Custom Domain is declared in `wrangler.jsonc`; deploying configures its DNS
record and TLS certificate through Cloudflare. Both `workers_dev` and `preview_urls`
remain disabled. Regenerate Worker types with `bun run cf-typegen` after changing
`wrangler.jsonc`.

## Checks

`bun run test` in this directory runs the unit tests, colocated as `*.test.ts`: CSV
parsing, row validation, daily totals, meal grouping, morning weights, energy balance,
rolling and weekly averages, and a load of every file in `content/`. `bun run check` at the
repository root runs formatting, lint and type checks, then every workspace's tests and
builds.
