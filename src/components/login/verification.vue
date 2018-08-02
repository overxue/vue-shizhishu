<template>
  <div class="verification">
    <back @back="back"></back>
    <div class="ver-item">
      <div class="inputContent">
        <div class="image">
          <img src="./login.png" width="80" height="80"/>
        </div>
        <div class="userinput">
          <input type="text" placeholder="请输入手机号" class="input-item"/>
          <i class="iconfont icon-x">&#xe611;</i>
        </div>
        <div class="passwordinput">
          <input type="text" placeholder="请输入验证码" class="password" />
          <i class="iconfont icon-xx">&#xe611;</i>
          <img width="100" height="40" src="data:image/jpeg;base64,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" />
        </div>
        <div class="log">
          <span class="text">获取验证码</span>
        </div>
        <div class="login-bottom">
          <span class="message-login" @click="codeLogin">账户密码登录</span><span class="register">新用户注册</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Back from 'base/back/back'
export default {
  methods: {
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
