import type * as Party from 'partykit/server'

// Live presence server: tracks how many viewers are connected to a room and
// broadcasts the count to everyone whenever someone joins or leaves.
export default class PresenceServer implements Party.Server {
  constructor(readonly room: Party.Room) {}

  #broadcastCount(excludeId?: string) {
    const connections = [...this.room.getConnections()]
    // On disconnect the closing connection may still be listed, so exclude it
    // to keep the broadcast count accurate.
    const count = excludeId
      ? connections.filter(c => c.id !== excludeId).length
      : connections.length
    this.room.broadcast(`connections:${count}`, excludeId ? [excludeId] : [])
  }

  onConnect() {
    this.#broadcastCount()
  }

  onClose(connection: Party.Connection) {
    this.#broadcastCount(connection.id)
  }
}

PresenceServer satisfies Party.Worker
