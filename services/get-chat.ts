import { ChatResponse } from '@/@types/chat-response'
import api from './axios'

export const getChat = async ({
  token,
  uuid,
  oldestMessageId,
  pageSize = 20,
}: {
  token: string
  uuid: string
  oldestMessageId?: string | number
  pageSize?: number
}) => {
  const response = await api.get<ChatResponse>(
    `/conversations/${uuid}/messages`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        oldestMessageId,
        pageSize,
      },
    }
  )
  return response.data.data
}
