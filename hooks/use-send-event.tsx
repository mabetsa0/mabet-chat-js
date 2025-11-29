import { useCallback, useEffect, useRef } from 'react'
import { getOrInitWebSocket } from '@/services/ws'
import { WSSendEvents } from '@/services/ws/events'

type PendingEvent = {
  event: WSSendEvents
  payload: unknown
}

export function useSendEvent() {
  const queueRef = useRef<PendingEvent[]>([])

  const flushQueue = useCallback(() => {
    const socket = getOrInitWebSocket()
    if (!socket || socket.readyState !== WebSocket.OPEN) return

    while (queueRef.current.length) {
      const next = queueRef.current.shift()
      if (!next) continue

      socket.send(
        JSON.stringify({
          type: next.event,
          contents: next.payload,
        })
      )
    }
  }, [])

  useEffect(() => {
    // Initialize socket when hook mounts to ensure it's ready
    const socket = getOrInitWebSocket()
    if (!socket) {
      console.warn('[useSendEvent] WebSocket initialization failed')
      return
    }

    // Always set up the listener, even if socket is already open
    // This handles reconnections and ensures queue is flushed
    const handleOpen = () => {
      console.log('[useSendEvent] WebSocket opened, flushing queue')
      flushQueue()
    }

    socket.addEventListener('open', handleOpen)

    // If socket is already open, flush immediately
    if (socket.readyState === WebSocket.OPEN) {
      console.log('[useSendEvent] WebSocket already open, flushing queue')
      flushQueue()
    } else {
      console.log(
        '[useSendEvent] WebSocket state:',
        socket.readyState,
        'waiting for open...'
      )
    }

    return () => {
      socket.removeEventListener('open', handleOpen)
    }
  }, [flushQueue])

  const sendEvent = useCallback(<T,>(event: WSSendEvents, payload: T) => {
    const socket = getOrInitWebSocket()

    if (!socket || socket.readyState !== WebSocket.OPEN) {
      queueRef.current.push({ event, payload })
      return
    }

    socket.send(
      JSON.stringify({
        type: event,
        contents: payload,
      })
    )
  }, [])

  return { sendEvent }
}
