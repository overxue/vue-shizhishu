<template>
  <div class="verification">
    <back @back="back"></back>
    <div class="ver-item">
      <div class="inputContent">
        <div class="image">
          <img src="./login.png" width="80" height="80"/>
        </div>
        <div class="userinput">
          <text-input type="text" placeholder="请输入手机号" @query="phoneQuery" ref="phone"></text-input>
        </div>
        <div class="passwordinput" v-if="captcha.captcha_image_content">
          <text-input type="text" placeholder="请输入验证码" @query="CaptchaQuery" ref="captcha"></text-input>
          <img width="120" height="40" :src="captcha.captcha_image_content" @click="getCaptcha"/>
        </div>
        <div class="passwordinput">
          <text-input type="text" placeholder="请输入短信验证码" @query="VerificationQuery" ref="code"></text-input>
          <div class="button" :class="{'active': showButton}" @click="getCode">
            <span>{{text}}</span>
          </div>
        </div>
        <div class="passwordinput" v-if="$route.meta.title === '注册'">
          <text-input type="text" placeholder="请输入用户名" ref="username" @query="usernameQuery"></text-input>
        </div>
        <div class="passwordinput" v-if="$route.meta.title === '注册'">
          <text-input :type="type" placeholder="请输入密码" @query="PwdQuery" ref="password"></text-input>
          <i class="iconfont hide" @click="hidePassword" v-show="type === 'password'">&#xe70f;</i>
          <i class="iconfont hide" @click="hidePassword" v-show="type !== 'password'">&#xe6dd;</i>
        </div>
        <div class="log" :class="{'active': showLogin}" @click="Codelogin">
          <span class="text">{{$route.meta.title}}</span>
        </div>
        <div class="login-bottom" v-if="$route.meta.title === '注册'">
          <router-link to="/login" class="message-login" tag="span" replace>账户密码登录</router-link><router-link to="/code" class="register" tag="span" replace>短信验证码登录</router-link>
        </div>
        <div class="login-bottom" v-else>
          <router-link to="/login" class="message-login" tag="span" replace>账户密码登录</router-link><router-link to="/register" class="register" tag="span" replace>新用户注册</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Back from 'base/back/back'
import TextInput from 'base/input/input'
import { getCaptcha, getCodes, Codelogin, register } from 'api/login'
import { mapActions } from 'vuex'
export default {
  name: 'verification',
  data () {
    return {
      phone: '',
      // 图片验证码返回参数
      captcha: {
        captcha_image_content: '',
        expired_at: '',
        captcha_key: ''
      },
      // 图片验证码
      captcha_code: '',
      // 短信验证码
      verification_code: '',
      verification: {
        key: '',
        expired_at: ''
      },
      text: '获取验证码',
      show: false,
      username: '',
      password: '',
      type: 'password'
    }
  },
  methods: {
    phoneQuery (query) {
      this.phone = query
    },
    CaptchaQuery (query) {
      this.captcha_code = query
    },
    VerificationQuery (query) {
      this.verification_code = query
    },
    usernameQuery (query) {
      this.username = query
    },
    PwdQuery (query) {
      this.password = query
    },
    hidePassword () {
      this.type = this.type === 'password' ? 'text' : 'password'
    },
    getCode () {
      if (this.captcha_code) {
        this.getCodes()
      } else {
        this.getCaptcha()
      }
    },
    time () {
      let time = 60
      this.timer = setInterval(() => {
        time--
        this.text = `${time}s后获取`
        if (!this.show) {
          this.show = true
        }
        if (time === 0) {
          this.text = '获取验证码'
          this.show = false
          clearInterval(this.timer)
        }
      }, 1000)
    },
    // 获取短信验证码
    getCodes () {
      if (this.show) {
        return
      }
      getCodes(this.captcha.captcha_key, this.captcha_code).then((res) => {
        this.verification.key = res.key
        this.verification.expired_at = res.expired_at
        this.time()
      }).catch((error) => {
        let err = error.response
        if (err.status === 401 || err.status === 422) {
          this.getCaptcha()
        }
      })
    },
    // 获取图片验证码
    getCaptcha () {
      if (!this.showButton) {
        return
      }
      let status = this.$router.currentRoute.path === '/register' ? 'register' : 'login'
      getCaptcha(this.phone, status).then((res) => {
        this.captcha.captcha_image_content = res.captcha_image_content
        this.captcha.expired_at = res.expired_at
        this.captcha.captcha_key = res.captcha_key
        if (this.captcha_code) {
          this.$refs.captcha.setQuery()
        }
      }).catch((error) => {
        let err = error.response
        if (err.status === 422) {
          let miss = Object.values(err.data.errors)
          this.$message.warning(miss[0][0])
        }
      })
    },
    userinfo (res) {
      this.saveToken({
        token: res.meta.access_token,
        time: res.meta.expires_in
      })
      this.saveUserInfo({
        name: res.name,
        phone: res.phone
      })
      this.$router.back()
    },
    error (err) {
      if (err.status === 401) {
        this.$message.error(err.data.message)
      } else if (err.status === 422 && err.data.message !== '422 Unprocessable Entity') {
        this.show = false
        this.$refs.captcha.setQuery('')
        this.$refs.code.setQuery('')
        this.text = '获取验证码'
        clearInterval(this.timer)
        this.$message.error(err.data.message)
        this.getCaptcha()
      } else if (err.data.message === '422 Unprocessable Entity') {
        let miss = Object.values(err.data.errors)
        this.$message.warning(miss[0][0])
      }
    },
    // 登录接口
    Codelogin () {
      if (!this.showLogin) {
        return
      }
      if (this.$router.currentRoute.path === '/register') {
        register(this.verification.key, this.verification_code, this.username, this.password).then((res) => {
          this.userinfo(res)
        }).catch((error) => {
          let err = error.response
          this.error(err)
        })
        return
      }
      Codelogin(this.verification.key, this.verification_code).then((res) => {
        this.userinfo(res)
      }).catch((error) => {
        let err = error.response
        this.error(err)
      })
    },
    back () {
      this.$router.back()
    },
    ...mapActions([
      'saveToken',
      'saveUserInfo'
    ])
  },
  computed: {
    showLogin () {
      if (this.$router.currentRoute.path === '/register') {
        return this.verification_code && this.captcha_code && this.username && this.password
      }
      return this.verification_code && this.captcha_code
    },
    showButton () {
      if (this.show) return false
      return this.phone
    }
  },
  watch: {
    phone (nVal) {
      if (this.captcha.captcha_image_content) {
        this.captcha.captcha_image_content = ''
        this.text = '获取验证码'
        this.show = false
        this.captcha_code = ''
        clearInterval(this.timer)
      }
    },
    '$route' () {
      this.$refs.phone.setQuery('')
      if (this.captcha.captcha_image_content) {
        this.$refs.captcha.setQuery('')
        this.captcha.captcha_image_content = ''
      }
      this.$refs.code.setQuery('')
      this.text = '获取验证码'
      this.captcha_code = ''
      this.show = false
      clearInterval(this.timer)
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
      top: 50%
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
          .hide
            padding: 10px
            font-size: 18px
            color: $color-tab-color
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
          .button
            flex: 0 0 90px
            text-align: center
            line-height: 25px
            border-radius: 14.5px
            &.active
              background: rgba(202, 235, 216, 0.3)
              span
                color: $color-highlight-background
            span
              font-size: 12px
              color: rgba(78,184,40, 0.3)
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
