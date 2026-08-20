<script setup lang="ts">
const description
  = 'A curated selection of things I have built across the web, the edge, and the terminal.'

const { data: projects } = await useAsyncData('projects', () =>
  queryCollection('projects').order('order', 'ASC').all())

useSeoMeta({
  title: 'Projects',
  description,
  ogTitle: 'Projects - Louis F.',
  ogDescription: description,
  twitterTitle: 'Projects - Louis F.',
  twitterDescription: description,
})

function formatIndex(index: number) {
  return String(index + 1).padStart(2, '0')
}

function getRepositoryPath(url: string) {
  return new URL(url).pathname.slice(1)
}
</script>

<template>
  <section class="slide-enter-content max-w-5xl m-auto">
    <header class="max-w-3xl space-y-6">
      <h1 class="text-4xl sm:text-5xl font-semibold tracking-tight">
        Projects
      </h1>
      <p class="text-lg text-neutral-600 dark:text-neutral-300">
        A curated selection of things I've built across the web, the edge, and
        the terminal. Each project links directly to its source on GitHub.
      </p>
      <AppLink to="https://github.com/itsmelouis" target="_blank">
        <span class="inline-flex items-center gap-1.5">
          View all projects
          <UIcon name="i-lucide-arrow-up-right" class="size-4" />
        </span>
      </AppLink>
    </header>

    <ol class="mt-16 border-t border-neutral-200 dark:border-neutral-800">
      <li
        v-for="(project, index) in projects"
        :key="project.id"
        class="border-b border-neutral-200 dark:border-neutral-800"
      >
        <NuxtLink
          :to="project.url"
          external
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`View ${project.title} on GitHub (opens in a new tab)`"
          class="group grid gap-7 py-9 no-underline outline-none md:grid-cols-12 md:items-center md:gap-10 md:py-12 focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-neutral-100 focus-visible:ring-offset-8 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-950"
        >
          <div
            class="md:col-span-7"
            :class="index % 2 === 1 ? 'md:order-2' : 'md:order-1'"
          >
            <div
              class="relative flex aspect-8/5 flex-col overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100/80 shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lg motion-reduce:transition-none dark:border-neutral-800 dark:bg-neutral-900/80"
            >
              <div
                class="flex h-10 shrink-0 items-center gap-1.5 border-b border-neutral-200 px-4 dark:border-neutral-800"
                aria-hidden="true"
              >
                <span
                  class="size-2 rounded-full bg-neutral-300 dark:bg-neutral-700"
                />
                <span
                  class="size-2 rounded-full bg-neutral-300 dark:bg-neutral-700"
                />
                <span
                  class="size-2 rounded-full bg-neutral-300 dark:bg-neutral-700"
                />
                <span
                  class="ml-auto font-mono text-[10px] text-neutral-400 dark:text-neutral-600"
                >
                  {{ getRepositoryPath(project.url) }}
                </span>
              </div>

              <div class="relative min-h-0 flex-1 overflow-hidden">
                <img
                  v-if="project.image"
                  :src="project.image"
                  :alt="project.imageAlt || `Screenshot of ${project.title}`"
                  width="1600"
                  height="1000"
                  loading="lazy"
                  class="size-full object-cover object-top transition duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
                >

                <div
                  v-else
                  class="absolute inset-0 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <div
                    class="absolute inset-0 opacity-50 [background-image:linear-gradient(to_right,var(--color-neutral-200)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-neutral-200)_1px,transparent_1px)] [background-size:32px_32px] dark:opacity-20"
                  />
                  <UIcon
                    :name="project.icon"
                    class="relative size-16 text-neutral-400 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 motion-reduce:transition-none dark:text-neutral-600"
                  />
                </div>
              </div>
            </div>
          </div>

          <article
            class="flex flex-col md:col-span-5"
            :class="index % 2 === 1 ? 'md:order-1' : 'md:order-2'"
          >
            <div
              class="mb-4 flex items-center gap-3 font-mono text-xs text-neutral-400 dark:text-neutral-500"
            >
              <span>{{ formatIndex(index) }}</span>
              <span class="h-px w-8 bg-neutral-300 dark:bg-neutral-700" />
              <span>{{ project.year }}</span>
            </div>

            <h2
              class="text-2xl font-semibold tracking-tight text-neutral-900 transition-colors group-hover:text-neutral-600 dark:text-neutral-100 dark:group-hover:text-neutral-300 sm:text-3xl"
            >
              {{ project.title }}
            </h2>
            <p
              class="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-400 sm:text-base"
            >
              {{ project.description }}
            </p>

            <ul
              class="mt-5 flex flex-wrap gap-2"
              aria-label="Technologies used"
            >
              <li
                v-for="tag in project.tags"
                :key="tag"
                class="rounded-full border border-neutral-200 px-2.5 py-1 font-mono text-[11px] text-neutral-500 dark:border-neutral-800 dark:text-neutral-400"
              >
                {{ tag }}
              </li>
            </ul>

            <span
              class="mt-7 inline-flex items-center gap-2 text-sm font-medium text-neutral-900 dark:text-neutral-100"
            >
              <UIcon name="i-simple-icons-github" class="size-4" />
              View source
              <UIcon
                name="i-lucide-arrow-up-right"
                class="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
              />
            </span>
          </article>
        </NuxtLink>
      </li>
    </ol>
  </section>
</template>
