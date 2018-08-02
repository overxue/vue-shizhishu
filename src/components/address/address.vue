<template>
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
                <div class="delete" @click="del">
                  <i class="iconfont del-icon">&#xe61e;</i><span class="desc-delete">删除</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </scroll>
      <div class="add-address">
        <div class="desc">
          <i class="iconfont icon-jia">&#xe601;</i>
          <span class="text">新增地址</span>
        </div>
      </div>
      <confim text="确认要删除该地址吗？" ref="confim"></confim>
    </div>
</template>

<script>
import Back from 'base/back/back'
import Confim from 'base/confim/confim'
import Scroll from 'base/scroll/scroll'

export default {
  methods: {
    back () {
      this.$router.back()
    },
    del () {
      this.$refs.confim.show()
    }
  },
  components: {
    Back,
    Confim,
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
    .address-wrapper
      overflow: hidden
      height: 100%
      .address-item
        margin-bottom: 10px
        background: $color-tab-background
        &:last-child
          margin-bottom: -80px
        .address-top
          padding: 20px
          font-size: $font-size-medium
          border-1px($color-border)
          .text
            margin-bottom: 10px
            .name
              font-weight: 700
          .add
            no-wrap()
      .address-bottom
        display: flex
        align-items: center
        padding: 0 20px
        font-size: $font-size-large
        .left
          flex: 1
          .radius
            display: inline-block
            vertical-align: top
            width: 16px
            height: 16px
            border-radius: 50%
            line-height: 16px
            border: 1px solid $color-tab-text
          .desc
            font-size: $font-size-medium
            color: $color-tab-text
        .right
          flex: 0 0 auto
          .edit, .delete
            display: inline-block
            vertical-align: top
            line-height: 40px
            .edit-icon, .del-icon
              display: inline-block
              vertical-align: top
              font-size: $font-size-center
              color: $color-highlight-background
            .desc-edit, .desc-delete
              font-size: $font-size-medium
              color: $color-highlight-background
          .delete
            margin-left: 10px
            .del-icon
              color: $color-icon
            .desc-delete
              color: $color-icon
    .add-address
      position: fixed
      bottom: 0
      right: 0
      left: 0
      height: 40px
      background: $color-tab-background
      //border-t($color-border)
      .desc
        text-align: center
        line-height: 40px
        .icon-jia, .text
          color: $color-highlight-background
          font-size: $font-size-medium-x
        .text
          font-weight: 700
</style>
