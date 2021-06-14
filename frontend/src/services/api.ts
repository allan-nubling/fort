import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import Auth from './auth'

const API_URL = 'http://localhost:5000'

const api: AxiosInstance = axios.create({
    baseURL: API_URL
})

api.interceptors.request.use(async (config: AxiosRequestConfig) => {
    if (Auth.getToken()) {
        config.headers.Authorization = `Bearer ${Auth.getToken()}`
    }
    return config
})

export default api
