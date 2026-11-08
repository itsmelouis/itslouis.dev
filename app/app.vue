<script setup lang="ts">
useSeoMeta({
  description: 'Software Engineer & AI Automation at Ponera. I digitize and automate business processes with AI, and build fast, clean interfaces with Nuxt and Vue, backed by .NET and PHP.',
  ogSiteName: 'itslouis.dev',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterCreator: '@itsmelouisdev',
})

useHead({
  title: 'Louis F.',
  titleTemplate: '%s - Louis F.',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'author', content: 'Louis F.' },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '96x96',
      href: '/favicon-96x96.png',
    },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
      sizes: '32x32',
    },
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
