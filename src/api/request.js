import axios from 'axios'
import store from 'store'
import {http} from './config'
// import router from '../router'

//  创建axios实例
const service = axios.create({
  baseURL: http,
  timeout: 5000
})

// request拦截器
service.interceptors.request.use((config) => {
  let token = store.getters.accessToken
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
}, (error) => {
  console.log(error)
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use((response) => {
  // console.log(response)
  return response
}, (error) => {
  let err = error.response
  if (err.status === 500) {
    console.log(err.data.message)
  } else if (err.status === 401) {
    console.log(err.data.message)
  }
  return Promise.reject(error)
})

export default service
