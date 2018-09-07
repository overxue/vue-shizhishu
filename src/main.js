import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import 'common/stylus/index.styl'
import 'common/js/permission'
import Message from 'common/js/message'

Vue.config.productionTip = false

fastclick.attach(document.body)
Vue.use(VueLazyLoad, {
  loading: require('common/image/default.jpg')
})
Vue.use(Message)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
