export interface ChatResponse {
  data: Data
  status: string
}

export interface Data {
  messages: Message[]
  has_more: boolean
}

export interface Message {
  id: string
  sender_id: number
  sender_type: string
  sender_name: string
  conversation_uuid: string
  content: string
  created_at: Date
}
