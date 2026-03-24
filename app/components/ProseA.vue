<script setup lang="ts">
defineProps<{
  href: string
  target?: string
}>()
</script>

<template>
  <AppLink :to="href" :external="!!target" :target="target">
    <slot />
  </AppLink>
</template>
