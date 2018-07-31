<template>
  <transition name="slide">
    <div class="login">
      <div class="login-item">
        <div class="inputContent">
          <div class="image">
            <img src="./login.png" width="80" height="80"/>
          </div>
          <div class="userinput">
            <input v-model="loginForm.username" @focus="onFocus" @blur="onBlur" type="text" placeholder="邮箱/手机号" class="input-item"/>
            <i class="iconfont icon-x" v-show="deleteHide.username" @click="clear">&#xe611;</i>
          </div>
          <div class="passwordinput">
            <input v-model="loginForm.password" @focus="onFocus('password')" @blur="onBlur" :type="type" placeholder="请输入密码" class="password" />
            <i class="iconfont icon-xx" v-show="deleteHide.password" @click="clear('password')">&#xe611;</i>
            <i class="iconfont hide" @click="hidePassword" v-show="type === 'password'">&#xe70f;</i>
            <i class="iconfont hide" @click="hidePassword" v-show="type !== 'password'">&#xe6dd;</i>
            <span class="forget">忘记密码</span>
          </div>
          <div class="log" @click="login" :class="{'active': loginForm.username && loginForm.password}">
            <span class="text">登录</span>
          </div>
          <div class="login-bottom">
            <span class="message-login">短信验证码登录</span><span class="register">新用户注册</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      deleteHide: {
        username: false,
        password: false
      },
      type: 'password'
    }
  },
  methods: {
    hidePassword () {
      this.type = this.type === 'password' ? 'text' : 'password'
    },
    clear (param) {
      if (param === 'password') {
        this.loginForm.password = ''
        return
      }
      this.loginForm.username = ''
    },
    onBlur () {
      this.deleteHide.password = false
      this.deleteHide.username = false
    },
    onFocus (param) {
      if (param === 'password') {
        this.deleteHide.password = this.loginForm.password !== ''
      } else {
        this.deleteHide.username = this.loginForm.username !== ''
      }
    },
    login () {
      console.log(this.loginForm)
    }
  },
  computed: {
    username () {
      return this.loginForm.username
    },
    password () {
      return this.loginForm.password
    }
  },
  watch: {
    username (newVal) {
      if (newVal) {
        this.deleteHide.username = true
      } else {
        this.deleteHide.username = false
      }
    },
    password (newVal) {
      if (newVal) {
        this.deleteHide.password = true
      } else {
        this.deleteHide.password = false
      }
    }
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
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .login-item
      position: absolute
      top: 40%
      left: 50%
      transform: translate(-50%, -50%)
      width: 100%
      .image
        text-align: center
        margin-bottom: 40px
      .inputContent
        padding: 0 20px
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
            width: 50%
            font-size: 14px
            color: $color-tab-text
          .register
            text-align: right
</style>
