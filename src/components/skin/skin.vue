<template>
  <transition name="slide">
    <div class="skin">
      123
    </div>
  </transition>
</template>

<script>
export default {}
</script>

<style scoped lang="stylus" rel="stylesheed/stylus">
  @import "~common/stylus/variable"

  .skin
    position: fixed
    top: 0
    bottom: 0
    z-index: 100
    width: 100%
    background: #F2F2F2
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
</style>
