import * as types from './mutation-types'

const mutations = {
  [types.SET_BACKGROUND_IMG] (state, imgurl) {
    state.backgroundImg = imgurl
  },
  [types.SET_ACCESS_TOKEN] (state, token) {
    state.access_token = token
  },
  [types.SET_EXPIRES_IN] (state, time) {
    state.expires_in = time
  }
}
export default mutations
