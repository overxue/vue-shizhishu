<template>
  <span ref='countup'></span>
</template>

<script>
import CountUp from 'countup.js'
export default {
  props: {
    start: {
      type: String,
      default: '0.00'
    },
    end: {
      type: String,
      default: '0.00'
    },
    decimal: {
      type: Number,
      default: 2
    },
    duration: {
      type: Number,
      default: 0.5
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted () {
    this.initCountUp()
  },
  methods: {
    initCountUp () {
      this.numAnim = new CountUp(this.$refs.countup, this.start, this.end, this.decimal, this.duration, this.options)
      this.numAnim.start()
    }
  },
  watch: {
    end (nVal) {
      this.initCountUp()
    }
  }
}
</script>
