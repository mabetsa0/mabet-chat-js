import axios from 'axios'
export const chatBaseURL =
  process.env.NEXT_PUBLIC_TEST == 'true'
    ? process.env.NEXT_PUBLIC_EXPERIMENTAL
      ? 'https://chat-experimental.mabet-app.com/api/v1'
      : 'https://chat-test.mabet-app.com/api/v1'
    : 'https://chat.mabet-app.com/api/v1'
export const mainBaseURL =
  process.env.NEXT_PUBLIC_TEST == 'true'
    ? 'https://mabet.dev'
    : 'https://app.mabet.com.sa'

const api = axios.create({
  baseURL: chatBaseURL,
})

const mainApi = axios.create({
  baseURL: mainBaseURL,
})

export { mainApi }
export default api
