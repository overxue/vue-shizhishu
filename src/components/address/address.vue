<template>
  <transition name="slide">
    <div class="address">
      <back @back="back"></back>
      <scroll class="address-wrapper">
        <ul>
          <li class="address-item">
            <div class="address-top">
              <div class="text">
                <span class="name">薛聪</span>
                <span class="phone">18656085175</span>
              </div>
              <div class="add">
                南京市雨花台区大周路88号
              </div>
            </div>
            <div class="address-bottom">
              <div class="left">
                <div class="radius"></div>
                <span class="desc">设为默认</span>
              </div>
              <div class="right">
                <div class="edit">
                  <i class="iconfont edit-icon">&#xe657;</i><span class="desc-edit">编辑</span>
                </div>
                <div class="delete">
                  <i class="iconfont del-icon">&#xe61e;</i><span class="desc-delete">删除</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </scroll>
    </div>
  </transition>
</template>

<script>
import Back from 'base/back/back'
import Scroll from 'base/scroll/scroll'

export default {
  methods: {
    back () {
      this.$router.back()
    }
  },
  components: {
    Back,
    Scroll
  }
}
</script>

<style scoped lang="stylus" rel="stylesheed/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .address
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
    .address-wrapper
      overflow: hidden
      height: 100%
      .address-item
        margin-bottom: 10px
        background: $color-tab-background
        &:last-child
          margin-bottom: 0
        .address-top
          padding: 20px
          font-size: $font-size-medium-x
          border-1px($color-border)
          .text
            margin-bottom: 10px
            .name
              font-weight: 700
          .add
            no-wrap()
      .address-bottom
        display: flex
        padding: 10px 20px
        font-size: $font-size-large
        .left
          flex: 1
          line-height: 23px
          .radius
            display: inline-block
            vertical-align: top
            width: 20px
            height: 20px
            border-radius: 50%
            border: 1px solid $color-tab-text
          .desc
            font-size: $font-size-medium-x
            color: $color-tab-text
        .right
          flex: 0 0 auto
          .edit
            display: inline-block
            vertical-align: top
            line-height: 21px
            .edit-icon
              display: inline-block
              vertical-align: top
              font-size: $font-size-large-x
              color: $color-highlight-background
            .desc-edit
              font-size: $font-size-medium-x
              color: $color-highlight-background
          .delete
            display: inline-block
            margin-left: 10px
            line-height: 21px
            .del-icon
              display: inline-block
              vertical-align: top
              font-size: 23px
              color: $color-icon
            .desc-delete
              font-size: $font-size-medium-x
              color: $color-icon
              line-height: 16px
</style>
