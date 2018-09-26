<template>
  <div class="input">
    <input v-model="query" @focus="onFocus" @blur="onBlur" :type="type" :placeholder="placeholder" class="input-item"/>
    <i class="iconfont icon-x" v-show="query && showIcon && show" @click="clear">&#xe611;</i>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: '请输入内容'
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      showIcon: false,
      query: ''
    }
  },
  methods: {
    clear () {
      this.query = ''
    },
    onFocus () {
      this.showIcon = true
    },
    setQuery (query) {
      this.query = query
    },
    onBlur () {
      this.showIcon = false
    }
  },
  watch: {
    query (nVal) {
      let val = nVal
      if (parseInt(nVal) <= 0 && this.type === 'number') {
        val = 1
        this.setQuery(val)
      }
      this.$emit('query', val)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheed/stylus">
  @import "~common/stylus/variable"

  .input
    display: flex
    align-items: center
    width: 100%
    height: 50px
    .input-item
      /*flex: 1*/
      width: 100%
      height: 30px
      background: $color-background
      outline: none
      appearance: textfield
      caret-color: $color-highlight-background
    .icon-x
      padding: 10px
      font-weight: 700
      color: $color-tab-color
</style>
