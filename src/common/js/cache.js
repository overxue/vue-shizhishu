import storage from 'good-storage'

const BGIMAGE = '__bgImage__'
const ACCESS_TOKEN = '__accessToken__'
const EXPIRES_IN = '__expiresIn__'

export function saveBgimg (imgurl) {
  storage.set(BGIMAGE, imgurl)
  return imgurl
}

export function loadBgimg () {
  return storage.get(BGIMAGE, 'http://oprwd6vhr.bkt.clouddn.com/background/moren.jpg')
}

export function loadAccessToken () {
  return storage.get(ACCESS_TOKEN, '')
}

export function saveAccessToken (token) {
  storage.set(ACCESS_TOKEN, token)
  return token
}

export function clearAccessToken () {
  storage.remove(ACCESS_TOKEN)
  return ''
}

export function saveExpiresIn (time) {
  storage.set(EXPIRES_IN, time)
  return time
}

export function loadExpiresIn () {
  return storage.get(EXPIRES_IN, '')
}

export function clearExpiresIn () {
  storage.remove(EXPIRES_IN)
  return ''
}
