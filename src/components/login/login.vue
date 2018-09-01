<template>
  <div class="login">
    <back @back="back"></back>
    <div class="login-item">
      <div class="inputContent">
        <div class="image">
          <img src="./login.png" width="80" height="80"/>
        </div>
        <div class="userinput">
          <text-input type="text" placeholder="邮箱/手机号" @query="UserQuery"></text-input>
        </div>
        <div class="passwordinput">
          <text-input :type="type" placeholder="请输入密码" @query="PwdQuery"></text-input>
          <i class="iconfont hide" @click="hidePassword" v-show="type === 'password'">&#xe70f;</i>
          <i class="iconfont hide" @click="hidePassword" v-show="type !== 'password'">&#xe6dd;</i>
          <span class="forget">忘记密码</span>
        </div>
        <div class="log" @click="login" :class="{'active': showLogin}">
          <span class="text">登录</span>
        </div>
        <div class="login-bottom">
          <router-link to="/login/code" class="message-login" tag="span">短信验证码登录</router-link><span class="register">新用户注册</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Back from 'base/back/back'
import TextInput from 'base/input/input'
import {login} from 'api/login'
import {mapActions} from 'vuex'
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      type: 'password'
    }
  },
  methods: {
    UserQuery (query) {
      this.loginForm.username = query
    },
    PwdQuery (query) {
      this.loginForm.password = query
    },
    hidePassword () {
      this.type = this.type === 'password' ? 'text' : 'password'
    },
    login () {
      login(this.loginForm.username, this.loginForm.password).then((res) => {
        this.saveToken({
          token: res.meta.access_token,
          time: res.meta.expires_in
        })
        this.saveUserInfo({
          name: res.name,
          phone: res.phone
        })
        this.$router.back()
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
      return this.loginForm.username && this.loginForm.password
    }
  },
  components: {
    Back,
    TextInput
  }
}
</script>

<style scoped lang="stylus" rel="stylesheed/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .login
    position: fixed
    top: 0
    bottom: 0
    z-index: 100
    width: 100%
    background: $color-background
    .login-item
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
          .hide
            padding: 10px
            font-size: 18px
            margin-right: 10px
            color: $color-tab-color
          .forget
            flex: 0 0 67px
            padding-left: 10px
            font-size: 14px
            border-left: 1px solid $color-border
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
