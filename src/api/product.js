import request from './request'

export function getProductDetail (id) {
  return request({
    url: `/api/products/${id}?include=productImages`,
    methods: 'get'
  })
}
