import api from "./axios"

export const getChat = async ({
  chatID,
  token,
}: {
  chatID: string
  token: string
}) => {
  const response = await api.get(`/api/v1/conversations/${chatID}/messages`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}
