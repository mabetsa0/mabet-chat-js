import axios from 'axios'

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_TEST === 'true'
      ? 'https://chat-test.mabet-app.com/api/v1'
      : 'https://chat.mabet-app.com/api/v1',
})

const mainApi = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_TEST === 'true'
      ? 'https://mabet.dev'
      : 'https://app.mabet.com.sa',
})

export { mainApi }
export default api
