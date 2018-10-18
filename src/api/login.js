import request from './request'
import axios from 'axios'
import store from 'store'
import { http } from './config'

export function login (username, password) {
  return request({
    url: '/api/authorizations',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function loginOut () {
  return request({
    url: '/api/authorizations/current',
    method: 'delete'
  })
}

export function refreshToken () {
  return request({
    url: '/api/authorizations/current',
    method: 'put'
  })
}

export function getUserInfo () {
  return request({
    url: '/api/user',
    method: 'get'
  })
}

export function getCaptcha (phone, status) {
  return request({
    url: '/api/captchas',
    method: 'post',
    data: {
      phone,
      status
    }
  })
}

export function getCodes (key, code) {
  return request({
    url: '/api/verificationCodes',
    method: 'post',
    data: {
      captcha_key: key,
      captcha_code: code
    }
  })
}

export function Codelogin (key, code) {
  return request({
    url: '/api/code/authorizations',
    method: 'post',
    data: {
      verification_key: key,
      verification_code: code
    }
  })
}

export function register (key, code, name, password) {
  return request({
    url: '/api/users',
    method: 'post',
    data: {
      verification_key: key,
      verification_code: code,
      name,
      password
    }
  })
}

export function retoken () {
  const url = `${http}/api/authorizations/current`
  return axios.put(url, [], { headers: { 'Authorization': `Bearer ${store.getters.accessToken}` } }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((error) => {
    return Promise.resolve(error.response.data)
  })
}
