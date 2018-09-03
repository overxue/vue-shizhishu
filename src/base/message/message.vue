<template>
  <transition name="message">
    <div class="message" v-show="visible">
      <div class="message-wrapper" :class="type">
        <i class="iconfont icon" v-html="icon" :class="type"></i>
        <p class="text" :class="type">{{message}}</p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      duration: 3000,
      message: '',
      type: 'info'
    }
  },
  computed: {
    icon () {
      if (this.type === 'success') {
        return '&#xe658;'
      } else if (this.type === 'error') {
        return '&#xe604;'
      } else if (this.type === 'warning') {
        return '&#xe620;'
      } else if (this.type === 'info') {
        return '&#xe6c1;'
      }
    }
  },
  methods: {
    destroyElement () {
      setTimeout(() => {
        this.$destroy(true)
        this.$el.parentNode.removeChild(this.$el)
      }, 200)
    },
    startTimer () {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          this.visible = false
          this.destroyElement()
        }, this.duration)
      }
    }
  },
  mounted () {
    this.startTimer()
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .message
    position: absolute
    top: 20px
    left: 50%
    width: 80%
    z-index: 2000
    transform: translateX(-50%)
    &.message-enter-active, &.message-leave-active
      transition: all 0.2s
    &.message-enter, &.message-leave-to
      transform: translate3d(-50%, -100%, 0)
    .message-wrapper
      display: flex
      align-items: center
      padding: 15px 15px 15px 20px
      background: #f0f9eb
      border: 1px solid #e1f3d8
      border-radius: 4px
      &.info
        background: #edf2fc
        border: 1px solid #ebeef5
      &.warning
        background: #fdf6ec
        border: 1px solid #faecd8
      &.error
        background: #fef0f0
        border: 1px solid #fde2e2
      .icon
        margin-right: 10px
        color: #67c23a
        &.info
          color: #909399
        &.warning
          color: #e6a23c
        &.error
          color: #f56c6c
      .text
        color: #67c23a
        &.info
          color: #909399
        &.warning
          color: #e6a23c
        &.error
          color: #f56c6c
</style>
