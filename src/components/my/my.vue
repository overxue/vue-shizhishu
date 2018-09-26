<template>
  <div class="my">
    <div class="my-wrapper">
      <div class="my-top" :style="bgStyl" v-if="accessToken && userName">
        <div class="img">
          <img class="image" width="100" height="100" src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKrViabiahwZF1NQZBKpSA5QoibSnKGQE0nljAvpJP8CZgGVbd5AKBRoucJk8a5Ypns2DZdUqq0icU9qw/132">
        </div>
        <div class="top-center">
          <span class="top-text">{{userName}}</span>
        </div>
        <div class="top-bottom">
          <span class="top-bottom-item">{{userPhone}}</span>
        </div>
        <div class="top-pifu" @click="choseskin">
          <i class="iconfont icon">&#xe606;</i>
        </div>
      </div>
      <div class="login" @click="toLogin" v-else>
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
          <router-link to="/address" tag="li" class="bottom-item">
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
            <div class="text" @click="showDetail">
              <p class="title">联系我们</p>
            </div>
            <div class="icon-back">
              <i class="iconfont">&#xe68b;</i>
            </div>
          </li>
        </ul>
      </div>
      <div class="login-out" v-if="accessToken && userName" @click="loginOut">
        <span>退出登录</span>
      </div>
    </div>
    <loading v-show="!userName && accessToken"></loading>
    <confim text="确认退出？" ref="confim" @confirm="confirm"></confim>
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <ul class="supports">
              <li class="support-item">
                <span class="icon phone"></span>
                <span class="text">18656085175</span>
              </li>
              <li class="support-item">
                <span class="icon qq"></span>
                <span class="text">409771385</span>
              </li>
              <li class="support-item">
                <span class="icon wechat"></span>
                <span class="text">xuecong98</span>
              </li>
              <li class="support-item">
                <span class="icon blog"></span>
                <a target="_blank" href="https://overxue.com" class="text">https://overxue.com</a>
              </li>
              <li class="support-item">
                <span class="icon github"></span>
                <a target="_blank" href="https://github.com/overxue" class="text">https://github.com/overxue</a>
              </li>
              <li class="support-item">
                <span class="icon weibo"></span>
                <a target="_blank" href="https://weibo.com/u/3090183841" class="text">https://weibo.com/u/3090183841</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="iconfont icondel">&#xe611;</i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Loading from 'base/loading/loading'
import Confim from 'base/confim/confim'
import { loginOut, getUserInfo } from 'api/login'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      detailShow: false
    }
  },
  created () {
    if (this.accessToken && !this.userName) {
      this._getUserInfo()
    }
  },
  computed: {
    bgStyl () {
      return `background-image: url(${this.backgroundImg})`
    },
    ...mapGetters([
      'backgroundImg',
      'accessToken',
      'userName',
      'userPhone'
    ])
  },
  methods: {
    _getUserInfo () {
      getUserInfo().then((res) => {
        this.saveUserInfo({
          name: res.name,
          phone: res.phone
        })
      })
    },
    choseskin () {
      this.$router.push({
        path: '/skin'
      })
    },
    toLogin () {
      this.$router.push({
        path: '/login'
      })
    },
    loginOut () {
      this.$refs.confim.show()
    },
    confirm () {
      loginOut().then((res) => {
        this.clearLoginInformation()
      }).catch((error) => {
        console.log(error.response.data)
      })
    },
    showDetail () {
      this.detailShow = true
    },
    hideDetail () {
      this.detailShow = false
    },
    ...mapActions([
      'clearLoginInformation',
      'saveToken',
      'saveUserInfo'
    ])
  },
  components: {
    Loading,
    Confim
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
      .login-out
        margin: 20px
        height: 40px
        background: $color-icon
        border-radius: 20px
        text-align: center
        line-height: 40px
        color: $color-font
    .detail
      position: fixed
      z-index: 100
      top: 0
      left: 0
      bottom: 50px
      width: 100%
      overflow: auto
      backdrop-filter: blur(10px)
      opacity: 1
      background: rgba(7, 17, 27, 0.8)
      &.fade-enter-active, &.fade-leave-active
        transition: all 0.5s
      &.fade-enter, &.fade-leave-to
        transform: translate3d(0, -100%, 0)
      .detail-wrapper
        width: 100%
        min-height: 100%
        &.clearfix
          display: inline-block
        .detail-main
          margin-top: 150px
          padding-bottom: 150px
          .supports
            width: 65%
            margin: 0 auto
            .support-item
              padding: 0 12px
              margin-bottom: 12px
              font-size: 0
              &:last-child
                margin-bottom: 0
              .icon
                display: inline-block
                width: 20px
                height: 20px
                vertical-align: top
                margin-right: 6px
                background-size: 20px 20px
                background-repeat: no-repeat
                &.phone
                  bg-image('phone')
                &.wechat
                  bg-image('wechat')
                &.qq
                  bg-image('qq')
                &.github
                  bg-image('github')
                &.weibo
                  bg-image('weibo')
                &.blog
                  bg-image('blog')
              .text
                line-height: 20px
                font-size: 12px
                color: #fff
      .detail-close
        position: relative
        width: 32px
        height: 32px
        margin: -64px auto 0 auto
        clear: both
        line-height: 32px
        text-align: center
        .icondel
          color: #fff
          font-size: 24px
</style>
