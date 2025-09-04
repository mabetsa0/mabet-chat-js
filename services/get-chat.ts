import { ChatResponse } from "@/@types/chat-response"
import api from "./axios"

export const getChat = async ({
  token,
  uuid,
  page = 1,
  pageSize = 20,
}: {
  token: string
  uuid: string
  page?: number
  pageSize?: number
}) => {
  const response = await api.get<ChatResponse>(
    `/conversations/${uuid}/messages`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        pageSize,
      },
    }
  )
  return response.data.data
}
