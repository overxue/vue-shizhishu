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

export function getOrders () {
  return request({
    url: '/api/orders?include=orderItems.product',
    method: 'get'
  })
}

export function cancelOrder (id) {
  return request({
    url: `/api/orders/${id}`,
    method: 'patch'
  })
}

export function delOrder (id) {
  return request({
    url: `/api/orders/${id}`,
    method: 'delete'
  })
}

export function pay (id) {
  return request({
    url: `/api/orders/pay/${id}`,
    method: 'get'
  })
}

export function getDetail (id) {
  return request({
    url: `/api/orders/${id}?include=orderItems.product`,
    method: 'get'
  })
}
