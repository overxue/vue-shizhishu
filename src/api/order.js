import request from './request'

export function addOrder (id, items, ramark, coupon) {
  return request({
    url: '/api/orders',
    method: 'post',
    data: {
      address_id: id,
      items,
      ramark,
      coupon
    }
  })
}

export function checkAlipay (param) {
  return request({
    url: `/api/payment/alipay/return?${param}`,
    method: 'get'
  })
}
