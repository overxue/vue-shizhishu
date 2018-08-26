import request from './request'

export function getCategoryProduct (type) {
  return request({
    url: `/api/categories?include=products&type=${type}`,
    method: 'get'
  })
}

export function getCateogry () {
  return request({
    url: '/api/categories',
    method: 'get'
  })
}
