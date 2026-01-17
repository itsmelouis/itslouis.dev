<script setup lang="ts">
const { toggleDark, isDark } = useThemeToggle()
</script>

<template>
  <UButton
    :icon="isDark ? 'i-lucide-sun' : 'i-lucide-moon'"
    color="neutral"
    variant="ghost"
    aria-label="Toggle Color Scheme"
    class="opacity-60 hover:opacity-100 transition-opacity duration-200"
    @click="toggleDark"
  />
</template>
