<script setup lang="ts">
const route = useRoute()

const { data: post } = await useAsyncData(route.path, () =>
  queryCollection('blog').path(route.path).first())

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

useHead({
  title: post.value.title,
})

const toc = computed(() => post.value?.body?.toc?.links ?? [])

const readingTime = computed(() => {
  if (!post.value?.body)
    return 1
  const text = JSON.stringify(post.value.body)
  const words = text.split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
})

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}
</script>

<template>
  <div class="slide-enter-content max-w-4xl m-auto px-4">
    <NuxtLink
      to="/blog"
      class="inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-neutral-200 transition-colors mb-8"
    >
      <UIcon name="i-lucide-arrow-left" class="w-3.5 h-3.5" />
      Blog
    </NuxtLink>

    <div class="mt-2 mb-10">
      <h1 class="text-3xl sm:text-4xl font-semibold tracking-tight">
        {{ post!.title }}
      </h1>
      <div class="flex flex-wrap items-center gap-3 mt-3 text-sm text-neutral-500">
        <span class="font-mono">{{ formatDate(post!.date) }}</span>
        <span class="font-mono text-neutral-400">~{{ readingTime }} min read</span>
        <span
          v-for="tag in post!.tags"
          :key="tag"
          class="px-1.5 py-0.5 text-xs font-mono rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <div class="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
      <article class="prose prose-neutral dark:prose-invert max-w-none prose-code:font-mono prose-code:text-sm prose-pre:rounded-lg prose-pre:border prose-pre:border-neutral-200 dark:prose-pre:border-neutral-800">
        <ContentRenderer :value="post!" />
      </article>

      <aside v-if="toc.length" class="hidden lg:block">
        <UContentToc
          :links="toc"
          title="On this page"
          highlight
          highlight-color="neutral"
          :ui="{
            root: 'sticky top-28 overflow-y-auto bg-transparent! backdrop-blur-none!',
            container: 'flex flex-col gap-2 lg:py-0 lg:border-0',
            title: 'text-xs font-mono uppercase tracking-widest text-neutral-500',
            content: 'ms-0',
            list: 'ms-2.5 ps-4 border-l border-neutral-200 dark:border-neutral-800',
            link: 'text-xs font-mono text-neutral-500 hover:text-neutral-200 dark:hover:text-neutral-200 transition-colors',
            linkText: 'whitespace-normal leading-snug',
            indicator: 'absolute ms-2.5 transition-[translate,height] duration-200 h-(--indicator-size) translate-y-(--indicator-position) w-px',
            indicatorActive: 'bg-neutral-400 w-full h-full',
          }"
        />
      </aside>
    </div>
  </div>
</template>
