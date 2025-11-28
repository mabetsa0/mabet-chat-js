import { emitEvent } from './event-handler'
import { WSOnEvents } from './events'

// Singleton WebSocket instance with auto‑reconnect
let socket: WebSocket | null = null
let reconnectAttempts = 0
let reconnectTimer: number | null = null
let manuallyClosed = false

const MAX_RECONNECT_DELAY = 30_000 // 30s cap

function getReconnectDelay() {
  // Exponential backoff: 1s, 2s, 4s, ... up to MAX_RECONNECT_DELAY
  const base = 1_000
  const delay = base * 2 ** reconnectAttempts
  return Math.min(delay, MAX_RECONNECT_DELAY)
}

function scheduleReconnect() {
  if (manuallyClosed) return

  if (reconnectTimer) {
    window.clearTimeout(reconnectTimer)
    reconnectTimer = null
  }

  const delay = getReconnectDelay()
  reconnectAttempts += 1

  console.log(
    `[WS] scheduling reconnect in ${delay}ms (attempt ${reconnectAttempts})`
  )

  reconnectTimer = window.setTimeout(() => {
    reconnectTimer = null
    createWebSocket()
  }, delay)
}

function createWebSocket() {
  const url = process.env.NEXT_PUBLIC_WS_URL
  if (!url) {
    console.error('NEXT_PUBLIC_WS_URL is not defined')
    return null
  }

  manuallyClosed = false

  socket = new WebSocket(url)

  socket.onopen = () => {
    console.log('[WS] connected')
    reconnectAttempts = 0
  }

  socket.onclose = (event) => {
    console.log('[WS] closed', event.code, event.reason)
    socket = null
    if (!manuallyClosed) {
      scheduleReconnect()
    }
  }

  socket.onerror = (err) => {
    console.error('[WS] error', err)
    // Let onclose handle the reconnect logic
  }

  socket.onmessage = (msg) => {
    try {
      const { event, data } = JSON.parse(msg.data) as {
        event: WSOnEvents
        data: unknown
      }
      emitEvent(event, data) // ⬅ central routing
    } catch (e) {
      console.error('Invalid WS message:', msg.data)
    }
  }

  return socket
}

export function getOrInitWebSocket() {
  if (typeof window === 'undefined') return null

  // If an open/connecting socket already exists, reuse it
  if (
    socket &&
    (socket.readyState === WebSocket.OPEN ||
      socket.readyState === WebSocket.CONNECTING)
  ) {
    return socket
  }
  return createWebSocket()
}

export function closeSocket() {
  manuallyClosed = true

  if (reconnectTimer) {
    window.clearTimeout(reconnectTimer)
    reconnectTimer = null
  }

  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.close()
  }

  socket = null
}
