import PartySocket from 'partysocket'

type Listener = (message: LiveServerMessage) => void

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const presence = ref<number | null>(null)
  const listeners = new Set<Listener>()
  let socket: PartySocket | undefined
  let view: Extract<LiveClientMessage, { type: 'view' }> = { type: 'view', slug: null }
  // Every mounted viewer holds an entry; the latest one wins. A page can be set
  // up twice during hydration, so releasing one must not clear the other.
  const viewers: { slug: string, visitor?: string }[] = []

  function syncView(force = false) {
    const top = viewers.at(-1)
    if (!force && top?.slug === view.slug && top?.visitor === view.visitor)
      return
    view = { type: 'view', slug: top?.slug ?? null, visitor: top?.visitor }
    send(view)
  }

  function send(message: LiveClientMessage) {
    if (socket?.readyState !== WebSocket.OPEN)
      return false
    socket.send(JSON.stringify(message))
    return true
  }

  onNuxtReady(() => {
    socket = new PartySocket({
      host: import.meta.dev ? 'localhost:8787' : config.public.partyHost,
      party: 'presence',
      room: 'site',
    })

    socket.addEventListener('open', () => {
      if (view.slug)
        send(view)
    })

    socket.addEventListener('message', (event) => {
      let message: LiveServerMessage
      try {
        message = JSON.parse(String(event.data))
      }
      catch {
        return
      }
      if (message.type === 'presence')
        presence.value = message.count
      for (const listener of listeners)
        listener(message)
    })
  })

  return {
    provide: {
      live: {
        presence: readonly(presence),
        send,
        watchView(slug: string, visitor?: string) {
          const viewer = { slug, visitor }
          viewers.push(viewer)
          // Always ask again so a new subscriber gets the current count.
          syncView(true)
          return () => {
            viewers.splice(viewers.indexOf(viewer), 1)
            syncView()
          }
        },
        on(listener: Listener) {
          listeners.add(listener)
          return () => listeners.delete(listener)
        },
      },
    },
  }
})
