import Vue from 'vue'
import Router from 'vue-router'
const Index = () => import('components/index/index')
const Shoplist = () => import('components/shoplist/shoplist')
const Shopcat = () => import('components/shopcat/shopcat')
const My = () => import('components/my/my')
const Skin = () => import('components/skin/skin')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/shoplist',
      component: Shoplist
    },
    {
      path: '/shopcat',
      component: Shopcat
    },
    {
      path: '/my',
      component: My,
      children: [
        {
          path: '/my/skin',
          component: Skin
        }
      ]
    }
  ]
})
