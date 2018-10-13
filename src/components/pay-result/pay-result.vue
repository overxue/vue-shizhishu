<template>
  <div class="pay-result">
    <div class="background">
      <div class="top">
        <div class="circle">
          <i class="iconfont radius-icon">&#xe61f;</i>
        </div>
        <p class="success">支付成功</p>
      </div>
      <div class="center">
        <span>实付 ￥{{this.$route.query.total_amount}}</span>
      </div>
      <div class="bottom">
        <router-link replace tag="div" to="/" class="left">
          返回首页
        </router-link>
        <router-link replace tag="div" to="/order" class="right">
          查看订单
        </router-link>
      </div>
    </div>
    <back @back="back"></back>
  </div>
</template>

<script>
import { checkAlipay } from 'api/order'
import Back from 'base/back/back'

export default {
  created () {
    if (!this.$route.query.total_amount) {
      this.$router.back()
    } else {
      this._check()
    }
  },
  methods: {
    _check () {
      checkAlipay(this._params(this.$route.query)).then((res) => {
        if (res.status === 0) {
          // 正确
        }
      })
    },
    _params (param) {
      return Object.keys(param).map(function (key) {
        return `${encodeURIComponent(key)}=${encodeURIComponent(param[key])}`
      }).join('&')
    },
    back () {
      this.$router.replace('/shopcat')
    }
  },
  components: {
    Back
  }
}
</script>

<style scoped lang="stylus" rel="stylesheed/stylus">
  @import '~common/stylus/variable'
  .pay-result
    >>> .icon
      color: #fff
    .background
      width: 100%
      height: 200px
      background: $color-highlight-background
      text-align: center
      .top
        display: flex
        justify-content: center
        padding-top: 50px
        color: #fff
        .circle
          width: 20px
          height: 20px
          border-radius: 50%
          background: #f5efe3
          line-height: 25px
          .radius-icon
            font-weight: 700
            color: #ff8000
        .success
          margin-left: 5px
          font-size: $font-size-center
      .center
        margin-top: 15px
        font-size: 14px
        color: #f5efe3
      .bottom
        display: flex
        justify-content: center
        margin-top: 30px
        .left, .right
          width: 90px
          height: 30px
          border-radius: 15px
          border: 1px solid #fff
          color: #fff
          font-size: 14px
          line-height: 30px
        .right
          margin-left: 30px
</style>
