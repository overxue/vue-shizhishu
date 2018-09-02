<template>
  <div class="no-result">
    <div class="no-result-icon"></div>
    <p class="no-result-text">{{title}}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheed/stylus">
  @import "~common/stylus/variable"

  .no-result
    text-align: center
    .no-result-icon
      width: 90px
      height: 90px
      margin: 0 auto
      background-image: url("no-result.png")
      background-size: 90px 90px
    .no-result-text
      margin-top: 30px
      font-size: $font-size-medium
      color: $color-shop-g
</style>
