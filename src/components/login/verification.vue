<template>
  <div class="verification">
    <back @back="back"></back>
    <div class="ver-item">
      <div class="inputContent">
        <div class="image">
          <img src="./login.png" width="80" height="80"/>
        </div>
        <div class="userinput">
          <text-input type="text" placeholder="请输入手机号" @query="phoneQuery"></text-input>
        </div>
        <div class="passwordinput" v-if="captcha_image_content">
          <text-input type="text" placeholder="请输入验证码" @query="CaptchaQuery" ref="captcha"></text-input>
          <img width="120" height="40" :src="captcha_image_content" @click="getCaptcha"/>
        </div>
        <div class="log" :class="{'active': showLogin}" @click="getCode">
          <span class="text">获取验证码</span>
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
import TextInput from 'base/input/input'
import {getCaptcha, getCodes} from 'api/login'
export default {
  data () {
    return {
      phone: '',
      captcha_code: '',
      captcha_image_content: '',
      expired_at: '',
      captcha_key: ''
    }
  },
  methods: {
    phoneQuery (query) {
      this.phone = query
    },
    CaptchaQuery (query) {
      this.captcha_code = query
    },
    getCode () {
      if (this.captcha_code) {
        this.getCodes()
      } else {
        this.getCaptcha()
      }
    },
    getCodes () {
      getCodes(this.captcha_key, this.captcha_code).then((res) => {
        console.log(res)
      }).catch((error) => {
        let err = error.response
        if (err.status === 401) {
          console.log(err.data.message)
          this.getCaptcha()
        } else if (err.status === 422) {
          console.log(err.data.message)
          this.getCaptcha()
        }
      })
    },
    getCaptcha () {
      if (this.captcha_code) {
        this.$refs.captcha.setQuery()
      }
      getCaptcha(this.phone, 'login').then((res) => {
        this.captcha_image_content = res.captcha_image_content
        this.expired_at = res.expired_at
        this.captcha_key = res.captcha_key
      })
    },
    back () {
      this.$router.back()
    }
  },
  computed: {
    showLogin () {
      if (this.phone && this.captcha_code) {
        return true
      } else if (this.phone && !this.captcha_image_content) {
        return true
      } else {
        return false
      }
    }
  },
  components: {
    Back,
    TextInput
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
