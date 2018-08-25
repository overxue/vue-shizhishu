<template>
  <transition name="confirm-fade">
    <div class="load">
      <div class="load-wrapper">
        <div class="load-content">
          <div class="icon">
            <i class="iconfont load-icon">&#xe64a;</i>
          </div>
          <p class="desc">{{desc}}</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    desc: {
      type: String,
      default: 'Loading'
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .load
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 998
    &.confirm-fade-enter-active
      animation: confirm-fadein 0.3s
      .confirm-content
        animation: confirm-zoom 0.3s
    .load-wrapper
      position: absolute
      top: 40%
      left: 50%
      transform: translate(-50%, -50%)
      .load-content
        width: 120px
        height: 120px
        border-radius: 5px
        background: hsla(0, 0%, 7%, .7)
        text-align: center
        display: table-cell
        vertical-align: middle
        .icon
          animation: load 1.5s infinite linear
          @keyframes load
            from
              transform: rotate(0deg)
            to
              transform: rotate(360deg)
          .load-icon
            color: #fff
            font-size: 30px
        .desc
            margin-top: 15px
            color: #fff
            font-size: $font-size-medium-x
  @keyframes confirm-fadein
    0%
      opacity: 0
    100%
      opacity: 1

  @keyframes confirm-zoom
    0%
      transform: scale(0)
    50%
      transform: scale(1.1)
    100%
      transform: scale(1)
</style>
