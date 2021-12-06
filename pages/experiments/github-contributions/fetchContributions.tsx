export interface IContributionWeek {
  color: string
  contributionCount: number
  contributionLevel: "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE"
  date: string
}

export interface IContributionsCollection {
  data: {
    user: {
      contributionsCollection: {
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

const api = "https://api.github.com/graphql"
const ghToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN ?? ""
const ghHeaders = { Authorization: `bearer ${ghToken}` }

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

  return data
}

export async function fetchAllContributions(username: string): Promise<IContributionsCollection[]> {
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

  const years = currentCollection.data.user.contributionsCollection.contributionYears
  // const promises: Promise<IContributionsCollection>[] = []
  for (let year of years) {
    const collection = fetchYearlyContributions(username, year)
    // promises.push(collection)
    collections.push(await collection)
  }

  // // const res = await Promise.all(promises)
  // const hello = Promise.all(promises)
  return collections
}
