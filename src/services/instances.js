import axios from 'axios'

import { getToken } from './auth'

const token = sessionStorage.getItem('token')

export const axiosInstanceAccount = axios.create({
  baseURL: 'https://accounts.spotify.com/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export const axiosInstanceApi = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
})

axiosInstanceApi.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token')
  config.headers.Authorization = `Bearer ${token}`
  return config
})

axiosInstanceApi.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      getToken()
        .then((response) => {
          sessionStorage.setItem('token', response.access_token)
          window.location.reload()
          Promise.resolve()
        })
        .catch(() => {
          Promise.reject(error)
        })
    } else {
      //sessionStorage.clear()
      //window.location.reload()
      Promise.reject(error)
    }
  }
)