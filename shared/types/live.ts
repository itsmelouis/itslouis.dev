export type LiveClientMessage
  = | { type: 'view', slug: string | null, visitor?: string }
    | { type: 'react', slug: string, visitor: string, reacted: boolean }

// `reacted` is only sent to the connection that viewed or reacted, never broadcast.
export type LiveServerMessage
  = | { type: 'presence', count: number }
    | { type: 'reactions', slug: string, count: number, reacted?: boolean }
    | { type: 'error', reason: 'rate-limited' | 'invalid' }
