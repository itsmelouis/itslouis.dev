<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const props = defineProps<{
  href: string
  target?: string
}>()

const isExternal = computed(() =>
  /^(?:https?:)?\/\//.test(props.href),
)

const resolvedTarget = computed(() =>
  props.target ?? (isExternal.value ? '_blank' : undefined),
)
</script>

<template>
  <AppLink :to="href" :target="resolvedTarget">
    <slot />
  </AppLink>
</template>
