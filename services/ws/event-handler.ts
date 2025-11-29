import { WS_ON_EVENTS, WSOnEvents } from './events'

type EventHandler<T> = (data: T) => void

const handlers: Partial<Record<WSOnEvents, EventHandler<any>[]>> = {}

export function onEvent<T>(event: WSOnEvents, cb: EventHandler<T>) {
  if (!handlers[event]) handlers[event] = []
  handlers[event].push(cb)

  return () => {
    handlers[event] = handlers[event]?.filter((h) => h !== cb)
  }
}

export function emitEvent<T>(event: WSOnEvents, data: T) {
  if (handlers[event]) {
    handlers[event].forEach((h) => h(data))
  }
}
