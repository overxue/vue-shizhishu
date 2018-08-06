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
  }
}
export default mutations
