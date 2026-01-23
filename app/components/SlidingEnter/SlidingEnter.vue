<script setup lang="ts">
const currentIndex = ref(0)

provide('slidingEnterIndex', () => currentIndex.value++)

onMounted(() => {
  currentIndex.value = 0
})
</script>

<template>
  <slot />
</template>
