<script setup lang="ts">
const props = withDefaults(defineProps<{
  as?: string
}>(), {
  as: 'div',
})

const getIndex = inject<() => number>('slidingEnterIndex', () => 0)
const index = getIndex()
const delay = `${index * 120}ms`
</script>

<template>
  <component
    :is="props.as"
    class="sliding-enter-item"
    :style="{ animationDelay: delay }"
  >
    <slot />
  </component>
</template>

<style scoped>
.sliding-enter-item {
  opacity: 0;
  animation: slidingEnter 0.6s ease-out both;
}

@keyframes slidingEnter {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
