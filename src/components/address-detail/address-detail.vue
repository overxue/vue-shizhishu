<template>
  <transition name="slide">
    <div class="address-detail">
      123
    </div>
  </transition>
</template>

<script>
export default {}
</script>

<style scoped lang="stylus" rel="stylesheed/stylus">
  @import "~common/stylus/variable"
  .address-detail
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
</style>
