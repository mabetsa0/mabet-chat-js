import api from "./axios"
import { ChatInfoResponse } from "@/@types/chat-info-response"

export const getChatInfo = async ({
  chatID,
  token,
}: {
  chatID: string
  token: string
}) => {
  const response = await api.get<ChatInfoResponse>(`/conversations/${chatID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data.data
}
