import Vue from 'vue'
import Router from 'vue-router'
import Tab from 'components/tab/tab'
const Index = () => import('components/index/index')
const Shoplist = () => import('components/shoplist/shoplist')
const Shopcat = () => import('components/shopcat/shopcat')
const My = () => import('components/my/my')
const Skin = () => import('components/skin/skin')
const Address = () => import('components/address/address')
const Login = () => import('components/login/login')
const Verification = () => import('components/login/verification')
const Shop = () => import('components/shop/shop')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Tab,
      redirect: '/home',
      children: [
        {
          path: '/home',
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
          component: My
        }
      ]
    },
    {
      path: '/my/skin',
      component: Skin,
      meta: {
        auth: true
      }
    },
    {
      path: '/my/address',
      component: Address,
      meta: {
        auth: true
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/login/code',
      component: Verification
    },
    {
      path: '/shop/:id',
      component: Shop
    }
  ]
})
