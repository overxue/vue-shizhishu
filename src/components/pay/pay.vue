<template>
  <div class="pay-sub">
    <div class="pat-top border-bottom-1px">
      <back @back="back" class="back"></back>
      <h1 class="sub">确认订单</h1>
    </div>
    <div class="pay-content">
      <scroll class="pay-wrapper" ref="payWrapper">
        <div>
          <div class="content">
            <div class="address">
              <div class="address_border">
                <ul>
                  <li class="address-name">薛聪 186****5175</li>
                  <li class="address-detail">江苏 南京市 栖霞区 城区百水桥南路南湾营文康苑21栋1单元9层904 </li>
                </ul>
              </div>
            </div>
            <ul>
              <li class="shop" v-for="(item, index) of payShop" :key="index">
                <div class="shop-content border-bottom-1px">
                  <div class="image">
                    <img :src="item.product.image" width="75" height="75">
                  </div>
                  <div class="text">
                    <h1 class="title">{{item.title}}</h1>
                    <div class="tot">
                      <span>购买重量：</span>
                      <span class="tot-weight">{{item.amount}}</span>
                    </div>
                    <div class="tot">
                      <span>商品单价：</span>
                      <span class="tot-weight">{{item.product.price}}/{{item.product.unit}}</span>
                    </div>
                    <div class="tot">
                      <span>商品总价：</span>
                      <span class="tot-price">￥{{item.money}}</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div class="coupon-wrapper">
              <div class="coupon border-bottom-1px">
                <div class="coupon-left">支付方式</div>
                <div class="coupon-pay">支付宝</div>
              </div>
              <div class="coupon border-bottom-1px">
                <div class="coupon-left">优惠券</div>
                <div class="coupon-right">暂无优惠券可用</div>
              </div>
            </div>
            <div class="coupon-wrapper">
              <div class="pay-total">
                <div class="coupon-left">商品金额</div>
                <div class="coupon-pay">￥0.06</div>
              </div>
              <div class="pay-total">
                <div class="coupon-left">优惠金额</div>
                <div class="coupon-pay">- ￥0.06</div>
              </div>
              <div class="pay-total border-bottom-1px">
                <div class="coupon-left">配送费</div>
                <div class="coupon-pay">+ ￥3.00</div>
              </div>
              <div class="count">
                <div>共1件，合计：<span class="count-price">￥6.00</span></div>
              </div>
            </div>
          </div>
        </div>
      </scroll>
    </div>
    <div class="bottom">
      <span>￥36</span>
      <small>
        ｜已优惠¥29.7
      </small>
      <div class="submitbtn">去支付</div>
    </div>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Back from 'base/back/back'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'payShop'
    ])
  },
  methods: {
    back () {
      this.$router.back()
    }
  },
  components: {
    Scroll,
    Back
  }
}
</script>

<style scoped lang="stylus" rel="stylesheed/stylus">
  @import "~common/stylus/variable"

  .pay-sub
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    .pat-top
      background: #fff
      .back
        left: 0
      .sub
        width: 100%
        text-align: center
        line-height: 44px
        font-size: 18px
    .pay-content
      position: absolute
      top: 44px
      bottom: 50px
      width: 100%
      .pay-wrapper
        overflow: hidden
        height: 100%
        .content
          background: $color-background
          .address
            height: 90px
            .address_border
              padding: 12px 10px
              position: relative
              padding-bottom: 16px
              background: #fff url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAAAKBAMAAACOO0tGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAMoaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzA2NyA3OS4xNTc3NDcsIDIwMTUvMDMvMzAtMjM6NDA6NDIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQ5QzNCOTcwN0I3RTExRTc5NTRFQ0QxNzZCOTBDQTlGIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQ5QzNCOTZGN0I3RTExRTc5NTRFQ0QxNzZCOTBDQTlGIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDlDM0I5NkI3QjdFMTFFNzk1NEVDRDE3NkI5MENBOUYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDlDM0I5NkM3QjdFMTFFNzk1NEVDRDE3NkI5MENBOUYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7R4hTYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAC1QTFRF////7G1ti7Xo7PP8ncHs8Y2N/vDw7nt70OH2+93d+MPDuNLy9Kam7nV17+fthdCLygAAAFJJREFUKM9jYIAALkHsYAFUnqFJCSvQgMlPxK5fBibPjF2/0gaoPFshdgMCYAaYYNevApNnxa5fPAGmwAm7Ac4w+YPYDZCEyXPj8IHBaBBSIwgBrBY4UQ+sC74AAAAASUVORK5CYII=") -7px bottom repeat-x
              background-size: 64px 5px
              ul
                position: relative
                padding-right: 30px
                &::after
                  content: ""
                  display: inline-block
                  vertical-align: middle
                  margin-top: -2px
                  width: 6px
                  height: 10px
                  background-image: url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 12 20%22%3E%3Cpath fill=%22#CCCCCC%22 fill-rule=%22evenodd%22 d=%22M2 20c-.8 0-1.5-.5-1.8-1.2-.3-.8-.2-1.6.4-2.2L7.2 10 .6 3.4c-.8-.8-.8-2 0-2.8.8-.8 2-.8 2.8 0l8 8c.4.4.6 1 .6 1.4 0 .5-.2 1-.6 1.4l-8 8c-.4.4-1 .6-1.4.6z%22/%3E%3C/svg%3E")
                  background-repeat: no-repeat
                  background-size: 100%
                  position: absolute
                  top: 50%
                  right: 0
                  margin-top: -5px
            .address-name
              font-size: 14px
              font-weight: 700
            .address-detail
              margin-top: 10px
              font-size: 14px
              line-height: 20px
          .coupon-wrapper
            background: #fff
            margin-top: 15px
            .coupon, .pay-total
              padding: 15px 10px
              display: flex
              justify-content: space-between
              .coupon-left
                font-size: 14px
              .coupon-right
                font-size: 14px
                color: $color-sub-theme
              .coupon-pay
                color: $color-tab-color
            .pay-total
              padding: 10px 0
              margin: 0 10px
            .count
              padding: 15px 10px
              text-align: right
              .count-price
                color: $color-shop-color
          .shop
            background: #fff
            &:first-child
              margin-top: 15px
            &:last-child
              .shop-content:after
                display: none
            .shop-content
              padding: 10px
              display: flex
              .image
                flex: 0 0 75px
                width: 75px
              .text
                margin-left: 15px
                .title
                  font-size: 16px
                  font-weight: 700
                .tot
                  margin-top: 5px
                  font-size: 14px
                  span
                    color: #B9B8BD
                  .tot-weight
                    color: #4eb828
                  .tot-price
                    color: $color-shop-color
    .bottom
      position: absolute
      bottom: 0
      left: 0
      width: 100%
      height: 50px
      background: #3c3c3c
      span
        color: #fff
        font-size: 16px
        line-height: 50px
        padding-left: 10px
        vertical-align: middle
      small
        color: #999
        font-size: 12px
        vertical-align: middle
      .submitbtn
        position: absolute
        top: 0
        right: 0
        bottom: 0
        background: #4eb828
        width: 105px
        color: #fff
        font-size: 14px
        text-align: center
        line-height: 50px
</style>
