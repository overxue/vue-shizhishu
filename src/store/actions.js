import * as types from './mutation-types'
import { saveBgimg, saveAccessToken, saveExpiresIn, clearAccessToken, clearExpiresIn, ShopCat } from 'common/js/cache'
import dayjs from 'dayjs'

export const saveBackgroundImg = function ({ commit }, imgurl) {
  commit(types.SET_BACKGROUND_IMG, saveBgimg(imgurl))
}

export const saveToken = function ({ commit }, { token, time }) {
  let times = dayjs().add(time, 'second').valueOf()
  commit(types.SET_ACCESS_TOKEN, saveAccessToken(token))
  commit(types.SET_EXPIRES_AT, saveExpiresIn(times))
}

export const saveUserInfo = function ({ commit }, { name, phone }) {
  commit(types.SET_USER_INFO, { name, phone })
}

export const clearLoginInformation = function ({ commit }) {
  commit(types.SET_USER_INFO, { name: '', phone: '' })
  commit(types.SET_EXPIRES_AT, clearExpiresIn())
  commit(types.SET_ACCESS_TOKEN, clearAccessToken())
}

export const saveShopCat = function ({ commit, state }, shop) {
  let shopCat = state.shopCat.slice()
  let fpIndex = findIndex(shopCat, shop)
  // 如果已经包含了商品
  if (fpIndex > -1) {
    shop.money += shopCat[fpIndex].money
    shop.amount += shopCat[fpIndex].amount
    shop.select = shopCat[fpIndex].select
    shopCat.splice(fpIndex, 1)
  }
  let index = fpIndex === -1 ? 0 : fpIndex
  shopCat.splice(index, 0, shop)
  commit(types.SET_SHOP_CAT, ShopCat(shopCat))
}

function findIndex (shopCat, shop) {
  return shopCat.findIndex((item) => {
    return item.product_id === shop.product_id
  })
}
