import axios from "axios"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

const mainApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MAIN_SERVER_API_URL,
})

export { mainApi }
export default api
