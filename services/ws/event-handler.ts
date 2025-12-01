import { WSOnEvents } from './events'

type EventHandler<T, ID> = (data: T, id: ID) => void

const handlers: Partial<Record<WSOnEvents, EventHandler<any, string>[]>> = {}

export function onEvent<T>(event: WSOnEvents, cb: EventHandler<T, string>) {
  if (!handlers[event]) handlers[event] = []
  handlers[event].push(cb)

  return () => {
    handlers[event] = handlers[event]?.filter((h) => h !== cb)
  }
}

export function emitEvent<T>(event: WSOnEvents, data: T, id: string) {
  if (handlers[event]) {
    handlers[event].forEach((h) => h(data, id))
  }
}
