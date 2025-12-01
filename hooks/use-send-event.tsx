import { useCallback, useEffect, useRef } from 'react'
import { getOrInitWebSocket, wsSendEvent } from '@/services/ws'
import { WSSendEvents } from '@/services/ws/events'
import { v4 as uuidv4 } from 'uuid'

type PendingEvent = {
  id: string
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

      wsSendEvent(next.event, next.payload, next.id)
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
    const id = uuidv4()
    const socket = getOrInitWebSocket()

    if (!socket || socket.readyState !== WebSocket.OPEN) {
      queueRef.current.push({ id, event, payload })
      return
    }

    wsSendEvent(event, payload, id)
    return id
  }, [])

  return { sendEvent }
}
