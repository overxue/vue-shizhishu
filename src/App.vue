<template>
  <div id="app">
    <keep-alive>
      <!--<transition name="slider">-->
      <router-view></router-view>
      <!--</transition>-->
    </keep-alive>
    <tab></tab>
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

<style scoped lang="stylus" rel="stylesheed/stylus">
  //.slider-enter-active, .slider-leave-active
   // will-change: transform;
   // transition: all 500ms;
  //.slider-enter
  //  opacity: 0
  //  transform: translate3d(100%, 0, 0)
  // .slider-leave-active
  //  opacity: 0
   // transform: translate3d(-100%, 0, 0)
</style>
