import api from './axios'
import { ChatListResponse } from '@/@types/chats-response'

export const getChatList = async ({
  token,
  ...params
}: {
  token: string
  params: Record<string, any>
}) => {
  const response = await api.get<ChatListResponse>(`/conversations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    ...params,
  })
  return response.data
}
