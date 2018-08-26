import {loadBgimg, loadAccessToken, loadExpiresIn} from 'common/js/cache'

const state = {
  // 个人中心背景图片
  backgroundImg: loadBgimg(),
  // 个人信息
  userInfo: {
    name: '',
    phone: ''
  },
  // access_token
  accessToken: loadAccessToken(),
  // 过期时间
  expiredAt: loadExpiresIn()
}

export default state
