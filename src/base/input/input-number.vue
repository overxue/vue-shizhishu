<template>
  <div class="number">
    <div class="num-shu" @click="subtract">
      <span class="num-jian">－</span>
    </div>
    <span class="num-weight"></span>
    <div class="num-input">
      <text-input type="number" placeholder="" :show="showIcon" class="num-input-item" ref="textInput" @query="query"></text-input>
    </div>
    <span class="num-weight"></span>
    <div class="num-shu" @click="add">
      <span class="num-jian">＋</span>
    </div>
  </div>
</template>

<script>
import TextInput from './input'

export default {
  props: {
    number: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      showIcon: false,
      value: 1
    }
  },
  mounted () {
    this.setQuery(this.number)
  },
  methods: {
    setQuery (query) {
      this.$refs.textInput.setQuery(query)
    },
    query (nVal) {
      this.value = nVal
    },
    subtract () {
      if (this.value > 1) {
        this.setQuery(--this.value)
      }
    },
    add () {
      this.setQuery(++this.value)
    }
  },
  watch: {
    value (nVal) {
      this.$emit('query', nVal)
    }
  },
  components: {
    TextInput
  }
}
</script>

<style scoped lang="stylus" rel="stylesheed/stylus">
  @import "~common/stylus/variable"
  .number
    display: flex
    background: $color-background
    .num-shu
      padding: 0 5px
      font-size: $font-size-small
    .num-item
      font-weight: 700
      color: $color-tab-text
    .num-jian
      font-size: $font-size-medium
      font-weight: 900
      color: #111
    .num-weight
      width: 2px
      height: 23px
      background: $color-tab-background
    .num-input
      width: 40px
      height: 25px
      .num-input-item
        width: 100%
        height: 100%
        text-align: center
        font-weight: 600
        background: $color-background
        >>> .input-item
          height: 25px
          text-align: center
          line-height: 25px
</style>
