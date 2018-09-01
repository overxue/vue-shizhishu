<template>
  <div class="verification">
    <back @back="back"></back>
    <div class="ver-item">
      <div class="inputContent">
        <div class="image">
          <img src="./login.png" width="80" height="80"/>
        </div>
        <div class="userinput">
          <input type="text" placeholder="请输入手机号" class="input-item" v-model="login.phone"/>
          <i class="iconfont icon-x">&#xe611;</i>
        </div>
        <div class="passwordinput" v-if="captcha_image_content">
          <input type="text" placeholder="请输入验证码" class="password" />
          <i class="iconfont icon-xx">&#xe611;</i>
          <img width="120" height="40" :src="captcha_image_content" @click="getCaptcha"/>
        </div>
        <div class="log">
          <span class="text" @click="getCaptcha">获取验证码</span>
        </div>
        <div class="login-bottom">
          <router-link to="/login" class="message-login" tag="span">账户密码登录</router-link><span class="register">新用户注册</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Back from 'base/back/back'
import {getCaptcha} from 'api/login'
export default {
  data () {
    return {
      login: {
        phone: ''
      },
      captcha_image_content: '',
      expired_at: '',
      captcha_key: ''
    }
  },
  methods: {
    getCaptcha () {
      getCaptcha(this.login.phone, 'login').then((res) => {
        this.captcha_image_content = res.captcha_image_content
        this.expired_at = res.expired_at
        this.captcha_key = res.captcha_key
      })
    },
    back () {
      this.$router.back()
    }
  },
  components: {
    Back
  }
}
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .verification
    position: fixed
    top: 0
    bottom: 0
    z-index: 100
    width: 100%
    background: $color-background
    .ver-item
      position: absolute
      top: 40%
      left: 50%
      transform: translate(-50%, -50%)
      width: 100%
      .inputContent
        padding: 0 20px
        .image
          text-align: center
          margin-bottom: 40px
        .userinput, .passwordinput
          display: flex
          align-items: center
          width: 100%
          height: 50px
          border-1px($color-border)
          .input-item
            flex: 1
            width: 100%
            height: 30px
            background: $color-background
            outline:none
          .icon-x
            padding: 10px
            font-weight: 700
            color: $color-tab-color
        .passwordinput
          margin-top: 20px
          .password
            flex: 1
            height: 30px
            width: 100%
            background: $color-background
            outline:none
          .icon-xx
            padding: 10px
            font-weight: 700
            color: $color-tab-color
        .log
          width: 100%
          height: 50px
          background: rgba(78,184,40, 0.3)
          margin-top: 40px
          border-radius: 25px
          line-height: 50px
          text-align: center
          &.active
            background: $color-highlight-background
          .text
            color: $color-font
            font-size: 16px
        .login-bottom
          margin-top: 20px
          .message-login, .register
            display: inline-block
            padding: 10px 0
            width: 50%
            font-size: 14px
            color: $color-tab-text
          .register
            text-align: right
</style>
