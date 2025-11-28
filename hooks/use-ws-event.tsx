import { getOrInitWebSocket } from '@/services/ws'
import { onEvent } from '@/services/ws/event-handler'
import { WSOnEvents } from '@/services/ws/events'
import { useEffect } from 'react'

export function useWsEvent<T>(event: WSOnEvents, callback: (data: T) => void) {
  useEffect(() => {
    getOrInitWebSocket() // ensure socket is open

    const unsubscribe = onEvent(event, callback)

    return () => unsubscribe()
  }, [event, callback])
}
