<template>
  <div id="loading" class="loading">
    <div class="loader-inner line-scale-pulse-out">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <p class="loader-msg">加载中...</p>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="stylus" rel="stylesheed/stylus">
  @import "~common/stylus/variable"

  .loading
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: #fff;
    z-index: 999;
    text-align: center;
    font-size: 14px;
    color: #999;
    .line-scale-pulse-out
      margin: 160px 0 20px 0
      & > div
        background-color: $color-highlight-background
        width: 4px
        height: 20px
        border-radius: 4px
        margin: 4px
        animation-fill-mode: both
        display: inline-block
        animation: line-scale-pulse-out 0.9s 0s infinite cubic-bezier(0.85, 0.25, 0.37, 0.85);
        @keyframes line-scale-pulse-out
          0%
            transform: scaley(1)
          50%
            transform: scaley(0.4)
          100%
            transform: scaley(1)
      & > div:nth-child(1), & > div:nth-child(5)
        animation-delay: 0.4s !important
      & > div:nth-child(2), & > div:nth-child(4)
        animation-delay: 0.2s !important
</style>
