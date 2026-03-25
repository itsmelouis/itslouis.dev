<script setup lang="ts">
useSeoMeta({
  description: 'Software engineer finishing my master\'s degree. I build fast, clean interfaces with Nuxt and Vue, and backend systems with .NET.',
  ogSiteName: 'itslouis.dev',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterCreator: '@itsmelouis_',
})

useHead({
  title: 'Louis F.',
  titleTemplate: '%s | itslouis.dev',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'author', content: 'Louis F.' },
  ],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', sizes: '32x32' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
    { rel: 'manifest', href: '/site.webmanifest' },
  ],
  htmlAttrs: {
    lang: 'en',
  },
})
</script>

<template>
  <div class="dot-background fixed inset-0 -z-10" />
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
  <ClientOnly>
    <NuxtLoadingIndicator color="var(--loading-bar-color)" :height="3" :throttle="0" />
  </ClientOnly>
</template>
