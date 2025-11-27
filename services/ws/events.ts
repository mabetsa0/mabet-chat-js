export const WS_SEND_EVENTS = {
  AUTHENTICATE: 'authenticate',
  TYPING_START: 'typing_start',
  TYPING_STOP: 'typing_stop',
  SEND_MESSAGE: 'send_message',
  READ_MESSAGE: 'read_message',
  GET_CONVERSATION_PAGE: 'get_conversation_page',
} as const
export type WSSendEvents = (typeof WS_SEND_EVENTS)[keyof typeof WS_SEND_EVENTS]

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
