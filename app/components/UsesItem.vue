<script setup lang="ts">
import type { UsesItem } from '~/composables/useUses'

defineProps<{
  item: UsesItem
}>()

const NuxtLink = resolveComponent('NuxtLink')
</script>

<template>
  <component
    :is="item.to ? NuxtLink : 'div'"
    v-bind="item.to ? { to: item.to, external: true, target: '_blank', rel: 'noopener noreferrer' } : {}"
    class="group flex items-center gap-3 py-2.5 no-underline"
  >
    <UIcon
      :name="item.icon"
      class="w-4 h-4 shrink-0 opacity-50 transition-opacity"
      :class="item.to && 'group-hover:opacity-100'"
    />
    <div class="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 min-w-0">
      <span
        class="font-mono text-sm text-neutral-900 dark:text-neutral-100 underline-offset-4"
        :class="item.to && 'group-hover:underline'"
      >
        {{ item.name }}
      </span>
      <span v-if="item.note" class="text-sm text-neutral-500 dark:text-neutral-400">
        {{ item.note }}
      </span>
    </div>
    <UIcon
      v-if="item.to"
      name="i-lucide-arrow-up-right"
      class="ml-auto w-3.5 h-3.5 shrink-0 opacity-0 -translate-x-1 transition-all group-hover:opacity-40 group-hover:translate-x-0"
    />
  </component>
</template>
