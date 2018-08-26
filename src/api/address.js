import request from './request'

export function getAddress () {
  return request({
    url: '/api/user/addresses',
    method: 'get'
  })
}

export function defaultAddress (id) {
  return request({
    url: `/api/addresses/${id}/default_addresses`,
    method: 'patch'
  })
}

export function delAddress (id) {
  return request({
    url: `/api/addresses/${id}`,
    method: 'delete'
  })
}
