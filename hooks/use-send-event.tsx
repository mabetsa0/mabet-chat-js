import { useCallback, useEffect, useRef } from 'react'
import { initWebSocket } from '@/services/ws'
import { WSSendEvents } from '@/services/ws/events'

type PendingEvent = {
  event: WSSendEvents
  payload: unknown
}

export function useSendEvent() {
  const queueRef = useRef<PendingEvent[]>([])

  const flushQueue = useCallback(() => {
    const socket = initWebSocket()
    if (!socket || socket.readyState !== WebSocket.OPEN) return

    while (queueRef.current.length) {
      const next = queueRef.current.shift()
      if (!next) continue

      socket.send(
        JSON.stringify({
          event: next.event,
          data: next.payload,
        })
      )
    }
  }, [])

  useEffect(() => {
    const socket = initWebSocket()
    if (!socket) return

    if (socket.readyState === WebSocket.OPEN) {
      flushQueue()
      return
    }

    const handleOpen = () => flushQueue()
    socket.addEventListener('open', handleOpen)

    return () => {
      socket.removeEventListener('open', handleOpen)
    }
  }, [flushQueue])

  const sendEvent = useCallback(<T,>(event: WSSendEvents, payload: T) => {
    const socket = initWebSocket()

    if (!socket || socket.readyState !== WebSocket.OPEN) {
      queueRef.current.push({ event, payload })
      return
    }

    socket.send(
      JSON.stringify({
        event,
        data: payload,
      })
    )
  }, [])

  return { sendEvent }
}
