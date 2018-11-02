<template>
  <transition name="slide">
    <div class="order-detail">
      <div class="order-tab border-bottom-1px">
        <back @back="back"></back>
        <h1 class="sub">订单详情</h1>
      </div>
      <div class="order-content">
        <scroll class="order-wrapper" ref="orderWrapper">
          <div>
            <div class="detail-top">
              <div class="detail-background"></div>
              <div class="detail-con">
                <div class="detail-stat">交易成功</div>
              </div>
              <div class="detail-img">
                <div class="d-img"></div>
              </div>
            </div>
            <div class="detail-address">
              <div class="address-left">
                <div class="address-icon"></div>
              </div>
              <div class="address-right">
                <div class="right-top">
                  <span class="top-name">{{order.address.contact_name}}</span>
                  <span class="top-phone">{{order.address.contact_phone}}</span>
                </div>
                <div class="right-bottom">{{order.address.address}}</div>
              </div>
            </div>
            <div class="shop-shop">
              <div class="shop-image">
                <img src="../login/login.png" width="20" height="20">
              </div>
              <div class="shop-title">食之蔬</div>
              <div class="shop-right">
                <i class="iconfont icon">&#xe68b;</i>
              </div>
            </div>
            <ul class="shop-goods">
              <li class="goods-wrapper" v-for="(item, index) of order.orderItems.data">
                <div class="goods-image">
                  <img :src="item.product.image" width="90" height="90">
                </div>
                <div class="goods-right">
                  <h1 class="title">{{item.product.title}}</h1>
                  <div>
                    <span class="right-left">购买数量：</span>
                    <span class="right-right">{{item.amount}}</span>
                  </div>
                  <div>
                    <span class="right-left">商品单价：</span>
                    <span class="right-right">{{item.price}}</span>
                  </div>
                  <div>
                    <span class="right-left">商品总价：</span>
                    <span class="right-total">￥112.00</span>
                  </div>
                </div>
              </li>
            </ul>
            <div class="order-mony">
              <div class="money-top">
                <span class="money-t">运费</span>
                <span>￥3.00</span>
              </div>
              <div class="money-top">
                <span class="money-t">优惠券</span>
                <span>￥1.00</span>
              </div>
              <div class="money-top">
                <span class="money-t">实付款（含运费）</span>
                <span class="money-b">￥{{order.total_amount}}</span>
              </div>
            </div>
            <div class="order-mony">
              <div class="money-top">
                <span class="money-t">订单编号</span>
                <span>{{order.no}}</span>
              </div>
              <div class="money-top">
                <span class="money-t">创建时间</span>
                <span>2018-09-09 00:19:09</span>
              </div>
              <div class="money-top money-time">
                <span class="money-t">付款时间</span>
                <span>2018-09-09 00:19:09</span>
              </div>
            </div>
          </div>
        </scroll>
      </div>
    </div>
  </transition>
</template>

<script>
import Back from 'base/back/back'
import Scroll from 'base/scroll/scroll'
import { getDetail } from 'api/order'

export default {
  data () {
    return {
      order: {
        address: {},
        orderItems: {},
        total_amount: '',
        no: ''
      }
    }
  },
  created () {
    this._getGoods()
  },
  methods: {
    _getGoods () {
      getDetail(this.$route.params.id).then((res) => {
        this.order = res
      })
    },
    back () {
      this.$router.back()
    }
  },
  components: {
    Back,
    Scroll
  }
}
</script>

<style scoped lang="stylus" rel="stylesheed/stylus">
  .order-detail
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    background: #f2f2f2
    z-index: 100
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .order-tab
      background: #fff
      .sub
        width: 100%
        text-align: center
        line-height: 44px
        font-size: 18px
    .order-content
      position: absolute
      top: 44px
      bottom: 0
      width: 100%
      .order-wrapper
        overflow: hidden
        height: 100%
        .detail-top
          display: flex
          overflow: hidden
          height: 100px
          width: 100%
          position: relative
          .detail-background
            width: 100%
            height: 100%
            background: linear-gradient(to right, rgb(255, 144, 0), rgb(255, 80, 0)) center center / cover no-repeat
          .detail-con
            position: absolute
            left: 0px
            top: 40.4px
            height: auto
            margin-left: 40px
            flex-direction: column
            width: 160px
            .detail-stat
              color: #fff
              font-size: 16px
          .detail-img
            position: absolute
            height: 100px
            margin-left: 205px
            visibility: visible
            width: 150px
            .d-img
              width: 100%
              height: 100%
              background-image: url("//img.alicdn.com/tps/TB1ww24PVXXXXc6XXXXXXXXXXXX-420-300.png_200x200q85s150.jpg_.webp")
              background-repeat: no-repeat
              background-position: center center
              background-size: contain
        .detail-address
          display: flex
          overflow: hidden
          background: rgb(255, 255, 255)
          flex-direction: row
          align-items: center
          .address-left
            flex: 0 0 auto
            visibility: visible
            margin-left: 10px
            margin-right: 10px
            height: 32px
            width: 32px
            .address-icon
              width: 100%
              height: 100%
              background-image: url("//gw.alicdn.com/tfs/TB1RjOYDr1YBuNjSszhXXcUsFXa-96-96.png_.webp")
              background-repeat: no-repeat
              background-position: center center
              background-size: contain
          .address-right
            display: flex
            overflow: hidden
            flex: 1 1 0%
            margin: 10px 10px 10px 0
            flex-direction: column
            .right-top
              display: flex
              overflow: hidden
              height: 19.2px
              width: 100%
              position: relative
              line-height: 19px
              .top-name
                color: rgb(51, 51, 51)
                font-size: 16px
              .top-phone
                margin-left: 10px
                color: rgb(153, 153, 153)
                font-size: 13px
            .right-bottom
              margin-top: 5px
              color: rgb(51, 51, 51)
              font-size: 14px
              text-overflow: ellipsis
              overflow: hidden
              display: -webkit-box
              -webkit-box-orient: vertical
              -webkit-line-clamp: 2
              line-height: 18px
        .shop-shop
          margin-top: 10px
          display: flex
          background: #fff
          height: 44px
          flex-direction: row
          align-items: center
          .shop-image
            margin-left: 12px
          .shop-title
            margin-left: 8px
            font-size: 12px
            height: 14px
            line-height: 12px
            color: rgb(51, 51, 51)
          .shop-right
            margin-left: 10px
            .icon
              font-size: 14px
        .shop-goods
          display: flex
          flex-direction: column
          background: #fff
          .goods-wrapper
            margin: 10px
            display: flex
            .goods-image
              img
                border-radius: 6px
            .goods-right
              margin-left: 10px
              .title
                font-size: 16px
              div
                margin-top: 10px
                font-size: 12px
                .right-left
                  color: rgb(5, 27, 40)
                .right-right
                  color: rgb(153, 153, 153)
                .right-total
                  color: #f60
        .order-mony
          padding: 10px
          margin-top: 10px
          font-size: 12px
          background: #fff
          color: rgb(61, 66, 68)
          .money-top
            display: flex
            margin-top: 5px
            &.money-time
              color: rgb(61, 66, 68) !important
              font-size: 12px !important
              margin-top: 10px
            &:first-child
              margin-top: 0
            &:last-child
              margin-top: 10px
              color: rgb(102, 102, 102)
              font-size: 14px
            .money-t
              flex: 1
            .money-b
              font-size: 14px
              color: #f60
</style>
