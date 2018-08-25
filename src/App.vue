<template>
  <div id="app">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :exclude="exclude">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import Tab from 'components/tab/tab'

export default {
  data () {
    return {
      exclude: 'addresses'
    }
  },
  components: {
    Tab
  }
}
</script>

<style lang="stylus" rel="stylesheed/stylus">
</style>
