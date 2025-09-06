import api from './axios'
import { ChatInfoResponse } from '@/@types/chat-info-response'

export const getChatInfo = async ({
  uuid,
  token,
}: {
  uuid: string
  token: string
}) => {
  const response = await api.get<ChatInfoResponse>(`/conversations/${uuid}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data.data
}
