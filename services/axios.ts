import axios from "axios"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

const mainApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MAIN_SERVER_API_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export { mainApi }
export default api
