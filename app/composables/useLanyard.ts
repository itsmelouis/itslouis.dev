interface SpotifyData {
  song: string
  artist: string
  album: string
  album_art_url: string
  track_id: string
}

interface LanyardMessage {
  op: number
  d: {
    heartbeat_interval?: number
    spotify?: SpotifyData | null
    [key: string]: unknown
  }
  t?: string
}

const DISCORD_USER_ID = '379362415428632576'

export function useLanyard() {
  const spotify = ref<SpotifyData | null>(null)
  let ws: WebSocket | null = null
  let heartbeatTimer: ReturnType<typeof setInterval> | null = null

  function connect() {
    ws = new WebSocket('wss://api.lanyard.rest/socket')

    ws.onmessage = (event) => {
      const msg: LanyardMessage = JSON.parse(event.data)

      if (msg.op === 1) {
        ws!.send(JSON.stringify({
          op: 2,
          d: { subscribe_to_id: DISCORD_USER_ID },
        }))

        heartbeatTimer = setInterval(() => {
          ws?.send(JSON.stringify({ op: 3 }))
        }, msg.d.heartbeat_interval!)
      }

      if (msg.op === 0) {
        spotify.value = msg.d.spotify ?? null
      }
    }

    ws.onclose = () => {
      cleanup()
      setTimeout(connect, 5000)
    }
  }

  function cleanup() {
    if (heartbeatTimer) {
      clearInterval(heartbeatTimer)
      heartbeatTimer = null
    }
    if (ws) {
      ws.onclose = null
      ws.close()
      ws = null
    }
  }

  onMounted(connect)
  onBeforeUnmount(cleanup)

  return { spotify }
}
