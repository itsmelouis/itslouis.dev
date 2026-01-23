<script setup lang="ts">
import { Motion } from 'motion-v'

const props = withDefaults(defineProps<{
  as?: string
}>(), {
  as: 'div',
})

const getIndex = inject<() => number>('slidingEnterIndex', () => 0)
const index = getIndex()
const delay = index * 0.12
</script>

<template>
  <Motion
    :is="props.as"
    :initial="{ opacity: 0, y: 10 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.6, ease: 'easeOut', delay }"
  >
    <slot />
  </Motion>
</template>
