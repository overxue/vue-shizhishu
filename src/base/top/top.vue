<template>
  <transition name="top">
    <div class="top" @click="top" v-show="showTop">
      <i class="iconfont top-icon">&#xe61c;</i>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    posY: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      showTop: false
    }
  },
  methods: {
    top () {
      this.$emit('top')
    }
  },
  watch: {
    posY (newY) {
      if (newY < -600) {
        this.showTop = true
        return
      }
      this.showTop = false
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheed/stylus">
  @import "~common/stylus/variable"

  .top
    position: absolute
    bottom: 10px
    right: 0
    z-index: 5
    &.top-enter-active, &.top-leave-active
      transition: all 0.2s
    &.top-enter, &.top-leave-to
      transform: translate3d(0, 100%, 0)
    .top-icon
      display: block
      padding: 10px
      font-size: 40px
      color: $color-highlight-background
</style>
