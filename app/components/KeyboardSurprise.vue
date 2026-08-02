<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core'

const isOpen = ref(false)
const message = ref('')
const sequence = [109, 97, 114, 105, 97, 103, 101].map(code =>
  String.fromCharCode(code),
)

let sequenceIndex = 0

function decode(encoded: string) {
  const bytes = Uint8Array.from(atob(encoded), character =>
    character.charCodeAt(0))

  return new TextDecoder().decode(bytes)
}

function handleKeyStroke(event: KeyboardEvent) {
  const target = event.target as HTMLElement | null

  if (
    event.ctrlKey
    || event.metaKey
    || event.altKey
    || target?.closest('input, textarea, select, [contenteditable="true"]')
  ) {
    sequenceIndex = 0
    return
  }

  const key = event.key.toLowerCase()

  sequenceIndex
    = key === sequence[sequenceIndex]
      ? sequenceIndex + 1
      : key === sequence[0]
        ? 1
        : 0

  if (sequenceIndex !== sequence.length)
    return

  message.value = decode('SmVhbi1Ob8OrbCBtYXJpZSBMw6lhIHBhciBwaXRpw6k=')
  isOpen.value = true
  sequenceIndex = 0
}

onKeyStroke(handleKeyStroke, {
  dedupe: true,
  passive: true,
})
</script>

<template>
  <UModal
    v-model:open="isOpen"
    title="Easter egg"
    :ui="{ content: 'sm:max-w-md' }"
  >
    <template #body>
      <div class="flex items-center gap-4">
        <div
          class="flex size-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800"
        >
          <UIcon
            name="i-lucide-cake"
            class="size-5 text-neutral-600 dark:text-neutral-300"
          />
        </div>
        <p class="text-neutral-700 dark:text-neutral-200">
          {{ message }}
        </p>
      </div>
    </template>
  </UModal>
</template>
