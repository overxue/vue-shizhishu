import axios from 'axios'
import {http} from './config'

export function getCategoryProduct (type) {
  const url = `${http}/api/categories?include=products&type=${type}`
  return axios.get(url).then((res) => {
    return Promise.resolve(res)
  }).catch((error) => {
    console.log(error)
  })
}

export function getCateogry () {
  const url = `${http}/api/categories`
  return axios.get(url).then((res) => {
    return Promise.resolve(res)
  }).catch((error) => {
    console.log(error)
  })
}
