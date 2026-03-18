<script setup lang="ts">
useHead({
  title: 'Home',
})
</script>

<template>
  <section class="slide-enter-content max-w-3xl space-y-6 m-auto">
    <h1 class="text-4xl sm:text-5xl font-semibold tracking-tight">
      Hey, I'm Louis F.
    </h1>
    <p class="text-lg text-neutral-600 dark:text-neutral-300">
      Software engineer finishing my master's degree, currently interning at Altazion where I build e-commerce and retail
      tech, mostly in C#/.NET. I work across the stack, but frontend is where I'm most at home. Nuxt and Vue are my
      daily drivers, and I reach for .NET when the problem calls for it.
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
      <AppLink to="mailto:me@itslouis.dev">
        <span class="inline-flex items-center">me<UIcon name="i-carbon-at" class="align-[-0.2em]" />itslouis.dev</span>
      </AppLink>
      and we'll figure it out.
    </p>
  </section>
</template>
