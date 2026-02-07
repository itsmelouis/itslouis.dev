export interface GitHubRepo {
  id: number
  name: string
  description: string
  stars: number
  forks: number
  watchers: number
  defaultBranch: string
  createdAt: string
  updatedAt: string
  pushedAt: string
}

interface UnghReposResponse {
  repos: GitHubRepo[]
}

export function useGitHub(username: string) {
  return useAsyncData(
    `github-repos-${username}`,
    () => $fetch<UnghReposResponse>(`https://ungh.cc/users/${username}/repos`),
    {
      transform: data => data.repos,
    },
  )
}

export function useGitHubRepo(owner: string, repo: string) {
  return useAsyncData(
    `github-repo-${owner}-${repo}`,
    () => $fetch<{ repo: GitHubRepo }>(`https://ungh.cc/repos/${owner}/${repo}`),
    {
      transform: data => data.repo,
    },
  )
}
