<template>
  <div class="tip" v-show="show">
    <div class="tip-content">
      <span>{{message}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      show: false
    }
  },
  watch: {
    message () {
      this.show = true
      setTimeout(() => {
        this.show = false
      }, 2000)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .tip
    position: absolute
    top: 95%
    left: 50%
    transform: translate(-50%, -50%)
    .tip-content
      width: 250px
      height: 40px
      background: rgba(0, 0, 0, 0.6)
      border-radius: 20px
      text-align: center
      line-height: 40px
      color: $color-font
</style>
