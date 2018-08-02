<template>
  <div id="app">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import Tab from 'components/tab/tab'

export default {
  components: {
    Tab
  }
}
</script>

<style lang="stylus" rel="stylesheed/stylus">
</style>
