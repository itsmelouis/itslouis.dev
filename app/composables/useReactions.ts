const VISITOR_KEY = 'reactions:visitor'

function readVisitor(create: boolean) {
  try {
    let id = localStorage.getItem(VISITOR_KEY)
    if (!id && create) {
      // randomUUID() only exists in secure contexts (e.g. not on a LAN IP over http).
      id = typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c =>
            (+c ^ (crypto.getRandomValues(new Uint8Array(1))[0]! & (15 >> (+c / 4)))).toString(16))
      localStorage.setItem(VISITOR_KEY, id)
    }
    return id ?? undefined
  }
  catch {
    return undefined
  }
}

export function useReactions(slug: MaybeRefOrGetter<string>) {
  const count = ref<number | null>(null)
  const reacted = ref(false)
  const result = { count: readonly(count), reacted: readonly(reacted), toggle }
  let rollback: { count: number, reacted: boolean } | null = null

  if (import.meta.server)
    return result

  const { $live } = useNuxtApp()

  const stop = $live.on((message) => {
    if (message.type === 'error' && message.reason === 'rate-limited' && rollback) {
      count.value = rollback.count
      reacted.value = rollback.reacted
      rollback = null
      return
    }
    if (message.type !== 'reactions' || message.slug !== toValue(slug))
      return
    count.value = message.count
    if (message.reacted !== undefined) {
      reacted.value = message.reacted
      rollback = null
    }
  })

  let release: (() => void) | undefined

  watch(() => toValue(slug), (value) => {
    count.value = null
    reacted.value = false
    rollback = null
    release?.()
    release = $live.watchView(value, readVisitor(false))
  }, { immediate: true })

  onScopeDispose(() => {
    stop()
    release?.()
  })

  function toggle() {
    const visitor = readVisitor(true)
    if (!visitor || count.value === null)
      return
    const next = !reacted.value
    if (!$live.send({ type: 'react', slug: toValue(slug), visitor, reacted: next }))
      return
    rollback ??= { count: count.value, reacted: reacted.value }
    reacted.value = next
    count.value = Math.max(0, count.value + (next ? 1 : -1))
  }

  return result
}
