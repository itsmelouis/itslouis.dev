<script setup lang="ts">
const { spotify } = useLanyard()

const trackUrl = computed(() =>
  spotify.value ? `https://open.spotify.com/track/${spotify.value.track_id}` : '#',
)
</script>

<template>
  <ClientOnly>
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-2"
    >
      <div
        v-if="spotify"
        class="hidden lg:block fixed bottom-5 left-5 z-50"
      >
        <UTooltip
          text="Currently Looping"
          :delay-duration="0"
          :content="{ side: 'top' }"
        >
          <div
            class="flex items-center gap-3 max-w-xs rounded-xl bg-neutral-100/80 dark:bg-neutral-900/80 backdrop-blur-sm p-3 shadow-lg"
          >
            <NuxtLink
              :to="trackUrl"
              external
              target="_blank"
              class="shrink-0"
            >
              <img
                :src="spotify.album_art_url"
                :alt="spotify.album"
                width="48"
                height="48"
                class="w-12 h-12 rounded-md"
              >
            </NuxtLink>
            <div class="min-w-0">
              <NuxtLink
                :to="trackUrl"
                external
                target="_blank"
                class="block truncate text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:underline"
              >
                {{ spotify.song }}
              </NuxtLink>
              <span class="block truncate text-xs text-neutral-500 dark:text-neutral-400">
                {{ spotify.artist }}
              </span>
            </div>
            <span class="relative shrink-0 self-center size-2.5">
              <span class="absolute inset-0 rounded-full bg-red-700 animate-ping opacity-75" />
              <span class="relative block size-2.5 rounded-full bg-red-700" />
            </span>
          </div>
        </UTooltip>
      </div>
    </Transition>
  </ClientOnly>
</template>
