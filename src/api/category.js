import axios from 'axios'
import {http} from './config'

export function getCategoryProduct () {
  const url = `${http}/api/categories?include=products`
  return axios.get(url).then((res) => {
    return Promise.resolve(res)
  }).catch((error) => {
    console.log(error)
  })
}
