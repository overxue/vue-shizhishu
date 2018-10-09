<template>
  <div class="back" @click="back">
    <i class="iconfont icon">&#xe600;</i>
  </div>
</template>

<script>
export default {
  methods: {
    back () {
      this.$emit('back')
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheed/stylus">
  @import "~common/stylus/variable"

  .back
    position: absolute
    top: 0
    left: 0
    z-index: 50
    .icon
      display: block
      padding: 10px
      font-size: $font-size-icon
      color: $color-highlight-background
</style>
