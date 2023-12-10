import axios from "axios"

const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://course-back.onrender.com"

const api = axios.create({
  baseURL: baseUrl,
})

export default api
