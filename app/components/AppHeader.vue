<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'

const route = useRoute()
const { y: scroll } = useWindowScroll()

const breadcrumb = computed(() => {
  if (route.path === '/')
    return '~/'
  return `~${route.path}`
})

function toTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <header class="z-40 xl:fixed w-full flex items-center justify-between px-5 py-4">
    <div class="flex items-center gap-3 min-w-0">
      <NuxtLink
        to="/"
        aria-label="Home"
        class="w-12 h-12 shrink-0 select-none outline-none hover:-rotate-12 transition-transform"
      >
        <img src="/logo-light.svg" alt="Louis logo" class="w-full h-full object-contain rounded-lg border border-neutral-300 dark:border-transparent">
      </NuxtLink>
      <span v-if="breadcrumb" class="text-sm font-mono text-neutral-400 dark:text-neutral-500 select-none truncate max-w-[38vw] sm:max-w-none">
        {{ breadcrumb }}
      </span>
    </div>

    <nav aria-label="Main navigation" class="flex items-center gap-5 shrink-0 print:opacity-0">
      <NuxtLink
        to="/blog"
        title="Blog"
        class="flex items-center opacity-60 hover:opacity-100 transition-opacity duration-200 outline-none"
      >
        <span class="hidden md:inline">Blog</span>
        <UIcon name="i-lucide-file-text" class="md:hidden" />
      </NuxtLink>
      <NuxtLink
        to="/projects"
        title="Projects"
        class="flex items-center opacity-60 hover:opacity-100 transition-opacity duration-200 outline-none"
      >
        <span class="hidden md:inline">Projects</span>
        <UIcon name="i-lucide-lightbulb" class="md:hidden" />
      </NuxtLink>
      <NuxtLink
        to="/uses"
        title="Uses"
        class="flex items-center opacity-60 hover:opacity-100 transition-opacity duration-200 outline-none"
      >
        <span class="hidden md:inline">Uses</span>
        <UIcon name="i-lucide-wrench" class="md:hidden" />
      </NuxtLink>
      <NuxtLink
        to="https://github.com/itsmelouis"
        external
        target="_blank"
        title="GitHub"
        class="hidden md:flex items-center opacity-60 hover:opacity-100 transition-opacity duration-200 outline-none"
      >
        <UIcon name="i-simple-icons-github" />
      </NuxtLink>
      <NuxtLink
        to="https://x.com/itsmelouisdev"
        external
        target="_blank"
        title="X (twitter)"
        class="hidden md:flex items-center opacity-60 hover:opacity-100 transition-opacity duration-200 outline-none"
      >
        <UIcon name="i-simple-icons-x" />
      </NuxtLink>
      <ThemeToggle />
    </nav>
  </header>

  <UButton
    icon="i-lucide-arrow-up"
    color="neutral"
    variant="ghost"
    title="Scroll to top"
    class="fixed right-3 bottom-3 z-100 print:hidden transition-opacity duration-300"
    :class="scroll > 300 ? 'opacity-30 hover:opacity-100' : 'opacity-0 pointer-events-none'"
    @click="toTop()"
  />
</template>
