<template>
  <div class="order">
    <div class="order-tab border-bottom-1px">
      <back @back="back"></back>
      <h1 class="sub">全部订单</h1>
    </div>
    <div class="order-content">
      <scroll class="order-wrapper" ref="orderWrapper">
        <ul>
          <router-link tag="li" :to="`/order/${item.id}`" class="order-item" v-for="(item, index) of orders" :key="index">
            <div class="title">
              <img src="../login/login.png" width="20" height="20" class="img">
              <p class="shop-name">食之蔬</p>
              <span class="del">{{item.order_status}}</span>
            </div>
            <div class="content">
              <div class="content-item">
                <scroll :scrollX="scrollX" :scrollY="scrollY" :click="click" class="content-wrapper">
                  <ul ref="imageGroup" class="sell-group">
                    <li class="image" v-for="(ite, ind) of item.orderItems.data" :key="ind">
                      <img v-lazy="ite.product.image" width="75" height="75">
                    </li>
                    <p class="desc" v-if="item.orderItems.data.length === 1">{{item.orderItems.data[0].product.title}}</p>
                  </ul>
                </scroll>
              </div>
              <div class="content-bottom border-bottom-1px">
                <span class="total">共{{item.orderItems.data.length}}件商品</span>
                <span class="money">实付款：</span>
                <span class="mon">￥{{item.total_amount}}</span>
              </div>
            </div>
            <div class="bottom" v-if="item.order_status === '等待买家付款'">
              <div class="border cancel" @click="cancelOrder(item.id)">取消订单</div>
              <div class="border" @click="pay(item.id)">立即支付</div>
            </div>
            <div class="bottom" v-if="item.order_status === '交易关闭'">
              <div class="border cancel" @click="delOrder(item.id)">删除订单</div>
            </div>
          </router-link>
        </ul>
      </scroll>
    </div>
    <loading v-show="!orders.length && !showNull"></loading>
    <svg-loading v-show="show"></svg-loading>
    <div class="no-result-wrapper" v-show="showNull">
      <no-result title="暂无订单，快去下单吧 ~"></no-result>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Back from 'base/back/back'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import SvgLoading from 'base/svg/svg'
import NoResult from 'base/no-result/no-result'
import { getOrders, cancelOrder, delOrder, pay } from 'api/order'

export default {
  name: 'order',
  data () {
    return {
      orders: [],
      scrollX: true,
      scrollY: false,
      click: false,
      show: false,
      showNull: false
    }
  },
  created () {
    this._getOrders()
  },
  methods: {
    _getOrders () {
      getOrders().then((res) => {
        this.orders = res.data
        if (!res.data.length) {
          this.showNull = true
        }
        this.show = false
      })
    },
    back () {
      this.$router.push('/my')
    },
    _initSlider (nVal) {
      nVal.forEach((res, index) => {
        if (res.orderItems.data.length > 1) {
          this.children = this.$refs.imageGroup[index].children
          let margin = 6
          let width = 0 - margin
          for (let i = 0; i < this.children.length; i++) {
            // 单个元素的宽度
            let childWidth = this.children[i].clientWidth + margin
            width += childWidth
          }
          this.$refs.imageGroup[index].style.width = width + 'px'
        }
      })
    },
    cancelOrder (id) {
      this.show = true
      cancelOrder(id).then((res) => {
        this._getOrders()
      })
    },
    delOrder (id) {
      this.show = true
      delOrder(id).then((res) => {
        this._getOrders()
      })
    },
    pay (id) {
      this.show = true
      pay(id).then((res) => {
        this.show = false
        const div = document.createElement('div')
        div.innerHTML = res.form
        document.body.appendChild(div)
        document.forms.alipaysubmit.submit()
      })
    }
  },
  watch: {
    orders (nVal) {
      if (nVal.length > 0) {
        this.$nextTick(() => {
          this._initSlider(nVal)
        })
      }
    }
  },
  components: {
    Back,
    Scroll,
    Loading,
    SvgLoading,
    NoResult
  }
}
</script>

<style scoped lang="stylus" rel="stylesheed/stylus">
  .order
    position: fixed
    top: 0
    bottom: 0
    width: 100%
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
        .order-item
          background: #fff
          margin-top: 15px
          &:first-child
            margin-top: 0
          .title
            display: flex
            padding: 10px
            background: #fff
            line-height: 20px
            .img
              flex: 0 0 20px
            .shop-name
              flex: 1
              line-height: 20px
              margin-left: 5px
              font-size: 14px
            .del
              padding-left: 10px
              font-size: 14px
              color: #d81e06
          .content
            background: #f5f5f5
            .content-item
              padding: 10px
              .content-wrapper
                overflow: hidden
                /*white-space: nowrap*/
                width: 100%
                .sell-group
                  display: flex
                  align-items: center
                  .image
                    flex: 0 0 75px
                    margin-left: 6px
                    width: 75px
                    height: 75px
                    &:first-child
                      margin-left: 0
                  .desc
                    margin-left: 10px
                    font-size: 14px
                    line-height: 18px
            .content-bottom
              background: #fff
              padding: 10px 0
              text-align: right
              .total, .money
                font-size: 14px
              .money
                margin-left: 5px
              .mon
                margin-right: 10px
                font-weight: 700
          .bottom
            padding: 10px
            display: flex
            justify-content: flex-end
            .border
              width: 70px
              height: 30px
              border: 1px solid #d81e49
              border-radius: 5px
              text-align: center
              line-height: 30px
              margin-left: 10px
              font-size: 14px
              color: #d81e06
              &.cancel
                border: 1px solid #d9d9d9
                color: #000
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 40%
      transform: translateY(-50%)
</style>
