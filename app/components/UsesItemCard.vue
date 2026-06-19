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
    class="group flex items-start gap-3 rounded-lg border border-neutral-200 dark:border-neutral-800 p-3 no-underline transition-all hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
  >
    <span class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-neutral-100 dark:bg-neutral-800/80 transition-colors group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700/80">
      <UIcon :name="item.icon" class="h-4 w-4 opacity-60 transition-opacity group-hover:opacity-100" />
    </span>
    <div class="min-w-0 flex-1">
      <div class="flex items-center gap-2">
        <span v-if="item.label" class="font-mono text-[10px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
          {{ item.label }}
        </span>
        <UIcon
          v-if="item.to"
          name="i-lucide-arrow-up-right"
          class="ml-auto h-3.5 w-3.5 shrink-0 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-40"
        />
      </div>
      <p
        class="truncate font-mono text-sm text-neutral-900 dark:text-neutral-100 underline-offset-4"
        :class="item.to && 'group-hover:underline'"
      >
        {{ item.name }}
      </p>
      <p v-if="item.note" class="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
        {{ item.note }}
      </p>
    </div>
  </component>
</template>
