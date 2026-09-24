/// <reference types="@cloudflare/workers-types" />
import type { Connection, ConnectionContext, WSMessage } from 'partyserver'
import type { LiveClientMessage, LiveServerMessage } from '../shared/types/live'
import { routePartykitRequest, Server } from 'partyserver'

interface Env {
  Presence: DurableObjectNamespace<PresenceServer>
}

interface ConnectionState {
  slug: string | null
  ipKey: string
}

const SLUG_RE = /^[a-z0-9][a-z0-9/-]{0,199}$/i
const VISITOR_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 20

export class PresenceServer extends Server<Env> {
  // Workers free plan while the count stays live.
  static options = { hibernate: true }

  // Random per-instance key so IP hashes can't be reversed by brute-forcing
  // the IPv4 space. It is lost on eviction along with the rate-limit buckets.
  #hmacKey: Promise<CryptoKey> | undefined
  #rateLimits = new Map<string, number[]>()

  onStart() {
    this.ctx.storage.sql.exec(`
      CREATE TABLE IF NOT EXISTS reactions (
        slug TEXT NOT NULL,
        visitor TEXT NOT NULL,
        created_at INTEGER NOT NULL,
        PRIMARY KEY (slug, visitor)
      )
    `)
  }

  async onConnect(connection: Connection<ConnectionState>, ctx: ConnectionContext) {
    connection.setState({ slug: null, ipKey: connection.id })
    this.#broadcastCount()
    const ip = ctx.request.headers.get('CF-Connecting-IP') ?? 'unknown'
    const ipKey = await this.#hashIp(ip)
    connection.setState(prev => ({ slug: prev?.slug ?? null, ipKey }))
  }

  onClose(connection: Connection) {
    this.#broadcastCount(connection.id)
  }

  onMessage(connection: Connection<ConnectionState>, raw: WSMessage) {
    const message = parseMessage(raw)
    if (!message)
      return send(connection, { type: 'error', reason: 'invalid' })

    if (message.type === 'view') {
      connection.setState(prev => ({ ipKey: prev?.ipKey ?? connection.id, slug: message.slug }))
      if (message.slug) {
        send(connection, {
          type: 'reactions',
          slug: message.slug,
          count: this.#countReactions(message.slug),
          reacted: message.visitor ? this.#hasReacted(message.slug, message.visitor) : false,
        })
      }
      return
    }

    if (this.#isRateLimited(connection.state?.ipKey ?? connection.id))
      return send(connection, { type: 'error', reason: 'rate-limited' })

    if (message.reacted) {
      this.ctx.storage.sql.exec(
        'INSERT OR IGNORE INTO reactions (slug, visitor, created_at) VALUES (?, ?, ?)',
        message.slug,
        message.visitor,
        Date.now(),
      )
    }
    else {
      this.ctx.storage.sql.exec(
        'DELETE FROM reactions WHERE slug = ? AND visitor = ?',
        message.slug,
        message.visitor,
      )
    }

    const count = this.#countReactions(message.slug)
    for (const conn of this.getConnections<ConnectionState>()) {
      if (conn.id === connection.id)
        send(conn, { type: 'reactions', slug: message.slug, count, reacted: message.reacted })
      else if (conn.state?.slug === message.slug)
        send(conn, { type: 'reactions', slug: message.slug, count })
    }
  }

  #broadcastCount(excludeId?: string) {
    const connections = [...this.getConnections()]
    // On disconnect the closing connection may still be listed, so exclude it
    // to keep the broadcast count accurate.
    const count = excludeId
      ? connections.filter(c => c.id !== excludeId).length
      : connections.length
    const message: LiveServerMessage = { type: 'presence', count }
    this.broadcast(JSON.stringify(message), excludeId ? [excludeId] : [])
  }

  #countReactions(slug: string) {
    return this.ctx.storage.sql
      .exec<{ count: number }>('SELECT COUNT(*) AS count FROM reactions WHERE slug = ?', slug)
      .one()
      .count
  }

  #hasReacted(slug: string, visitor: string) {
    return this.ctx.storage.sql
      .exec('SELECT 1 FROM reactions WHERE slug = ? AND visitor = ? LIMIT 1', slug, visitor)
      .toArray()
      .length > 0
  }

  #isRateLimited(key: string) {
    const now = Date.now()
    const recent = (this.#rateLimits.get(key) ?? []).filter(t => now - t < RATE_LIMIT_WINDOW_MS)
    if (recent.length >= RATE_LIMIT_MAX) {
      this.#rateLimits.set(key, recent)
      return true
    }
    recent.push(now)
    this.#rateLimits.set(key, recent)
    return false
  }

  async #hashIp(ip: string) {
    this.#hmacKey ??= crypto.subtle.generateKey(
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign'],
    ) as Promise<CryptoKey>
    const signature = await crypto.subtle.sign('HMAC', await this.#hmacKey, new TextEncoder().encode(ip))
    return [...new Uint8Array(signature)].map(b => b.toString(16).padStart(2, '0')).join('')
  }
}

function send(connection: Connection, message: LiveServerMessage) {
  connection.send(JSON.stringify(message))
}

function parseMessage(raw: WSMessage): LiveClientMessage | null {
  if (typeof raw !== 'string')
    return null
  let data: unknown
  try {
    data = JSON.parse(raw)
  }
  catch {
    return null
  }
  if (!data || typeof data !== 'object')
    return null

  const message = data as Record<string, unknown>
  const isSlug = (v: unknown): v is string => typeof v === 'string' && SLUG_RE.test(v)
  const isVisitor = (v: unknown): v is string => typeof v === 'string' && VISITOR_RE.test(v)

  if (message.type === 'view') {
    if (message.slug !== null && !isSlug(message.slug))
      return null
    if (message.visitor !== undefined && !isVisitor(message.visitor))
      return null
    return { type: 'view', slug: message.slug, visitor: message.visitor }
  }

  if (message.type === 'react') {
    if (!isSlug(message.slug) || !isVisitor(message.visitor) || typeof message.reacted !== 'boolean')
      return null
    return { type: 'react', slug: message.slug, visitor: message.visitor, reacted: message.reacted }
  }

  return null
}

export default {
  async fetch(request, env) {
    return (
      await routePartykitRequest(request, env)
      || new Response('Not Found', { status: 404 })
    )
  },
} satisfies ExportedHandler<Env>
