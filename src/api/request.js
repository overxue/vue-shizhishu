import axios from 'axios'
import state from 'store'

//  创建axios实例
const service = axios.create({
  baseURL: 'http://shizhishu.test',
  timeout: 5000
})

// request拦截器
service.interceptors.request.use((config) => {
  let token = state.getters.token
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
  console.log(response)
  return response
}, (error) => {
  let err = error.response
  if (err.status === 500) {
    console.log(err.data.message)
  }
  return Promise.reject(error)
})

export default service
