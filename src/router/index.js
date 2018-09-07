import Vue from 'vue'
import Router from 'vue-router'
import Tab from 'components/tab/tab'
const Index = () => import('components/index/index')
const Product = () => import('components/product/product')
const Shopcat = () => import('components/shopcat/shopcat')
const My = () => import('components/my/my')
const Skin = () => import('components/skin/skin')
const Address = () => import('components/address/address')
const Login = () => import('components/login/login')
const Verification = () => import('components/login/verification')
const ProductDetail = () => import('components/product-detail/product-detail')

Vue.use(Router)

export default new Router({
  mode: 'history',
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
          path: '/product',
          component: Product
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
      path: '/product/:id',
      component: ProductDetail
    }
  ]
})
