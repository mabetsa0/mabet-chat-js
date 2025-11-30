import { mainApi } from './axios'

export const fetchAccessToken = async (token: string) => {
  const response = await mainApi.post<{ token: string; type: string }>(
    `/chat/api/v2/chat-token`,
    {},
    {
      headers: {
        Authorization: `Bearer ${decodeURIComponent(token)}`,
      },
    }
  )

  return response.data.token
}
