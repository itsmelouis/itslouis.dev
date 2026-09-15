<script setup lang="ts">
defineProps<{
  title: string
  tags?: string[]
  date?: string
}>()
</script>

<template>
  <div class="flex flex-col w-full h-full px-20 py-16 font-sans bg-graphite-950 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:24px_24px]">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="font-mono text-sm tracking-widest text-graphite-600">
        itslouis.dev
      </div>
      <img src="/favicon.svg" class="w-10 h-10 opacity-30 rounded-md" alt="">
    </div>

    <!-- Title -->
    <div class="flex flex-col justify-center flex-1 py-8">
      <div class="text-[52px] font-semibold text-graphite-50 leading-tight tracking-tight max-w-[880px]">
        {{ title }}
      </div>

      <!-- Tags -->
      <div v-if="tags?.length" class="flex flex-wrap gap-2.5 mt-9">
        <span
          v-for="tag in tags"
          :key="tag"
          class="font-mono text-xs text-graphite-500 bg-graphite-900 [border-width:1px] border-solid border-graphite-800 rounded px-2.5 py-1 tracking-wide"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <!-- Date -->
    <div v-if="date" class="font-mono text-sm text-graphite-700">
      {{ date.slice(0, 10) }}
    </div>
  </div>
</template>
