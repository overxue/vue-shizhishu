import axios from 'axios'
import {http} from './config'

export function getCoupon () {
  const url = `${http}/api/coupons`

  return axios.get(url).then((res) => {
    return Promise.resolve(res)
  }).catch((error) => {
    console.log(error)
  })
}
