<template>
  <div>
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <div class="tab">
      <router-link tag="div" to="/home" class="tab-item" exact>
        <div class="tab-link">
          <i class="iconfont icon">&#xe61a;</i>
          <span class="text">首页</span>
        </div>
      </router-link>
      <router-link tag="div" to="/shoplist" class="tab-item">
        <div class="tab-link">
          <i class="iconfont icon">&#xe602;</i>
          <span class="text">菜园子</span>
        </div>
      </router-link>
      <router-link tag="div" to="/shopcat" class="tab-item">
        <div class="tab-link">
          <i class="iconfont icon">&#xe63e;</i>
          <span class="text">菜篮子</span>
        </div>
      </router-link>
      <router-link tag="div" to="/my" class="tab-item">
        <div class="tab-link">
          <i class="iconfont icon">&#xe713;</i>
          <span class="text">我的</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="stylus" rel="stylesheed/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .tab
    position: fixed
    display: flex
    left: 0
    bottom: 0
    right: 0
    height: 50px
    background: $color-tab-background
    .tab-item
      // 让所有弹性盒模型对象的子元素都有相同的长度，且忽略它们内部的内容
      flex: 1
      text-align: center
      .tab-link
        margin-top: 3px
        .icon
          font-size: $font-size-icon
          color: $color-tab-color
        .text
          display: block
          margin-top: 3px
          font-size: $font-size-medium
          color: $color-tab-text
      &.router-link-active
        .icon
          color: $color-highlight-background
        .text
          color: $color-highlight-background
</style>
