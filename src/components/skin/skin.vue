<template>
  <transition name="slide">
    <div class="skin">
      <div class="back" @click="back">
        <i class="iconfont icon">&#xe600;</i>
      </div>
      <scroll class="skin-wrapper">
        <ul>
          <li class="skin-item" v-for="(item, index) of pic" :key="index">
            <div class="image">
              <img class="img" :src="item.imgUrl">
              <div class="text">
                <span>{{item.desc}}</span>
              </div>
            </div>
          </li>
        </ul>
      </scroll>
    </div>
  </transition>
</template>

<script>
import Scroll from 'base/scroll/scroll'

export default {
  data () {
    return {
      pic: [
        {imgUrl: 'http://oprwd6vhr.bkt.clouddn.com/background/user_bg_1.jpg', desc: '公路'},
        {imgUrl: 'http://oprwd6vhr.bkt.clouddn.com/background/moren.jpg', desc: '默认'},
        {imgUrl: 'http://oprwd6vhr.bkt.clouddn.com/background/user_bg_2.jpg', desc: '黑夜森林'},
        {imgUrl: 'http://oprwd6vhr.bkt.clouddn.com/background/user_bg_3.jpg', desc: '鱼与水'},
        {imgUrl: 'http://oprwd6vhr.bkt.clouddn.com/background/user_bg_4.jpg', desc: '山之剪影'},
        {imgUrl: 'http://oprwd6vhr.bkt.clouddn.com/background/user_bg_5.jpg', desc: '火山'},
        {imgUrl: 'http://oprwd6vhr.bkt.clouddn.com/background/user_bg_6.jpg', desc: '科技'},
        {imgUrl: 'http://oprwd6vhr.bkt.clouddn.com/background/user_bg_7.jpg', desc: '沙漠'},
        {imgUrl: 'http://oprwd6vhr.bkt.clouddn.com/background/user_bg_8.jpg', desc: '叶子'},
        {imgUrl: 'http://oprwd6vhr.bkt.clouddn.com/background/user_bg_9.jpg', desc: '早餐'},
        {imgUrl: 'http://oprwd6vhr.bkt.clouddn.com/background/user_bg_10.jpg', desc: '英伦骑车'},
        {imgUrl: 'http://oprwd6vhr.bkt.clouddn.com/background/user_bg_11.jpg', desc: '草原'},
        {imgUrl: 'http://oprwd6vhr.bkt.clouddn.com/background/user_bg_12.jpg', desc: '城市'}
      ]
    }
  },
  methods: {
    back () {
      this.$router.back()
    }
  },
  components: {
    Scroll
  }
}
</script>

<style scoped lang="stylus" rel="stylesheed/stylus">
  @import "~common/stylus/variable"

  .skin
    position: fixed
    top: 0
    bottom: 0
    z-index: 100
    width: 100%
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .back
      position: absolute
      top: 0
      left: 6px
      z-index: 50
      .icon
        display: block;
        padding: 10px;
        font-size: $font-size-icon
        color: $color-highlight-background
    .skin-wrapper
      overflow: hidden
      height: 100%
      .skin-item
        height: 180px
        margin: 0 10px
        padding-top: 10px
        &:last-child
          padding-bottom: 10px
        .image
          position: relative
          height: 180px
          width: 100%
          box-shadow: 0 10px 10px rgba(0, 0, 0, .2)
          border-radius: 10px
          .img
            width: 100%
            height: 100%
            border-radius: 10px
          .text
            position: absolute
            right: 0
            left: 0
            bottom: 0
            height: 40px
            line-height: 40px
            background: rgba(0, 0, 0, 0.6)
            border-radius:0 0 10px 10px
            padding: 0 20px
            .desc
              font-size: $font-size-medium
</style>
