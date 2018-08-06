import router from '../../router'
import store from 'store'
import dayjs from 'dayjs'
import {refreshToken} from 'api/login'

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (store.getters.accessToken) {
      if (dayjs().isAfter(dayjs(store.getters.expiresAt))) {
        // token 过期
        console.log('过期')
        refreshToken().then((res) => {
          console.log(res)
        })
      } else {
        next()
      }
    } else {
      next({ path: '/login' })
    }
  } else {
    if (to.path === '/login' && store.getters.accessToken) {
      next({ path: '/' })
    } else {
      next()
    }
  }
})