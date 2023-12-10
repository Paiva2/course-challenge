import axios from "axios"

const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "http://54.221.72.249:5000"

const api = axios.create({
  baseURL: baseUrl,
})

export default api
