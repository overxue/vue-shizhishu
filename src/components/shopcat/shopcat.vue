<template>
  <div class="shop">
    <div class="shopcat">
      <scroll class="shopcat-wrapper">
        <transition-group name="list" tag="ul">
          <li :key="cart.id" class="shopcat-item" v-for="(cart, index) of carts">
            <div class="shopcat-left" @click="selectProduct(index)">
              <img :src="cart.product.image" width="75" height="75">
              <div class="left-icon">
                <i class="iconfont icon-success" :class="{'icon-success-active': cart.select}">&#xe605;</i>
              </div>
            </div>
            <div class="shopcat-right">
              <span class="right-del" @click="del(cart.id)">✘</span>
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
    <div class="shopcat-bottom">
      <div class="content">
        <div class="content-left">
          <div class="content-all">
            <div class="content-icon" @click="selectAll">
              <i class="iconfont icon-success" :class="{'icon-success-active': selectedAllStatus}">&#xe605;</i>
              <span class="con-all">全选</span>
            </div>
            <div class="content-and">
              <span class="content-heji">合计:</span>
              <span class="content-price">￥212.36</span>
            </div>
          </div>
        </div>
        <div class="content-right">
          <div class="pay">结算</div>
        </div>
      </div>
    </div>
    <loading v-show="!carts.length"></loading>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import InputNumber from 'base/input/input-number'
import { getCart, delCart } from 'api/cart'
import loading from 'base/loading/loading'

export default {
  data () {
    return {
      carts: [],
      selectedAllStatus: false
    }
  },
  methods: {
    _getCart () {
      getCart().then((res) => {
        this.carts = res.data
      })
    },
    selectProduct (index) {
      let product = this.carts[index]
      product.select = !product.select
      let allStatus = []
      this.carts.forEach((res, index) => {
        allStatus[index] = res.select
      })
      allStatus.includes(false) ? this.selectedAllStatus = false : this.selectedAllStatus = true
    },
    selectAll () {
      let status = this.selectedAllStatus
      status = !status
      this.carts.forEach((res) => {
        res.select = status
      })
      this.selectedAllStatus = status
    },
    del (id) {
      delCart(id).then((res) => {
        this._getCart()
      })
    }
  },
  activated () {
    this._getCart()
  },
  components: {
    Scroll,
    InputNumber,
    loading
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
    background: $color-background
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
          &.list-leave-active
            transition: all .1s linear
          &.list-leave-to
            height: 0px
            .shopcat-left, .shopcat-right
              display: none
          .shopcat-left
            position: relative
            flex: 0 0 75px
            width: 75px
            margin-right: 10px
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
            background: $color-highlight-background
            color: #fff
</style>
