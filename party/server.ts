/// <reference types="@cloudflare/workers-types" />
import type { Connection } from 'partyserver'
import { routePartykitRequest, Server } from 'partyserver'

interface Env {
  Presence: DurableObjectNamespace<PresenceServer>
}

// Live presence server: tracks how many viewers are connected to a room and
// broadcasts the count to everyone whenever someone joins or leaves.
export class PresenceServer extends Server<Env> {
  // Hibernate between events so a single room can hold many thousands of idle
  // WebSocket connections without burning compute — keeps us within the
  // Workers free plan while the count stays live.
  static options = { hibernate: true }

  #broadcastCount(excludeId?: string) {
    const connections = [...this.getConnections()]
    // On disconnect the closing connection may still be listed, so exclude it
    // to keep the broadcast count accurate.
    const count = excludeId
      ? connections.filter(c => c.id !== excludeId).length
      : connections.length
    this.broadcast(`connections:${count}`, excludeId ? [excludeId] : [])
  }

  onConnect() {
    this.#broadcastCount()
  }

  onClose(connection: Connection) {
    this.#broadcastCount(connection.id)
  }
}

export default {
  async fetch(request, env) {
    return (
      await routePartykitRequest(request, env)
      || new Response('Not Found', { status: 404 })
    )
  },
} satisfies ExportedHandler<Env>
