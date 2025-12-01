import { Conversation } from './chats-response'

export interface ChatInfoResponse {
  data: ChatInfo
  status: string
}

export interface ChatInfo extends Conversation {}
