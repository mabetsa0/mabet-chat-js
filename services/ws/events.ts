export const WS_SEND_EVENTS = {
  AUTHENTICATE: 'authenticate',
  TYPING_START: 'typing_start',
  SEND_MESSAGE: 'send_message',
  READ_MESSAGE: 'read_message',
  GET_CONVERSATION_PAGE: 'get_conversation_page',
} as const

export type WS_SEND_EVENTS_PAYLOADS = {
  AUTHENTICATE: {
    token: string
    first_conversations_page_size: number
  }
  SEND_MESSAGE: {
    conversation_uuid: string
    type: 'text'
    content: string
  }
  READ_MESSAGE: {
    conversation_uuid: string
    message_id: string
  }
  GET_CONVERSATION_PAGE: {
    oldest_conversation_uuid: string
    conversations_page_size: number
  }
  TYPING_START: string
  TYPING_STOP: string
}

export type WS_SEND_EVENTS_KEYS = keyof typeof WS_SEND_EVENTS
export type WSSendEvents = (typeof WS_SEND_EVENTS)[keyof typeof WS_SEND_EVENTS]
export type WSSendEventsPayloads =
  WS_SEND_EVENTS_PAYLOADS[keyof WS_SEND_EVENTS_PAYLOADS]

// Map event *names* (the runtime string values) to their payloads
type WS_SendEventNameToKey = {
  [K in keyof typeof WS_SEND_EVENTS as (typeof WS_SEND_EVENTS)[K]]: K
}

export type WSSendEventPayloadByEvent = {
  [E in WSSendEvents]: WS_SEND_EVENTS_PAYLOADS[WS_SendEventNameToKey[E]]
}

export const WS_ON_EVENTS = {
  AUTHENTICATED: 'authenticated',
  ERROR: 'error',
  MESSAGE_SENT: 'message_sent',
  MESSAGE_READ: 'message_read',
  MESSAGE_RECEIVED: 'message_received',
  TYPING_UPDATE: 'typing_update',
  PRESENCE_UPDATE: 'presence_update',
  UNREAD_CONVERSATIONS_COUNT_UPDATE: 'unread_conversations_count_update',
  UNREAD_MESSAGES_COUNT_UPDATE: 'unread_messages_count_update',
  MESSAGE_DELETED: 'message_deleted',
  CONVERSATIONS_PAGE: 'conversations_page',
} as const
export type WSOnEvents = (typeof WS_ON_EVENTS)[keyof typeof WS_ON_EVENTS]
