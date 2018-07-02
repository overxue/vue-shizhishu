import * as types from './mutation-types'

const mutations = {
  [types.SET_BACKGROUND_IMG] (state, bgimg) {
    state.backgroundImg = bgimg
  }
}
export default mutations
