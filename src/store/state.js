import {loadBgimg, loadAccessToken, loadExpiresIn} from 'common/js/cache'

const state = {
  // 个人中心背景图片
  backgroundImg: loadBgimg(),
  // 个人信息
  userInfo: {
    name: '',
    phone: '',
    email: ''
  },
  // access_token
  access_token: loadAccessToken(),
  // 过期时间
  expires_in: loadExpiresIn()
}

export default state
