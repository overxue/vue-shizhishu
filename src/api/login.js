import axios from 'axios'

export function login (username, password) {
  const url = 'http://shizhishu.test/api/authorizations'
  return axios.post(url, {
    username: username,
    password: password
  }).then((res) => {
    return Promise.resolve(res)
  }).catch((error) => {
    return Promise.resolve(error.response)
  })
}
