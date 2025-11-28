import { getOrInitWebSocket } from '@/services/ws'
import { onEvent } from '@/services/ws/event-handler'
import { WSOnEvents } from '@/services/ws/events'
import { useEffect, useRef } from 'react'

export function useWsEvent<T>(event: WSOnEvents, callback: (data: T) => void) {
  // Use ref to store the latest callback without re-registering the listener
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    getOrInitWebSocket() // ensure socket is open

    // Create a stable wrapper that always calls the latest callback
    const stableCallback = (data: T) => {
      callbackRef.current(data)
    }

    const unsubscribe = onEvent(event, stableCallback)

    return () => unsubscribe()
  }, [event]) // Only re-register when event changes, not when callback changes
}
