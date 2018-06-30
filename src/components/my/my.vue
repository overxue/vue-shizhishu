<template>
  <div class="my">
    <div class="my-top">
      <div class="img">
        <img class="image" width="100" height="100" src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKrViabiahwZF1NQZBKpSA5QoibSnKGQE0nljAvpJP8CZgGVbd5AKBRoucJk8a5Ypns2DZdUqq0icU9qw/132">
      </div>
      <div class="top-center">
        <span class="top-text">薛聪</span>
      </div>
      <div class="top-bottom">
        <span class="top-bottom-item">Anhui, Hefei</span>
      </div>
      <div class="top-pifu" @click="choseskin">
        <i class="iconfont icon">&#xe606;</i>
      </div>
    </div>
    <div class="my-bottom">
      <ul>
        <li class="bottom-item border-1px">
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
        <li class="bottom-item border-1px">
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
        <li class="bottom-item border-1px">
          <div class="icon">
            <i class="iconfont icon-item">&#xe6d7;</i>
          </div>
          <div class="text">
            <p class="title">地址管理</p>
          </div>
          <div class="icon-back">
            <i class="iconfont">&#xe68b;</i>
          </div>
        </li>
        <li class="bottom-item border-1px">
          <div class="icon">
            <i class="iconfont icon-item">&#xe626;</i>
          </div>
          <div class="text">
            <p class="title">联系我们</p>
          </div>
          <div class="icon-back">
            <i class="iconfont">&#xe68b;</i>
          </div>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    choseskin () {
      this.$router.push({
        path: '/my/skin'
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheed/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .my
    .my-top
      position: relative
      width: 100%
      height: 200px
      background-image: url(http://oprwd6vhr.bkt.clouddn.com/background/moren.jpg)
      text-align: center
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
      color: #aaa
      .bottom-item
        display: flex
        margin: 0 20px
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
          flex: 0 0 22px;
          margin-right: 12px
          .icon-item
            color: $color-highlight-background
            font-size: $font-size-large-x
        .text
          flex: 1
          .title
            font-size: $font-size-medium
            color: $color-tab-text
        .icon-back
          flex: 0 0 auto
          color: $color-tab-color
</style>
