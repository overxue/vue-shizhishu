import request from './request'

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
