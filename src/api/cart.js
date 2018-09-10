import request from './request'

export function addCart (product_id, amount) {
  return request({
    url: '/api/carts',
    method: 'post',
    data: {
      product_id,
      amount
    }
  })
}

export function getCart () {
  return request({
    url: '/api/carts?include=product',
    method: 'get'
  })
}

export function delCart (id) {
  return request({
    url: `/api/carts/${id}`,
    method: 'delete'
  })
}
