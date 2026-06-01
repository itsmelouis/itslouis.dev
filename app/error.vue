<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()

useSeoMeta({
  title: 'Error',
  description: 'An error occurred',
  ogSiteName: 'itslouis.dev',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterCreator: '@itsmelouisdev',
})

useHead({
  titleTemplate: '%s - Louis F.',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'author', content: 'Louis F.' },
  ],
  link: [
    { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', sizes: '32x32' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
    { rel: 'manifest', href: '/site.webmanifest' },
  ],
  htmlAttrs: {
    lang: 'en',
  },
})

function handleError() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="dot-background fixed inset-0 -z-10" />
  <UApp>
    <main class="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <div class="relative mb-2 select-none pointer-events-none">
        <span class="text-5xl sm:text-6xl font-bold font-mono leading-[1em] opacity-35 dark:opacity-20">
          {{ error.status }}
        </span>
      </div>
      <p class="text-lg sm:text-xl text-neutral-500 dark:text-neutral-400 font-mono">
        {{ error.status === 404 ? 'Oops, nothing here. Maybe the page went on vacation.' : 'Well, that wasn\'t supposed to happen.' }}
      </p>
      <UButton
        size="xl"
        color="neutral"
        variant="ghost"
        label="Take me back"
        icon="i-lucide-arrow-left"
        class="mt-8 font-mono"
        @click="handleError"
      />
    </main>
  </UApp>
</template>
