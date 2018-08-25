import request from './request'

export function getAddress () {
  const url = '/api/user/addresses'

  return request({
    url: url,
    method: 'get'
  })
}

export function defaultAddress (id) {
  const url = `/api/addresses/${id}/default_addresses`

  return request({
    url: url,
    method: 'patch'
  })
}

export function delAddress (id) {
  const url = `/api/addresses/${id}`

  return request({
    url: url,
    method: 'delete'
  })
}
