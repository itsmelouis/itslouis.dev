import PartySocket from 'partysocket'

type Listener = (message: LiveServerMessage) => void

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const presence = ref<number | null>(null)
  const listeners = new Set<Listener>()
  let socket: PartySocket | undefined
  let view: Extract<LiveClientMessage, { type: 'view' }> = { type: 'view', slug: null }

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
        setView(slug: string | null, visitor?: string) {
          view = { type: 'view', slug, visitor }
          send(view)
        },
        currentView: () => view.slug,
        on(listener: Listener) {
          listeners.add(listener)
          return () => listeners.delete(listener)
        },
      },
    },
  }
})
