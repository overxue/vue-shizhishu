import request from './request'

export function addOrder (id, items, ramark) {
  return request({
    url: '/api/orders',
    method: 'post',
    data: {
      address_id: id,
      items,
      ramark
    }
  })
}
