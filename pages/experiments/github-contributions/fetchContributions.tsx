export interface IContributionWeek {
  color: string
  contributionCount: number
  contributionLevel: "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE"
}

export interface IContributionsCollection {
  data: {
    user: {
      contributionsCollection: {
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

export async function fetchContributions(username: string): Promise<IContributionsCollection> {
  const ghToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN ?? ""
  const headers = { Authorization: `bearer ${ghToken}` }

  const body = {
    query: `query {
        user(login: "${username}") {
          contributionsCollection {
            contributionCalendar {
              colors
              totalContributions
              weeks {
                contributionDays {
                  color
                  contributionCount
                  contributionLevel
                }
              }
            }
          }
        }
      }`,
  }
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify(body),
    headers: headers,
  })
  const data = (await response.json()) as IContributionsCollection

  return data
}
