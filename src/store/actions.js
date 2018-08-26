import * as types from './mutation-types'
import {saveBgimg, saveAccessToken, saveExpiresIn, clearAccessToken, clearExpiresIn} from 'common/js/cache'
import dayjs from 'dayjs'

export const saveBackgroundImg = function ({commit}, imgurl) {
  commit(types.SET_BACKGROUND_IMG, saveBgimg(imgurl))
}

export const saveToken = function ({commit}, {token, time}) {
  let times = dayjs().add(time, 'second').valueOf()
  commit(types.SET_ACCESS_TOKEN, saveAccessToken(token))
  commit(types.SET_EXPIRES_AT, saveExpiresIn(times))
}

export const saveUserInfo = function ({commit}, {name, phone}) {
  commit(types.SET_USER_INFO, {name, phone})
}

export const clearLoginInformation = function ({commit}) {
  commit(types.SET_USER_INFO, {name: '', phone: ''})
  commit(types.SET_EXPIRES_AT, clearExpiresIn())
  commit(types.SET_ACCESS_TOKEN, clearAccessToken())
}
