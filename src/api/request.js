import axios from 'axios'
import store from 'store'
import {http} from './config'
import router from '../router'

//  创建axios实例
const service = axios.create({
  baseURL: http,
  timeout: 5000
})

// request拦截器
service.interceptors.request.use((config) => {
  // 判断当前路由是否需要登录
  if (router.currentRoute.meta.auth || router.currentRoute.fullPath === '/my') {
    let token = store.getters.accessToken
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
  }
  return config
}, (error) => {
  console.log(error)
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use((response) => {
  if (response.status === 200 || response.status === 201 || response.status === 204) {
    return response.data
  }
}, (error) => {
  let err = error.response
  // 刷新token 500  接口请求token   401    The token has been blacklisted
  if (err.status === 500 || (err.status === 401 && err.data.message === 'The token has been blacklisted')) {
    // The token has been blacklisted token 过了刷新时间
    if (router.currentRoute.fullPath === '/my') {
      store.dispatch('clearLoginInformation')
    } else {
      store.dispatch('clearLoginInformation').then(() => {
        router.push({path: '/login'})
      })
    }
  } else if (err.status === 401 && err.data.message === 'Token has expired') {
    // 过期 先调用刷新接口
    let url = error.config.url
    let method = error.config.method
    let res = service.request({
      url: '/api/authorizations/current',
      method: 'put'
    }).then((res) => {
      store.dispatch('saveToken', {token: res.access_token, time: res.expires_in})
      // 再次调用之前请求接口
      return service.request({
        url: url,
        method: method
      }).then((res) => {
        return res
      })
    })
    return res
  }
  return Promise.reject(error)
})

export default service
