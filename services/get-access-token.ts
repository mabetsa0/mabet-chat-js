import React from "react"
import { mainApi } from "./axios"

export const getAccessToken = React.cache(async (token: string) => {
  const response = await mainApi.post<{ token: string }>(
    `/chat/api/v2/chat-token`,
    {},
    {
      headers: {
        Authorization: `Bearer ${decodeURIComponent(token)}`,
      },
    }
  )
  return response.data.token
})
