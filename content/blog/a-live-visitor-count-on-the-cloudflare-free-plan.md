---
title: A live visitor count on the Cloudflare free plan
description: How the "online" badge and the thumbs-up reactions on this site work, built with PartyServer and a single Durable Object, without tracking anyone.
date: "2026-11-08"
tags: [cloudflare, partyserver, durable-objects, nuxt, websockets]
---

Bottom right of this page, on a large enough screen, there's a small pill that says how many people are on the site right now. Under each blog post there's a thumbs-up button whose count is shared with everyone. Both run on one Cloudflare Worker, one Durable Object, and the free plan. This post is how it's built, including the parts I got wrong the first time.

## What I wanted

A sign of life. A personal site is a quiet place, and seeing "3 online" makes it feel less like a static document. I wanted that without an analytics script, without cookies, and without storing anything that could identify a visitor. The count had to be real-time, so WebSockets, and it had to be free, so Cloudflare.

The reactions came three months later, once the socket was already there and it felt wasteful not to use it.

## The stack

[PartyServer](https://github.com/cloudflare/partyserver) is the Cloudflare-native successor to PartyKit. You write a class that extends `Server`, deploy it as a Worker with a Durable Object binding, and every "room" becomes one Durable Object instance that holds the WebSocket connections. On the client, `partysocket` is a thin wrapper around `WebSocket` with reconnection built in.

The whole server is a single file in `party/server.ts`. The Wrangler config is short enough to show in full:

```jsonc [party/wrangler.jsonc]
{
  "name": "c",
  "main": "server.ts",
  "compatibility_date": "2025-01-15",
  "durable_objects": {
    "bindings": [
      { "name": "Presence", "class_name": "PresenceServer" }
    ]
  },
  "migrations": [
    { "tag": "v1", "new_sqlite_classes": ["PresenceServer"] }
  ],
  "routes": [
    { "pattern": "c.itslouis.dev", "custom_domain": true }
  ]
}
```

Two details matter for the free plan.

The migration uses `new_sqlite_classes`, not `new_classes`. SQLite-backed storage is the only Durable Object backend the free plan supports, and Wrangler will refuse to deploy otherwise. The error message is clear, but I lost ten minutes on it anyway.

The server also sets `static options = { hibernate: true }`. With hibernation, the Durable Object goes to sleep between messages while Cloudflare keeps the WebSockets open on its behalf. Without it, every open connection keeps the object awake, and you pay for that wall-clock time. On a personal site with a handful of long-lived connections, hibernation is the difference between "free" and "a surprise invoice".

## Counting connections

The presence part is almost embarrassingly small. The room is called `site`, every visitor joins it, and the count is the number of open connections:

```ts [party/server.ts]
export class PresenceServer extends Server<Env> {
  static options = { hibernate: true }

  onConnect(connection: Connection<ConnectionState>) {
    this.#broadcastCount()
  }

  onClose(connection: Connection) {
    this.#broadcastCount(connection.id)
  }

  #broadcastCount(excludeId?: string) {
    const connections = [
      ...this.getConnections()
    ]
    const count = excludeId
      ? connections.filter(c => c.id !== excludeId).length
      : connections.length
    const message: LiveServerMessage = { type: 'presence', count }
    this.broadcast(JSON.stringify(message), excludeId
      ? [excludeId]
      : [])
  }
}
```

The `excludeId` parameter is the first thing I got wrong. In `onClose`, the connection that is closing is still listed by `getConnections()`, so the broadcast count was off by one every time someone left. It went back to the correct value on the next join, which made it annoying to notice.

Note that this counts sockets, not people. Two tabs are two viewers. I'm fine with that for a site this size, and fixing it would mean identifying visitors, which is exactly what I didn't want.

## The client side in Nuxt

A client-only plugin opens the socket once the app is ready and exposes it to the rest of the app as `$live`:

```ts [app/plugins/live-socket.client.ts]
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const presence = ref<number | null>(null)
  let socket: PartySocket | undefined

  onNuxtReady(() => {
    socket = new PartySocket({
      host: import.meta.dev
        ? 'localhost:8787'
        : config.public.partyHost,
      party: 'presence',
      room: 'site',
    })

    socket.addEventListener('message', (event) => {
      const message: LiveServerMessage = JSON.parse(String(event.data))
      if (message.type === 'presence')
        presence.value = message.count
    })
  })

  return {
    provide: {
      live: {
        presence: readonly(presence)
      },
    },
  }
})
```

`onNuxtReady` matters: the socket opens after hydration, so it never competes with the page's own loading. The indicator component reads `$live.presence` and renders nothing while it's `null`, which also covers server-side rendering, where there is no socket at all.

The only other change in the Nuxt app is the Content Security Policy. Nuxt Security locks `connect-src` down by default, so the Worker's host has to be added for both `wss://` and `https://`. I read the host from a `NUXT_PUBLIC_PARTY_HOST` environment variable with the production domain as the fallback, so the CSP and the socket always point to the same place.

::tip
Run `pnpm party:dev` next to `pnpm dev`. Wrangler serves the Worker on `localhost:8787`, and the plugin switches to it automatically in development. You get the full round trip locally, including the Durable Object's SQLite storage.
::

## Adding reactions on the same socket

Once the socket existed, reactions were mostly a storage problem. The Durable Object has SQLite built in, so the table is created when the object starts:

```ts [party/server.ts]
export class PresenceServer extends Server<Env> {
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
}
```

One row per visitor per post. A thumbs-up is an `INSERT OR IGNORE`, removing it is a `DELETE`, and the count is a `COUNT(*)`. The primary key makes double-clicks harmless.

The visitor id is a UUID generated in the browser and kept in `localStorage`. It's not tied to anything: no IP, no account, no fingerprint. Clear your storage and you're a new visitor who can like the post again. That's the trade-off I chose, and it's an honest one for a thumbs-up button.

The protocol between client and server is three message types, shared as TypeScript types between the Nuxt app and the Worker:

```ts [shared/types/live.ts]
export type LiveClientMessage
  = | { type: 'view', slug: string | null, visitor?: string }
    | { type: 'react', slug: string, visitor: string, reacted: boolean }

export type LiveServerMessage
  = | { type: 'presence', count: number }
    | { type: 'reactions', slug: string, count: number, reacted?: boolean }
    | { type: 'error', reason: 'rate-limited' | 'invalid' }
```

A `view` message tells the server which post the connection is looking at. The server stores the slug in the connection's state, which survives hibernation, and replies with the current count and whether this visitor has already reacted. When someone reacts, the server broadcasts the new count to every connection viewing the same slug, but the `reacted` flag only goes back to the sender. Nobody else learns who liked what.

## The hydration bug

Three days after shipping reactions I noticed the count sometimes went blank after navigating between posts. Nuxt can set up a page twice during hydration, and my first version of the plugin kept a single "current view". The second setup would register, then the first one's cleanup would run and clear it, and the server would think nobody was watching anything.

The fix is a small stack of viewers where the latest one wins:

```ts [app/plugins/live-socket.client.ts]
const viewers: { slug: string, visitor?: string }[] = []

function watchView(slug: string, visitor?: string) {
  const viewer = { slug, visitor }
  viewers.push(viewer)
  syncView(true)
  return () => {
    viewers.splice(viewers.indexOf(viewer), 1)
    syncView()
  }
}
```

Releasing one viewer no longer affects the other. It's the kind of bug that only shows up in a real browser, and it's why I'm glad the full round trip runs locally.

## Optimistic updates with a rollback

The thumbs-up flips instantly on click, before the server answers. The composable keeps a snapshot of the previous state and restores it if the server replies with `rate-limited`:

```ts [app/composables/useReactions.ts]
function toggle() {
  const next = !reacted.value
  if (!$live.send({
    type: 'react',
    slug,
    visitor,
    reacted: next
  })) {
    return
  }
  rollback ??= { count: count.value, reacted: reacted.value }
  reacted.value = next
  count.value = Math.max(0, count.value + (next
    ? 1
    : -1))
}
```

The `??=` is deliberate. If you click five times quickly, the rollback should return to the state before the first click, not the fourth. The snapshot is cleared as soon as the server confirms with a message that carries `reacted`.

## Keeping it safe without keeping data

An open WebSocket that writes to a database is an invitation. Three things keep it boring.

**Every message is validated** before it touches anything. Slugs must match `^[a-z0-9][a-z0-9/-]{0,199}$`, visitor ids must look like a UUID, and anything else gets an `invalid` error back. There's no chance to write a megabyte of garbage into the slug column.

**Writes are rate limited** to 20 per minute per IP. The buckets live in memory on the Durable Object, which means they're lost when the object is evicted. I'm fine with that. A limit that resets once in a while is still a limit, and persisting it would mean persisting something derived from IPs.

**The IP itself is never stored.** On connect, the Worker reads `CF-Connecting-IP` and hashes it with HMAC-SHA-256 using a key generated at random when the object instance starts:

```ts [party/server.ts]
export class PresenceServer extends Server<Env> {
  #hmacKey: Promise<CryptoKey> | undefined

  async #hashIp(ip: string) {
    this.#hmacKey ??= crypto.subtle.generateKey(
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign'],
    ) as Promise<CryptoKey>
    const signature = await crypto.subtle.sign('HMAC', await this.#hmacKey, new TextEncoder().encode(ip))
    return [
      ...new Uint8Array(signature)
    ].map(b => b.toString(16).padStart(2, '0')).join('')
  }
}
```

A plain SHA-256 of an IPv4 address is not anonymous: the whole address space is four billion values, which a laptop hashes in minutes. With a random key that never leaves the instance and is not even extractable from the Web Crypto API, the hash is only useful for grouping messages during the object's lifetime. When the object is evicted, the key is gone and the hashes are meaningless.

## What I'd tell you before you copy it

It's one Durable Object for the whole site. That's a single point of coordination, and for a few dozen concurrent connections it's completely fine. If you expect thousands, split the presence room per page or per region, and keep reactions in a separate object so a busy count doesn't slow down a like.

Hibernation adds a little latency on the first message after a quiet period, because the object has to wake up. On this site that's invisible. On a chat app you'd notice.

The indicator is hidden below the `lg` breakpoint. It's a bit of decoration, and on a phone it would cover content that matters more.

And the honest summary: the presence badge took an afternoon, the reactions took a weekend, and the privacy choices took longer to think about than either. That last part is the one worth copying.
