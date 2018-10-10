import * as types from './mutation-types'

const mutations = {
  [types.SET_BACKGROUND_IMG] (state, imgurl) {
    state.backgroundImg = imgurl
  },
  [types.SET_ACCESS_TOKEN] (state, token) {
    state.accessToken = token
  },
  [types.SET_EXPIRES_AT] (state, time) {
    state.expiredAt = time
  },
  [types.SET_USER_INFO] (state, { name, phone }) {
    state.userInfo.name = name
    state.userInfo.phone = phone
  },
  [types.SET_SHOP_CAT] (state, shopcat) {
    state.shopCat = shopcat
  },
  [types.SET_PAY_SHOP] (state, shop) {
    state.payShop = shop
  },
  [types.SET_ADDRESS_ID] (state, id) {
    state.addressId = id
  },
  [types.SET_TOTAL_MONEY] (state, money) {
    state.totalMoney = money
  },
  [types.SET_CHOOSE_COUPON] (state, coupon) {
    state.chooseCoupon = coupon
  }
}
export default mutations
