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

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Tab,
      redirect: '/home',
      children: [{
        path: '/home',
        component: Index
      }]
    },
    {
      path: '/shoplist',
      component: Tab,
      redirect: '/shoplist/index',
      children: [{
        path: '/shoplist/index',
        component: Shoplist
      }]
    },
    {
      path: '/shopcat',
      component: Tab,
      redirect: '/shopcat/index',
      children: [{
        path: '/shopcat/index',
        component: Shopcat
      }]
    },
    {
      path: '/my',
      component: Tab,
      redirect: '/my/index',
      children: [{
        path: '/my/index',
        component: My
      }]
    },
    {
      path: '/my/skin',
      component: Skin
    },
    {
      path: '/my/address',
      component: Address
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
