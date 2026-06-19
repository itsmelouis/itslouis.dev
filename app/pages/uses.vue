<script setup lang="ts">
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl

const description = 'The hardware, software, and tools I use every day to design and build things.'

useSeoMeta({
  title: 'Uses',
  description,
  ogTitle: 'Uses - Louis F.',
  ogDescription: description,
  ogUrl: `${siteUrl}/uses`,
  twitterTitle: 'Uses - Louis F.',
  twitterDescription: description,
})

useHead({
  link: [{ rel: 'canonical', href: `${siteUrl}/uses` }],
})

const categories = useUses()
</script>

<template>
  <section class="slide-enter-content max-w-3xl space-y-6 m-auto">
    <h1 class="text-4xl sm:text-5xl font-semibold tracking-tight">
      Uses
    </h1>
    <p class="text-lg text-neutral-600 dark:text-neutral-300">
      A living list of the hardware, software, and tools I reach for every day. Inspired by the
      <AppLink to="https://uses.tech" target="_blank">
        /uses
      </AppLink>
      movement.
    </p>

    <div class="space-y-12">
      <div
        v-for="category in categories"
        :id="category.slug"
        :key="category.slug"
        class="relative"
      >
        <div class="relative mb-2 select-none pointer-events-none">
          <span class="text-[3.5em] font-bold leading-[1em] text-transparent [-webkit-text-stroke:1.5px_#aaa] opacity-35 dark:opacity-20">
            {{ category.name }}
          </span>
        </div>
        <div
          v-if="category.layout === 'grid'"
          class="grid grid-cols-1 gap-3 sm:grid-cols-2"
        >
          <UsesItemCard
            v-for="item in category.items"
            :key="item.name"
            :item="item"
          />
        </div>
        <div v-else class="divide-y divide-neutral-200 dark:divide-neutral-800">
          <UsesItem
            v-for="item in category.items"
            :key="item.name"
            :item="item"
          />
        </div>
      </div>
    </div>
  </section>
</template>
