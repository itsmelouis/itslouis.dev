<script setup lang="ts">
import type { GitHubRepo } from '~/composables/useGitHub'

defineProps<{
  repo: GitHubRepo
  owner: string
}>()
</script>

<template>
  <NuxtLink
    :to="`https://github.com/${owner}/${repo.name}`"
    external
    target="_blank"
    class="group flex items-start gap-3 py-2 no-underline"
  >
    <UIcon
      name="i-lucide-box"
      class="mt-1 w-4 h-4 shrink-0 opacity-50 group-hover:opacity-100 transition-opacity"
    />
    <div class="flex flex-col gap-0.5">
      <div class="flex items-center gap-2">
        <span class="font-mono text-sm text-neutral-900 dark:text-neutral-100 group-hover:underline underline-offset-4">
          {{ repo.name }}
        </span>
        <span
          v-if="repo.stars > 0"
          class="inline-flex items-center gap-0.5 text-xs text-neutral-400 dark:text-neutral-500"
        >
          <UIcon name="i-lucide-star" class="w-3 h-3" />
          {{ repo.stars }}
        </span>
        <span
          v-if="repo.forks > 0"
          class="inline-flex items-center gap-0.5 text-xs text-neutral-400 dark:text-neutral-500"
        >
          <UIcon name="i-lucide-git-fork" class="w-3 h-3" />
          {{ repo.forks }}
        </span>
      </div>
      <span v-if="repo.description" class="text-sm text-neutral-500 dark:text-neutral-400">
        {{ repo.description }}
      </span>
    </div>
  </NuxtLink>
</template>
