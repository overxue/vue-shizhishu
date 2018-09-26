<template>
  <transition name="slide">
    <div class="address-detail">
      <div class="address-wrapper">
        <h1 class="title">新增地址</h1>
        <ul>
          <li class="address-item">
            <div class="address-desc">姓名</div>
            <text-input type="text" name="contact_name" placeholder="姓名" class="user-input"></text-input>
          </li>
          <li class="address-item">
            <div class="address-desc">电话</div>
            <text-input type="number" name="contact_phone" placeholder="手机号码" class="user-input"></text-input>
          </li>
          <li class="address-item">
            <div class="address-desc">地址</div>
            <div class="user-input">123</div>
          </li>
          <li class="address-item">
            <div class="address-desc">门牌号</div>
            <text-input type="text" name="address" placeholder="例：5号楼203室" class="user-input"></text-input>
          </li>
        </ul>
        <div class="address-save">
          <span>保存</span>
        </div>
      </div>
      <back @back="back"></back>
      <picker @change="change"></picker>
    </div>
  </transition>
</template>

<script>
import TextInput from 'base/input/input'
import Back from 'base/back/back'
import Picker from 'base/picker/picker'

export default {
  components: {
    TextInput,
    Back,
    Picker
  },
  methods: {
    change (i, data) {
      console.log(i, data)
    },
    back () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheed/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .address-detail
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    background: #fff
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .address-wrapper
      overflow: hidden
      height: 100%
      .title
        position: absolute
        top: 0
        left: 10%
        width: 80%
        text-align: center
        line-height: 45px
        font-size: 18px
      .address-item
        display: flex
        height: 50px
        line-height: 50px
        border-1px($color-border)
        margin: 0 10px
        &:first-child
          border-t($color-border)
          margin-top: 70px
        .address-desc
          flex: 0 0 100px
          font-weight: 600
          font-size: $font-size-medium
        .user-input
          flex: 0 0 1
          >>> .input-item
            background: #fff
      .address-save
        margin: 20px
        height: 40px
        background: $color-highlight-background
        border-radius: 20px
        text-align: center
        line-height: 40px
        color: #fff
</style>
