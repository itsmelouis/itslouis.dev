<script setup lang="ts">
defineProps<{
  to: string
  external?: boolean
}>()
</script>

<template>
  <NuxtLink
    :to="to"
    :external="external"
    class="app-link font-mono no-underline text-neutral-900 dark:text-neutral-100 bg-bottom bg-no-repeat transition-all duration-300 ease-in-out hover:text-neutral-100 dark:hover:text-neutral-900"
  >
    <slot />
  </NuxtLink>
</template>

<style scoped>
.app-link {
  background-image: linear-gradient(var(--color-neutral-800), var(--color-neutral-800));
  background-size: 100% 0%;
}

:root.dark .app-link {
  background-image: linear-gradient(var(--color-neutral-200), var(--color-neutral-200));
}

.app-link:hover {
  background-size: 100% 100%;
}
</style>
