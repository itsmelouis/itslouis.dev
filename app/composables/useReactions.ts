const VISITOR_KEY = 'reactions:visitor'

function readVisitor(create: boolean) {
  try {
    let id = localStorage.getItem(VISITOR_KEY)
    if (!id && create) {
      id = crypto.randomUUID()
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

  watch(() => toValue(slug), (value) => {
    count.value = null
    reacted.value = false
    rollback = null
    $live.setView(value, readVisitor(false))
  }, { immediate: true })

  onScopeDispose(() => {
    stop()
    if ($live.currentView() === toValue(slug))
      $live.setView(null)
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
