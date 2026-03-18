<script setup lang="ts">
import type { GitHubRepo } from '~/composables/useGitHub'

useHead({
  title: 'Projects',
})

const username = 'itsmelouis'
const { data: allRepos, status } = useGitHub(username)

const schoolRepoNames = [
  'kiosko',
  'forum-anonyme',
  'cinebox',
  'my-chatgpt',
  'planifio',
  'mais_the_eau',
  'Etheria',
  'artifacts',
]

const meRepoNames = [
  'itslouis.dev',
  'matrix-bun',
  'lb-prestacar',
]

function filterRepos(repos: GitHubRepo[], names: string[]) {
  const lowered = names.map(n => n.toLowerCase())
  return lowered
    .map(name => repos.find(r => r.name.toLowerCase() === name))
    .filter((r): r is GitHubRepo => !!r)
}

const categories = computed(() => {
  if (!allRepos.value)
    return []

  return [
    {
      name: 'Louis',
      slug: 'louis',
      repos: filterRepos(allRepos.value, meRepoNames),
    },
    {
      name: 'School',
      slug: 'school',
      repos: filterRepos(allRepos.value, schoolRepoNames),
    },
  ]
})

function slugify(name: string) {
  return name.toLowerCase().replace(/[\s/]+/g, '-')
}
</script>

<template>
  <section class="slide-enter-content max-w-3xl space-y-6 m-auto">
    <h1 class="text-4xl sm:text-5xl font-semibold tracking-tight">
      Projects
    </h1>
    <p class="text-lg text-neutral-600 dark:text-neutral-300">
      List of projects that I'm working on or have contributed to.
    </p>

    <div>
      <div v-if="status === 'pending'" class="flex items-center gap-2 py-8 text-neutral-400">
        <UIcon name="i-lucide-loader-2" class="w-4 h-4 animate-spin" />
        <span class="text-sm">Loading projects...</span>
      </div>

      <div v-else-if="status === 'error'" class="py-8 text-sm text-red-500">
        Failed to load projects. Please try again later.
      </div>

      <div v-else-if="categories.length" class="space-y-12">
        <div
          v-for="category in categories"
          :id="slugify(category.name)"
          :key="category.slug"
          class="relative"
        >
          <div class="relative mb-2 select-none pointer-events-none">
            <span class="text-[3.5em] font-bold leading-[1em] text-transparent [-webkit-text-stroke:1.5px_#aaa] opacity-35 dark:opacity-20">
              {{ category.name }}
            </span>
          </div>
          <div class="divide-y divide-neutral-200 dark:divide-neutral-800">
            <ProjectCard
              v-for="repo in category.repos"
              :key="repo.id"
              :repo="repo"
              :owner="username"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
