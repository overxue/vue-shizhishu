<template>
  <div class="pay-sub">
    <div class="pat-top border-bottom-1px">
      <back @back="back"></back>
      <h1 class="sub">确认订单</h1>
    </div>
    <div class="pay-content">
      <scroll class="pay-wrapper" ref="payWrapper">
        <div>
          <div class="content">
            <router-link tag="div" to="/choose/address" class="address">
              <div class="address_border" v-if="address.id">
                <ul>
                  <li class="address-name">{{address.contact_name}} {{address.contact_phone}}</li>
                  <li class="address-detail">{{address.fulladdress}}</li>
                </ul>
              </div>
              <div v-else>
                <div class="address_null">
                  <h3>！请填写收货地址</h3>
                </div>
                <div class="address_new_border"></div>
              </div>
            </router-link>
            <ul>
              <li class="shop" v-for="(item, index) of payShop" :key="index">
                <div class="shop-content border-bottom-1px">
                  <div class="image">
                    <img :src="item.product.image" width="75" height="75">
                  </div>
                  <div class="text">
                    <h1 class="title">{{item.product.title}}</h1>
                    <div class="tot">
                      <span v-if="item.product.unit !== '斤'">购买数量：</span>
                      <span v-else>购买重量：</span>
                      <span class="tot-weight" v-if="item.product.unit !== '斤'">{{item.amount}}</span>
                      <span class="tot-weight" v-else>{{item.amount}}g</span>
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
              <div class="coupon border-bottom-1px" @click="goCoupon">
                <div class="coupon-left">优惠券</div>
                <div class="coupon-back" v-if="totalCoupon.tot > 0 && !chCoupon.id">
                  <div class="coupon-center">
                    <span class="hongbao">
                      <svg t="1539009865568" class="icon" style="" viewBox="0 0 1064 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5054" xmlns:xlink="http://www.w3.org/1999/xlink" width="12.46875" height="12"><path d="M-48.606208 883.816448" p-id="5055" fill="#ffffff"></path><path d="M1041.337344 883.816448" p-id="5056" fill="#ffffff"></path><path d="M39.621632 864.801792" p-id="5057" fill="#ffffff"></path><path d="M509.394944 422.965248c6.775808 6.750208 14.449664 10.349568 23.615488 10.123264 9.629696-0.24576 17.088512-3.618816 23.604224-10.123264L917.02272 63.525888 148.996096 63.525888 509.394944 422.965248z" p-id="5058" fill="#ffffff"></path><path d="M84.430848 922.140672c0 21.199872 17.82784 39.027712 39.028736 39.027712l819.098624 0c21.20192 0 39.023616-17.82784 39.023616-39.027712L981.581824 129.54112 622.142464 488.49408c-23.875584 23.849984-54.44608 37.581824-89.132032 37.581824-34.210816 0-65.047552-13.008896-89.621504-37.581824L84.430848 129.54112 84.430848 922.140672z" p-id="5059" fill="#ffffff"></path><path d="M1026.39616 864.801792" p-id="5060" fill="#ffffff"></path></svg>
                    </span>
                    <span class="hongbao-1DGEt">{{totalCoupon.tot}}张可用</span>
                  </div>
                  <i class="iconfont back">&#xe68b;</i>
                </div>
                <div class="coupon-right" v-else-if="totalCoupon.tot == 0">暂无优惠券可用</div>
                <div to="/choose/coupon" tag="div" class="coupon-right" v-else>- ￥{{chCoupon.money}}</div>
              </div>
            </div>
            <div class="coupon-wrapper">
              <div class="pay-total">
                <div class="coupon-left">商品总金额</div>
                <div class="coupon-pay">￥{{shopMoney}}</div>
              </div>
              <div class="pay-total">
                <div class="coupon-left">优惠金额</div>
                <div class="coupon-pay">- ￥{{chCoupon.money}}</div>
              </div>
              <div class="pay-total border-bottom-1px">
                <div class="coupon-left">配送费</div>
                <div class="coupon-pay">+ ￥3.00</div>
              </div>
              <div class="count">
                <div>共{{payShop.length}}件，合计：<span class="count-price">￥{{total}}</span></div>
              </div>
            </div>
          </div>
        </div>
      </scroll>
    </div>
    <div class="bottom">
      <span>￥{{total}}</span>
      <small>
        ｜已优惠¥{{chCoupon.money}}
      </small>
      <div class="submitbtn" @click="goPay">去支付</div>
    </div>
    <svg-loading v-show="showSvg"></svg-loading>
    <loading v-show="Object.keys(this.totalCoupon) == 0 && Object.keys(this.address) == 0"></loading>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Back from 'base/back/back'
import SvgLoading from 'base/svg/svg'
import Loading from 'base/loading/loading'
import { orderAddress, detailAddress } from 'api/address'
import { orderCouponCount } from 'api/coupon'
import { addOrder } from 'api/order'
import { mapGetters, mapMutations } from 'vuex'

export default {
  beforeRouteLeave (to, from, next) {
    if (to.path !== '/choose/coupon' && to.path !== '/choose/address') {
      this.setChooseCoupon({ id: '', money: '0.00' })
    }
    next()
  },
  data () {
    return {
      address: {},
      totalCoupon: {},
      showSvg: false
    }
  },
  computed: {
    shopMoney () {
      let money = 0
      this.payShop.map((item) => {
        money += parseFloat(item.money)
      })
      return money.toFixed(2)
    },
    total () {
      return (parseFloat(this.shopMoney) + parseInt(3) - parseInt(this.chCoupon.money)).toFixed(2)
    },
    ...mapGetters([
      'payShop',
      'addressId',
      'chCoupon'
    ])
  },
  methods: {
    back () {
      this.$router.back()
    },
    _orderCoupon () {
      orderCouponCount(this.shopMoney).then((res) => {
        this.totalCoupon = res
        this.showSvg = false
      })
    },
    _orderAddress () {
      orderAddress().then((res) => {
        if (res.default_address || res.last_used) {
          this.address = res
          this.setAddressId(res.id)
        }
      })
    },
    _detialAddress (id) {
      detailAddress(id).then((res) => {
        this.address = res
        this.showSvg = false
        this.$nextTick(() => {
          this.$refs.payWrapper.refresh()
        })
      })
    },
    goCoupon () {
      if (this.totalCoupon.tot === 0) {
        return
      }
      this.setTotalMoney(this.shopMoney)
      this.$router.push('/choose/coupon')
    },
    goPay () {
      if (!this.address.id) {
        this.$message.error('请选择地址')
        return
      }
      let id = this.address.id
      let items = []
      this.payShop.map((item) => {
        items.push({
          id: item.product_id,
          amount: item.amount
        })
      })
      let ramark = '我是备注，哈哈'
      this._addOrder(id, items, ramark)
    },
    _addOrder (id, items, ramark) {
      addOrder(id, items, ramark).then((res) => {
        this.message.success('下单成功')
      })
    },
    ...mapMutations({
      setAddressId: 'SET_ADDRESS_ID',
      setTotalMoney: 'SET_TOTAL_MONEY',
      setChooseCoupon: 'SET_CHOOSE_COUPON'
    })
  },
  activated () {
    if (!this.payShop.length) {
      this.$router.back()
      return
    }
    if (!this.chCoupon.id) {
      this.showSvg = true
      this._orderCoupon()
    }
    if (!this.addressId) {
      this._orderAddress()
    } else if (this.addressId !== this.address.id) {
      this.showSvg = true
      this._detialAddress(this.addressId)
    }
    this.$refs.payWrapper.refresh()
  },
  components: {
    Scroll,
    Back,
    SvgLoading,
    Loading
  }
}
</script>

<style scoped lang="stylus" rel="stylesheed/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .pay-sub
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    .pat-top
      background: #fff
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
                  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMiAyMCI+PHBhdGggZmlsbD0iI0NDQ0NDQyIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMiAyMGMtLjggMC0xLjUtLjUtMS44LTEuMi0uMy0uOC0uMi0xLjYuNC0yLjJMNy4yIDEwIC42IDMuNGMtLjgtLjgtLjgtMiAwLTIuOC44LS44IDItLjggMi44IDBsOCA4Yy40LjQuNiAxIC42IDEuNCAwIC41LS4yIDEtLjYgMS40bC04IDhjLS40LjQtMSAuNi0xLjQuNnoiLz48L3N2Zz4=")
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
            .address_null
              position: relative
              background: #fff
              padding: 0 10px 5px
              h3
                position: relative
                padding: 15px 0
                font-size: 14px
                font-weight: 400
                line-height: 16px
                &::after
                  content: ""
                  display: inline-block
                  vertical-align: middle
                  margin-top: -2px
                  width: 6px
                  height: 10px
                  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMiAyMCI+PHBhdGggZmlsbD0iI0NDQ0NDQyIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMiAyMGMtLjggMC0xLjUtLjUtMS44LTEuMi0uMy0uOC0uMi0xLjYuNC0yLjJMNy4yIDEwIC42IDMuNGMtLjgtLjgtLjgtMiAwLTIuOC44LS44IDItLjggMi44IDBsOCA4Yy40LjQuNiAxIC42IDEuNCAwIC41LS4yIDEtLjYgMS40bC04IDhjLS40LjQtMSAuNi0xLjQuNnoiLz48L3N2Zz4=')
                  background-repeat: no-repeat
                  background-size: 100%
                  position: absolute
                  top: 50%
                  right: 0
                  margin-top: -5px
            .address_new_border
              transition: .2s ease
              position: relative
              padding-bottom: 10px
              background: #fff url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAAAKBAMAAACOO0tGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAMoaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzA2NyA3OS4xNTc3NDcsIDIwMTUvMDMvMzAtMjM6NDA6NDIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQ5QzNCOTcwN0I3RTExRTc5NTRFQ0QxNzZCOTBDQTlGIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQ5QzNCOTZGN0I3RTExRTc5NTRFQ0QxNzZCOTBDQTlGIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDlDM0I5NkI3QjdFMTFFNzk1NEVDRDE3NkI5MENBOUYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDlDM0I5NkM3QjdFMTFFNzk1NEVDRDE3NkI5MENBOUYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7R4hTYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAC1QTFRF////7G1ti7Xo7PP8ncHs8Y2N/vDw7nt70OH2+93d+MPDuNLy9Kam7nV17+fthdCLygAAAFJJREFUKM9jYIAALkHsYAFUnqFJCSvQgMlPxK5fBibPjF2/0gaoPFshdgMCYAaYYNevApNnxa5fPAGmwAm7Ac4w+YPYDZCEyXPj8IHBaBBSIwgBrBY4UQ+sC74AAAAASUVORK5CYII=") -7px bottom repeat-x
              background-size: 60px 4px
          .coupon-wrapper
            background: #fff
            margin-top: 15px
            .coupon, .pay-total
              padding: 15px 10px
              display: flex
              justify-content: space-between
              .coupon-left
                font-size: 14px
              .coupon-back
                display: flex
                .coupon-center
                  background-image: linear-gradient(106deg,#ff7417,#ff3c15)
                  min-width: 50px
                  text-align: center
                  border-radius: 2px
                  .hongbao
                    margin-left: 3px
                    margin-right: 3px
                  .hongbao-1DGEt
                    margin-right: 3px
                    color: #fff
                    font-size: 12px
                    line-height: 16px
                    vertical-align: top
                .back
                  margin-left: 4px
                  color: #bbb
              .coupon-right
                font-size: 14px
                color: $color-sub-theme
              .coupon-pay
                font-size: 14px
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
                flex: 1
                overflow: hidden
                margin-left: 15px
                .title
                  font-size: 16px
                  font-weight: 700
                  no-wrap()
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
