<script setup lang="ts">
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl

const description = 'Software Engineer & AI Automation at Ponera. I digitize and automate business processes with AI, and build fast, clean interfaces with Nuxt and Vue, backed by .NET and PHP.'

useSeoMeta({
  title: 'Louis F. - Software Engineer & AI Automation',
  description,
  ogTitle: 'Louis F. - Software Engineer & AI Automation',
  ogDescription: description,
  ogUrl: siteUrl,
  twitterTitle: 'Louis F. - Software Engineer & AI Automation',
  twitterDescription: description,
})

useHead({
  titleTemplate: '',
  link: [
    { rel: 'canonical', href: siteUrl },
  ],
  meta: [
    { name: 'keywords', content: 'Louis Floquet, Software Engineer, Ponera, AI automation, Nuxt, Vue, .NET, PHP, itslouis.dev' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        'name': 'Louis Floquet',
        'alternateName': 'Louis F.',
        'url': siteUrl,
        'jobTitle': 'Software Engineer & AI Automation',
        'worksFor': {
          '@type': 'Organization',
          'name': 'Ponera',
          'url': 'https://ponera.com',
        },
        'sameAs': [
          'https://github.com/itsmelouis',
        ],
      }),
    },
  ],
})
</script>

<template>
  <section class="slide-enter-content max-w-3xl space-y-6 m-auto">
    <h1 class="text-4xl sm:text-5xl font-semibold tracking-tight">
      Hey, I'm Louis F.
    </h1>
    <p class="text-lg text-neutral-600 dark:text-neutral-300">
      Software Engineer & AI Automation at
      <!-- eslint-disable-next-line vue/singleline-html-element-content-newline -->
      <AppLink to="https://ponera.com" target="_blank">Ponera</AppLink>. I'm an internal forward-deployed engineer:
      I sit with each team, digitize their processes and automate as much as possible with AI, including clusters
      of OpenClaw agents.
    </p>
    <p class="text-lg text-neutral-600 dark:text-neutral-300">
      I work across the stack, but frontend is where I'm most at home. Nuxt and Vue are my daily drivers, and I reach
      for .NET or PHP when the problem calls for it.
    </p>
    <p class="text-lg text-neutral-600 dark:text-neutral-300">
      I care about the details. Clean APIs, fast interfaces, code that doesn't need a comment to explain itself.
      The kind of work that feels obvious once it's done but takes real thought to get there.
    </p>
    <p class="text-lg text-neutral-600 dark:text-neutral-300">
      I've shipped projects across web, edge computing, and tooling; most of it lives on my GitHub. Right now I'm
      especially proud of a school project called Sportly, a Nuxt app that helps people fight sedentary habits by
      surfacing sport events and clubs near them.
    </p>
    <p class="text-lg text-neutral-600 dark:text-neutral-300">
      When I'm not at the keyboard, I'm watching films or digging through music. Broad tastes, strong opinions.
    </p>
    <p class="text-lg text-neutral-600 dark:text-neutral-300">
      Want to build something together? Reach me at
      <AppLink to="mailto:me@itslouis.dev?subject=itslouis.dev%20%7C%20">
        <span class="inline-flex items-center">me<UIcon name="i-carbon-at" class="align-[-0.2em]" />itslouis.dev</span>
      </AppLink>
      and we'll figure it out.
    </p>
  </section>
</template>
