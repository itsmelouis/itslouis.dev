<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'

const route = useRoute()
const { y: scroll } = useWindowScroll()

const breadcrumb = computed(() => {
  if (route.path === '/')
    return ''
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
  <header class="z-40">
    <div class="absolute xl:fixed m-5 flex items-center gap-3">
      <NuxtLink
        to="/"
        aria-label="Home"
        class="w-12 h-12 select-none outline-none hover:-rotate-12 transition-transform"
      >
        <img src="/logo-light.svg" alt="Louis logo" class="w-full h-full object-contain rounded-lg border border-neutral-300 dark:border-transparent">
      </NuxtLink>
      <span v-if="breadcrumb" class="text-sm font-mono text-neutral-400 dark:text-neutral-500">
        {{ breadcrumb }}
      </span>
    </div>

    <button
      title="Scroll to top"
      class="fixed right-3 bottom-3 flex items-center justify-center w-10 h-10 rounded-full transition-opacity duration-300 z-100 print:hidden hover:bg-neutral-500/20 cursor-pointer"
      :class="scroll > 300 ? 'opacity-30 hover:opacity-100' : 'opacity-0 pointer-events-none'"
      @click="toTop()"
    >
      <UIcon name="i-lucide-arrow-up" class="w-5 h-5" />
    </button>

    <nav class="w-full p-8 grid grid-cols-[auto_max-content]">
      <div />
      <div class="flex items-center gap-5 print:opacity-0">
        <NuxtLink
          to="#"
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
          to="https://github.com/itsmelouis"
          external
          target="_blank"
          title="GitHub"
          class="hidden md:flex items-center opacity-60 hover:opacity-100 transition-opacity duration-200 outline-none"
        >
          <UIcon name="i-simple-icons-github" />
        </NuxtLink>
        <ThemeToggle />
      </div>
    </nav>
  </header>
</template>
