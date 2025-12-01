export interface ChatListResponse {
  data: Data
  status: string
}

export interface Data {
  conversations: Conversation[]
  has_more: boolean
}

export interface Conversation {
  uuid: string
  type: string
  id: number
  title: string | null
  image: string
  initiator_type: string
  initiator_id: number
  initiator_name: string
  topic_type: null | string
  topic_id: number | null
  topic_name: null | string
  created_at: string
  unread_messages_count: number
  online_participants: {
    id: number
    type: string
    name: string
  }[]
  read_positions: ReadPosition[]
  last_message: LastMessage
}

export interface LastMessage {
  id: string
  message_type: string
  sender_id: number
  sender_type: string
  sender_name: string
  conversation_uuid: string
  content: string
  created_at: string
}

export interface ReadPosition {
  user_id: number
  user_type: string
  user_name: string
  message_id: string
  timestamp: string
}
