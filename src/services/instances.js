import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_BACK_URL || ''

export const axiosInstanceJson = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
})

export const axiosInstanceFormData = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
  }
})
