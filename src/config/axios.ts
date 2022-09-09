import axios, { AxiosStatic } from "axios"

const API_BASE_URL_DEV = "http://localhost:5000/v1"
const API_BASE_URL_PROD = "https://api.ecommerce.com/v1"
let API_BASE_URL: string

if (process.env.NODE_ENV === "development") API_BASE_URL = API_BASE_URL_DEV
else API_BASE_URL = API_BASE_URL_PROD

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
})

export default axiosInstance as AxiosStatic
