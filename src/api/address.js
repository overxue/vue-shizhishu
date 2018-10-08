import request from './request'

export function detailAddress (id) {
  return request({
    url: `/api/addresses/${id}`,
    method: 'get'
  })
}

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

export function addAddress (province, city, district, address, name, phone) {
  return request({
    url: '/api/addresses',
    method: 'post',
    data: {
      province,
      city,
      district,
      address,
      contact_name: name,
      contact_phone: phone
    }
  })
}

export function editAddress (province, city, district, address, name, phone, id) {
  return request({
    url: `/api/addresses/${id}`,
    method: 'patch',
    data: {
      province,
      city,
      district,
      address,
      contact_name: name,
      contact_phone: phone
    }
  })
}

export function orderAddress () {
  return request({
    url: '/api/order/addresses',
    method: 'get'
  })
}
