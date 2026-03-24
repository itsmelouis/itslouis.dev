<script setup lang="ts">
useHead({
  title: 'Blog',
})

const { data: posts } = await useAsyncData('blog', () =>
  queryCollection('blog')
    .where('draft', '=', false)
    .order('date', 'DESC')
    .select('title', 'path', 'date', 'description', 'tags')
    .all())

const byYear = computed(() => {
  if (!posts.value)
    return []
  const groups: { year: number, posts: typeof posts.value }[] = []
  for (const post of posts.value) {
    const year = new Date(post.date).getFullYear()
    const group = groups.find(g => g.year === year)
    if (group) {
      group.posts.push(post)
    }
    else {
      groups.push({ year, posts: [post] })
    }
  }
  return groups
})

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
</script>

<template>
  <section class="slide-enter-content max-w-3xl space-y-6 m-auto">
    <h1 class="text-4xl sm:text-5xl font-semibold tracking-tight">
      Blog
    </h1>
    <p class="text-lg text-neutral-600 dark:text-neutral-300">
      Thoughts on the projects I'm building and the things I'm learning along the way.
    </p>

    <div
      v-for="group in byYear"
      :key="group.year"
      class="relative !mt-10"
    >
      <div class="relative mb-2 select-none pointer-events-none">
        <span class="text-[3.5em] font-bold leading-[1em] text-transparent [-webkit-text-stroke:1.5px_#aaa] opacity-35 dark:opacity-20">
          {{ group.year }}
        </span>
      </div>
      <div class="divide-y divide-neutral-200 dark:divide-neutral-800">
        <NuxtLink
          v-for="post in group.posts"
          :key="post.path"
          :to="post.path"
          class="flex items-start gap-4 py-3 hover:opacity-80 transition-opacity"
        >
          <div class="flex-1 min-w-0">
            <span class="font-mono text-sm">{{ post.title }}</span>
            <p v-if="post.description" class="text-xs text-neutral-500 mt-0.5 truncate">
              {{ post.description }}
            </p>
            <div v-if="post.tags?.length" class="flex flex-wrap gap-1 mt-1">
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="px-1.5 py-0.5 text-xs font-mono rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          <span class="text-xs text-neutral-400 font-mono shrink-0 mt-0.5">
            {{ formatDate(post.date) }}
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
