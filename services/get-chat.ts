import { ChatResponse } from "@/@types/chat-response"
import api from "./axios"

export const getChat = async ({
  token,
  uuid,
}: {
  token: string
  uuid: string
}) => {
  const response = await api.get<ChatResponse>(
    `/conversations/${uuid}/messages`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response.data.data
}
