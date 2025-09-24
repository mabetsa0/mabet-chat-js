import { ChatResponse } from '@/@types/chat-response'
import api from './axios'

export const deleteMessage = async ({
  messageId,
  token,
}: {
  messageId: string | number
  token: string
}) => {
  const response = await api.delete<ChatResponse>(`/messages/${messageId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.data
}
