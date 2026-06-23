<script setup lang="ts">
import PartySocket from 'partysocket'

const config = useRuntimeConfig()
const count = ref<number | null>(null)

if (import.meta.client) {
  let socket: PartySocket | undefined

  onNuxtReady(() => {
    socket = new PartySocket({
      host: import.meta.dev ? 'localhost:8787' : config.public.partyHost,
      party: 'presence',
      room: 'site',
    })

    socket.onmessage = (event) => {
      const [type, value] = String(event.data).split(':')
      if (type === 'connections' && value)
        count.value = Number.parseInt(value, 10)
    }
  })

  // Tidy up the socket across SPA navigation and keep-alive lifecycle.
  onBeforeUnmount(() => socket?.close())
  onDeactivated(() => socket?.close())
  onActivated(() => socket?.reconnect())
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-300 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-2"
  >
    <aside
      v-if="count !== null"
      :aria-label="`${count} ${count === 1 ? 'viewer' : 'viewers'} on this site right now`"
      class="group hidden lg:flex fixed bottom-3 right-14 z-40 items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100/80 dark:bg-neutral-900/80 backdrop-blur-sm px-3 py-1.5 shadow-lg select-none transition-all duration-300 hover:border-emerald-500 hover:shadow-[0_0_10px_rgba(16,185,129,0.7)]"
    >
      <span class="relative flex size-2 shrink-0">
        <span class="absolute inset-0 rounded-full bg-emerald-500 opacity-75 motion-safe:animate-ping group-hover:bg-emerald-700" />
        <span class="relative block size-2 rounded-full bg-emerald-500 transition-colors duration-300 group-hover:bg-emerald-700" />
      </span>
      <span class="font-mono text-xs uppercase tracking-wider tabular-nums text-neutral-500 dark:text-neutral-400">
        {{ count }} online
      </span>
    </aside>
  </Transition>
</template>
