<script setup lang="ts">
const { toggleDark, isDark } = useThemeToggle()
</script>

<template>
  <ClientOnly>
    <UButton
      :icon="isDark ? 'i-lucide-sun' : 'i-lucide-moon'"
      color="neutral"
      variant="ghost"
      aria-label="Toggle Color Scheme"
      @click="toggleDark"
    />
  </ClientOnly>
</template>
