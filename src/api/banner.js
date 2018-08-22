import axios from 'axios'
import {http} from './config'

export function getBanner () {
  const url = `${http}/api/banners`

  return axios.get(url).then((res) => {
    return Promise.resolve(res)
  }).catch((error) => {
    console.log(error)
  })
}
