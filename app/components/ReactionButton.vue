<script setup lang="ts">
const props = defineProps<{ count: number | null, reacted: boolean }>()
defineEmits<{ toggle: [] }>()

const label = computed(() => {
  if (props.count === null)
    return 'Loading reactions'
  const people = `${props.count} ${props.count === 1 ? 'person likes' : 'people like'} this post`
  return props.reacted ? `Remove your thumbs up. ${people}` : `Give a thumbs up. ${people}`
})
</script>

<template>
  <button
    type="button"
    :aria-pressed="reacted"
    :aria-label="label"
    :disabled="count === null"
    class="group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-sm tabular-nums transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500 disabled:cursor-wait disabled:opacity-60"
    :class="reacted
      ? 'border-neutral-400 dark:border-neutral-500 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100'
      : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400 dark:hover:border-neutral-600'"
    @click="$emit('toggle')"
  >
    <span
      aria-hidden="true"
      class="inline-block transition-transform duration-200 motion-safe:group-active:scale-125"
      :class="reacted ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'"
    >👍</span>
    <span aria-hidden="true" class="min-w-[2ch] text-left">
      {{ count ?? '–' }}
    </span>
  </button>
</template>
