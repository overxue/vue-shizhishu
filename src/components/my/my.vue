<template>
  <div class="my">
    <div class="my-wrapper">
      <!--<div class="my-top" :style="bgStyl">-->
        <!--<div class="img">-->
          <!--<img class="image" width="100" height="100" src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKrViabiahwZF1NQZBKpSA5QoibSnKGQE0nljAvpJP8CZgGVbd5AKBRoucJk8a5Ypns2DZdUqq0icU9qw/132">-->
        <!--</div>-->
        <!--<div class="top-center">-->
          <!--<span class="top-text">薛聪</span>-->
        <!--</div>-->
        <!--<div class="top-bottom">-->
          <!--<span class="top-bottom-item">186****5175</span>-->
        <!--</div>-->
        <!--<div class="top-pifu" @click="choseskin">-->
          <!--<i class="iconfont icon">&#xe606;</i>-->
        <!--</div>-->
      <!--</div>-->
      <div class="login" @click="toLogin">
        <div class="login-image">
          <img src="https://gw.alicdn.com/tfscom/TB1_n4PKXXXXXcYXXXXNx3t4VXX-120-120.jpg_q30" width="80" height="80">
        </div>
        <div class="login-desc">
          <span>登录 / 注册</span>
        </div>
        <div class="background">
          <img width="100%" height="100%" src="http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg">
        </div>
      </div>
      <div class="my-bottom">
        <ul>
          <li class="bottom-item">
            <div class="icon">
              <i class="iconfont icon-item">&#xe8c3;</i>
            </div>
            <div class="text">
              <p class="title">我的订单</p>
            </div>
            <div class="icon-back">
              <i class="iconfont">&#xe68b;</i>
            </div>
          </li>
          <li class="bottom-item">
            <div class="icon">
              <i class="iconfont icon-item">&#xe65f;</i>
            </div>
            <div class="text">
              <p class="title">我的优惠券</p>
            </div>
            <div class="icon-back">
              <i class="iconfont">&#xe68b;</i>
            </div>
          </li>
          <router-link to="/my/address" tag="li" class="bottom-item">
            <div class="icon">
              <i class="iconfont icon-item">&#xe6d7;</i>
            </div>
            <div class="text">
              <p class="title">地址管理</p>
            </div>
            <div class="icon-back">
              <i class="iconfont">&#xe68b;</i>
            </div>
          </router-link>
          <li class="bottom-item">
            <div class="icon">
              <i class="iconfont icon-item">&#xe626;</i>
            </div>
            <div class="text">
              <p class="title">联系我们</p>
            </div>
            <div class="icon-back">
              <i class="iconfont">&#xe68b;</i>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    bgStyl () {
      return `background-image: url(${this.backgroundImg})`
    },
    ...mapGetters([
      'backgroundImg'
    ])
  },
  methods: {
    choseskin () {
      this.$router.push({
        path: '/my/skin'
      })
    },
    toLogin () {
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheed/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .my
    position: fixed
    top: 0
    bottom: 50px
    width: 100%
    .my-wrapper
      overflow: hidden
      height: 100%
      .login
        position: relative
        display: flex
        align-items: center
        width: 100%
        height: 120px
        background: rgba(7,17,27,.5)
        overflow: hidden
        .login-image
          margin-left: 10px
          img
            border-radius: 50%
        .login-desc
          margin-left: 10px
          color: #fff
        .background
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
          z-index: -1
          filter: blur(10px)
      .my-top
        position: relative
        width: 100%
        height: 200px
        text-align: center
        background-size: cover
        color: $color-tab-background
        .img
          .image
            margin-top: 20px
            border-radius: 50%
        .top-center
          margin-top: 10px
          .top-text
            font-size: $font-size-large-x
            text-shadow: 1px 1px 0 rgba(0, 0, 0, .6)
        .top-bottom
          margin-top: 10px
          .top-bottom-item
            font-size: $font-size-medium
            text-shadow: 1px 1px 0 rgba(0, 0, 0, .6)
        .top-pifu
          position: absolute
          top: 5px
          right: 5px
          .icon
            display: block
            padding: 10px
            font-size: 30px
      .my-bottom
        margin-top: 15px
        background: $color-tab-background
        .bottom-item
          display: flex
          margin: 0 10px
          height: 40px
          border-1px($color-border)
          line-height: 40px
          &:nth-child(2)
            .icon-item
              color: $color-icon!important
          &:last-child
            border-none()
            .icon-item
              color: $color-icon!important
          .icon
            flex: 0 0 20px;
            margin-right: 10px
            .icon-item
              color: $color-highlight-background
              font-size: $font-size-center
          .text
            flex: 1
            .title
              font-size: $font-size-medium
          .icon-back
            flex: 0 0 auto
            color: $color-tab-color
</style>
