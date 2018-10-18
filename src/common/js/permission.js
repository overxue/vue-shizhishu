import router from '../../router'
import store from 'store'
import dayjs from 'dayjs'
import { retoken } from 'api/login'

router.beforeEach((to, from, next) => {
  if (store.getters.accessToken) {
    if (to.path === '/login' || to.path === '/code' || to.path === '/register') {
      next({ path: '/' })
    } else {
      console.log(dayjs(store.getters.expiresAt).format('YYYY-MM-DD HH:mm:ss'))
      if (dayjs().isAfter(dayjs(store.getters.expiresAt).subtract(2, 'minute'))) {
        // token 过期
        retoken().then((res) => {
          if (res.access_token) {
            store.dispatch('saveToken', { token: res.access_token, time: res.expires_in })
            next()
          } else if (res.status_code === 500) {
            if (to.matched.some(record => record.meta.auth)) {
              next({ path: '/login' })
            } else {
              store.dispatch('clearLoginInformation')
              next()
            }
          } else {
            next()
          }
        })
      } else {
        next()
      }
    }
  } else {
    if (to.matched.some(record => record.meta.auth)) {
      next({ path: '/login' })
    } else {
      next()
    }
  }
})
