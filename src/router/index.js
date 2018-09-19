import Vue from 'vue'
import Router from 'vue-router'
import Tab from 'components/tab/tab'
const Index = () => import('components/index/index')
const Product = () => import('components/product/product')
const Shopcat = () => import('components/shopcat/shopcat')
const My = () => import('components/my/my')
const Skin = () => import('components/skin/skin')
const Address = () => import('components/address/address')
const AddressDetail = () => import('components/address-detail/address-detail')
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
      children: [
        {
          path: '/',
          component: Index
        },
        {
          path: '/product',
          name: 'product',
          component: Product
        },
        {
          path: '/shopcat',
          name: 'shopcat',
          component: Shopcat
        },
        {
          path: '/my',
          name: 'my',
          component: My
        }
      ]
    },
    {
      path: '/skin',
      component: Skin,
      meta: {
        auth: true
      }
    },
    {
      path: '/address',
      component: Address,
      children: [
        {
          path: 'add',
          component: AddressDetail
        }
      ],
      meta: {
        auth: true
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/code',
      component: Verification,
      meta: {
        title: '登 录'
      }
    },
    {
      path: '/register',
      component: Verification,
      meta: {
        title: '注册'
      }
    },
    {
      path: '/goods/:id',
      component: ProductDetail
    }
  ]
})
