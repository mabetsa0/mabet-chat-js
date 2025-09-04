export interface ChatInfoResponse {
  data: ChatInfo
  status: string
}

export interface ChatInfo {
  uuid: string
  type: string
  id: number
  title: string
  image: string
  initiator_type: string
  initiator_id: number
  initiator_name: string
  topic_type: string
  topic_id: number
  topic_name: string
  created_at: string
  unread_messages_count: number
  online_participants: any[]
  read_positions: ReadPosition[]
  last_message: LastMessage
}

export interface LastMessage {
  id: string
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
