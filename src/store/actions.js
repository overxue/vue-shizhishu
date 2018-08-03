import * as types from './mutation-types'
import {saveBgimg, saveAccessToken, saveExpiresIn} from 'common/js/cache'
import dayjs from 'dayjs'

export const saveBackgroundImg = function ({commit}, imgurl) {
  commit(types.SET_BACKGROUND_IMG, saveBgimg(imgurl))
}

export const saveToken = function ({commit}, {token, time}) {
  let times = dayjs().add(time, 'second').valueOf()
  commit(types.SET_ACCESS_TOKEN, saveAccessToken(token))
  commit(types.SET_EXPIRES_IN, saveExpiresIn(times))
}
