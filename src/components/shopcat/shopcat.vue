<template>
  <div class="shop">
    <div class="shopcat">
      <scroll class="shopcat-wrapper">
        <transition-group name="list" tag="ul">
          <li :key="cart.product_id" class="shopcat-item" v-for="(cart, index) of carts">
            <div class="shopcat-left" @click="selectProduct(index)">
              <img v-lazy="cart.product.image" width="75" height="75">
              <div class="left-icon">
                <i class="iconfont icon-success" :class="{'icon-success-active': cart.select}">&#xe605;</i>
              </div>
            </div>
            <div class="shopcat-right">
              <span class="right-del" @click="del(cart.id, index)">✘</span>
              <h2 class="right-top">{{cart.product.title}}</h2>
              <span class="right-center">价格:￥{{cart.product.price}}/{{cart.product.unit}}</span>
              <span class="right-bottom">金额:￥{{cart.money}}</span>
              <div class="right-number">
                <input-number :number="cart.amount"></input-number>
              </div>
            </div>
          </li>
        </transition-group>
      </scroll>
    </div>
    <div class="shopcat-bottom" v-show="show">
      <div class="content">
        <div class="content-left">
          <div class="content-all">
            <div class="content-icon" @click="selectAll">
              <i class="iconfont icon-success" :class="{'icon-success-active': selectedAllStatus}">&#xe605;</i>
              <span class="con-all">全选</span>
            </div>
            <div class="content-and">
              <span class="content-heji">合计:</span>
              <span class="content-price">￥<count-up class="content-price" start="10.00" :end="total"></count-up></span>
            </div>
          </div>
        </div>
        <div class="content-right" @click="goPay">
          <div class="pay" :class="{'extra': total > 0}">结算 ({{selectCount}})</div>
        </div>
      </div>
    </div>
    <loading v-show="!carts.length && show"></loading>
    <loading-svg v-show="svgShow"></loading-svg>
    <div class="shop-empty" v-if="!show">
      <div class="empty-top" v-show="!accessToken">
        <router-link tag="div" to="login" class="login">登录</router-link>
        <p class="desc">登录后同步手机购物车中的商品</p>
      </div>
      <div class="empth-center">
        <i class="iconfont icon">&#xe63e;</i>
        <p class="icon-empty">购物车是空的</p>
      </div>
    </div>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import InputNumber from 'base/input/input-number'
import loading from 'base/loading/loading'
import CountUp from 'base/countup/countup'
import LoadingSvg from 'base/svg/svg'
import { getCart, delCart } from 'api/cart'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  data () {
    return {
      carts: [],
      selectedAllStatus: false,
      allStatus: [],
      show: true,
      svgShow: false
    }
  },
  computed: {
    total () {
      let total = 0
      this.carts.forEach((res, index) => {
        if (this.carts[index].select) {
          total += parseFloat(res.money)
        }
      })
      return total.toFixed(2)
    },
    selectCount () {
      if (this.selectedAllStatus) {
        return this.carts.length
      }
      let i = 0
      this.allStatus.map((res) => {
        if (res) {
          i++
        }
      })
      return i
    },
    ...mapGetters([
      'accessToken',
      'shopCat'
    ])
  },
  methods: {
    _getCart () {
      getCart().then((res) => {
        this.carts = res.data
        this.svgShow = false
      })
    },
    selectProduct (index) {
      let product = this.carts[index]
      if (!this.accessToken) {
        product = JSON.parse(JSON.stringify(product))
        this.selectShop(product)
        this.carts = this.shopCat
      } else {
        product.select = !product.select
      }
      let status = []
      this.carts.forEach((res, index) => {
        status[index] = res.select
      })
      this.allStatus = status
      this.allStatus.includes(false) ? this.selectedAllStatus = false : this.selectedAllStatus = true
    },
    selectAll () {
      let status = this.selectedAllStatus
      status = !status
      if (!this.accessToken) {
        this.selectAllProduct(status)
        this.carts = this.shopCat
      } else {
        let sta = []
        this.carts.forEach((res, index) => {
          res.select = status
          sta[index] = status
        })
        this.allStatus = sta
      }
      this.selectedAllStatus = status
    },
    del (id, index) {
      if (!this.accessToken) {
        this.delShop(index)
        this.carts = this.shopCat
        return
      }
      this.svgShow = true
      delCart(id).then((res) => {
        this._getCart()
        this.allStatus.splice(index, 1)
        this.svgShow = false
      })
    },
    goPay () {
      if (!this.selectCount) {
        this.$message.warning('请选择商品')
        return false
      }
      let shop = []
      this.carts.forEach((res) => {
        if (res.select) {
          shop.push(res)
        }
      })
      this.setPayShop(shop)
      this.$router.push('/shop/pay')
    },
    ...mapActions([
      'selectShop',
      'selectAllProduct',
      'delShop'
    ]),
    ...mapMutations({
      setPayShop: 'SET_PAY_SHOP'
    })
  },
  activated () {
    this.show = true
    this.svgShow = true
    if (!this.accessToken) {
      this.carts = this.shopCat
      if (!this.shopCat.length) {
        this.show = false
      } else {
        this.selectedAllStatus = true
        this.carts.forEach((res) => {
          if (!res.select) {
            this.selectedAllStatus = false
          }
        })
      }
      return
    }
    this._getCart()
  },
  watch: {
    carts (nVal, Val) {
      if (!nVal.length) this.show = false
      if (!this.accessToken) return
      let length = Val.length
      let nlength = nVal.length
      if (this.selectedAllStatus && nlength <= length) {
        this.selectedAllStatus = false
        this.selectAll()
      } else {
        let res = this.allStatus.includes(true)
        if (res) {
          if (nlength > length && length > 0) {
            let arra = Array.from({ length: nlength - length }, () => false)
            this.allStatus = [...arra, ...this.allStatus]
            this.selectedAllStatus = false
          }
          nVal.forEach((res, index) => {
            if (this.allStatus[index]) {
              res.select = true
            }
          })
        }
      }
    }
  },
  components: {
    Scroll,
    InputNumber,
    loading,
    CountUp,
    LoadingSvg
  }
}
</script>

<style scoped lang="stylus" rel="stylesheed/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .shop
    position: fixed
    top: 0
    bottom: 50px
    width: 100%
    .shopcat
      position: absolute
      top: 0
      bottom: 50px
      width: 100%
      .shopcat-wrapper
        overflow: hidden
        height: 100%
        .shopcat-item
          display: flex
          padding: 15px
          height: 77.5px
          background: $color-tab-background
          border-1px($color-border)
          &:last-child
            border-none()
          &.list-enter-active
            transition: all .2s linear
          &.list-leave-active
            transition: all .1s linear
          &.list-enter, &.list-leave-to
            height: 0px
            .shopcat-left, .shopcat-right
              display: none
          .shopcat-left
            position: relative
            flex: 0 0 75px
            width: 75px
            margin-right: 10px
            background: $color-background
            .left-icon
              position: absolute
              top: 0
              left: 0
              .icon-success
                font-size: $font-size-large-x
                color: $color-tab-text
                &.icon-success-active
                  color: $color-highlight-background
          .shopcat-right
            position: relative
            overflow: hidden
            flex: 1
            font-size: $font-size-medium
            .right-del
              position: absolute
              top: -10px
              right: -10px
              font-size: $font-size-center
              padding: 10px
              color: $color-tab-text
            .right-top
              font-size: $font-size-medium-x
              no-wrap()
            .right-center
              margin-top: 10px
              display: block
              color: $color-tab-text
            .right-bottom
              display: block
              margin-top: 20px
              color: $color-shop-color
              font-weight: 600
            .right-number
              display: flex
              position: absolute
              right: 0
              bottom: 0
              height: 25px
              line-height: 25px
              background: $color-background
              .num-shu
                padding: 0 5px
                font-size: $font-size-small
                .num-item
                  font-weight: 700
                  color: $color-tab-text
                .num-jian
                  font-size: $font-size-medium
                  font-weight: 900
              .num-weight
                width: 2px
                height: 23px
                background: $color-tab-background
              .num-input
                width: 40px
                height: 25px
                .num-input-item
                  width: 100%
                  height: 100%
                  text-align: center
                  font-weight: 600
                  background: $color-background
    .shopcat-bottom
      position: absolute
      bottom: 0
      left: 0
      width: 100%
      height: 50px
      .content
        display: flex
        background: $color-tab-background
        border-t($color-border)
        border-1px($color-border)
        .content-left
          flex: 1
          .content-all
            display: flex
            justify-content: space-between
            align-items: center
            padding: 0 15px
            height: 100%
            .content-icon
              padding: 5px 0
              .icon-success
                font-size: $font-size-large-x
                color: $color-tab-text
                &.icon-success-active
                  color: $color-highlight-background
              .con-all
                display: inline-block
                vertical-align: top
                margin-top: 5px
                font-size: $font-size-medium
            .content-and
              font-size: $font-size-medium
              .content-price
                font-weight: 700
                color: $color-shop-color
        .content-right
          flex: 0 0 105px
          width: 105px
          .pay
            line-height: 50px
            text-align: center
            font-size: $font-size-medium
            font-weight: 700
            background: $color-tab-text
            color: #fff
            &.extra
              background: $color-highlight-background
    .shop-empty
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      width: 280px
      .empty-top
        display: flex
        align-items: center
        .login
          width: 70px
          height: 25px
          border-radius: 25px
          border: 1px solid $color-tab-color
          text-align: center
          line-height: 25px
          font-size: $font-size-small
        .desc
          margin-left: 10px
          font-size: $font-size-medium
          color: $color-tab-text
      .empth-center
        display: flex
        align-items: center
        justify-content: center
        margin-top: 30px
        .icon
          font-size: 40px
          color: $color-tab-color
        .icon-empty
          margin-left: 10px
          font-size: $font-size-medium
          color: $color-tab-text
</style>
