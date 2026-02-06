<script setup lang="ts">
useHead({
  title: 'Home',
})
</script>

<template>
  <SlidingEnter>
    <section class="max-w-3xl space-y-6 m-auto">
      <SlidingEnterItem as="h1" class="text-4xl sm:text-5xl font-semibold tracking-tight">
        Hey, I'm Louis F.
      </SlidingEnterItem>
      <SlidingEnterItem as="p" class="text-lg text-neutral-600 dark:text-neutral-300">
        I'm a software engineer intern at Altazion who's slightly obsessed with building the best tools in the world.
        I'm in love with modern frontend frameworks (Nuxt/Vue), and I still write C# professionally and personally for performance and bigger projects
        when it makes sense.
      </SlidingEnterItem>
      <SlidingEnterItem as="p" class="text-lg text-neutral-600 dark:text-neutral-300">
        Lately I've been hacking on movie-discovery apps — the IMDB/JustWatch/Rotten Tomatoes/Letterboxd kind of vibe —
        because I can't stop trying to make the perfect "what should I watch next?" experience.
      </SlidingEnterItem>
      <SlidingEnterItem as="p" class="text-lg text-neutral-600 dark:text-neutral-300">
        I wish to build the future of what developers want to have, but right now I'm proud of a school project called
        Sportly — a Nuxt web app that helps people fight sedentary habits by finding sport events and clubs nearby.
      </SlidingEnterItem>
      <SlidingEnterItem as="p" class="text-lg text-neutral-600 dark:text-neutral-300">
        Outside of code, I'm a music hoarder (literally everything), and I love cinema way too much.
      </SlidingEnterItem>
      <SlidingEnterItem as="p" class="text-lg text-neutral-600 dark:text-neutral-300">
        If you want to build something new together, hit me up at
        <AppLink to="mailto:me@itslouis.dev">
          <span class="inline-flex items-center">me<UIcon name="i-carbon-at" class="align-[-0.2em]" />itslouis.dev</span>
        </AppLink>
        and we'll talk it through.
      </SlidingEnterItem>
    </section>
  </SlidingEnter>
</template>
