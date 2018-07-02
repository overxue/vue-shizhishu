import * as types from './mutation-types'
import {saveBgimg} from 'common/js/cache'

export const saveBackgroundImg = function ({commit}, imgurl) {
  commit(types.SET_BACKGROUND_IMG, saveBgimg(imgurl))
}
