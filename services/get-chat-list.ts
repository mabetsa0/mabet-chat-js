import api from "./axios"

export type Chat = {
  id: string
  uuid: string
  sender_name: string
  receiver_name: string
  is_sender_online: boolean
  last_sender_active: string
  is_receiver_online: boolean
  last_receiver_active: string
  sender_identifier: string
  receiver_identifier: string
  sender_guard: string
  receiver_guard: string
  sender_image: string
  receiver_image: string
  last_message: string
  is_read: boolean
  unread_messages: number
  created_at: string
  last_message_at: string
  last_message_day: string
  chat_link: string
  access_token: string
}

type ChatListResponse = {
  data: {
    conversations: Chat[]
    has_more: boolean
  }
  status: "success"
}
export const getChatList = async ({
  token,
  ...params
}: {
  token: string
  params: Record<string, any>
}): Promise<ChatListResponse> => {
  const response = await api.get(`/api/v1/conversations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    ...params,
  })
  return response.data
}
