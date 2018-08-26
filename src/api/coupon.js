import request from './request'

export function getCoupon () {
  return request({
    url: '/api/coupons',
    method: 'get'
  })
}

export function receiveCoupon (id) {
  return request({
    url: `/api/coupons/${id}/receives`,
    method: 'post'
  })
}
