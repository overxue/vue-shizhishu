import storage from 'good-storage'

const SEARCH_KEY = '__bgimage__'

export function saveBgimg (imgurl) {
  storage.set(SEARCH_KEY, imgurl)
  return imgurl
}

export function loadBgimg () {
  return storage.get(SEARCH_KEY, 'http://oprwd6vhr.bkt.clouddn.com/background/moren.jpg')
}
