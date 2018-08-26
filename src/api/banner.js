import request from './request'

export function getBanner () {
  return request({
    url: '/api/banners',
    method: 'get'
  })
}
