<template>
  <div class="skin">
    <back @back="back"></back>
    <scroll ref="listContent" class="skin-wrapper" :listenScroll="listenScroll" :probeType="probeType" @scroll="scroll">
      <ul>
        <li ref="pic" class="skin-item" v-for="(item, index) of pic" :key="index" @click="choseImg(item.imgUrl)">
          <div class="image" :class="{'active': item.imgUrl === backgroundImg}">
            <img class="img" :src="item.imgUrl">
            <div class="text">
              <span class="desc">{{item.desc}}</span>
            </div>
          </div>
        </li>
      </ul>
    </scroll>
    <top :posY="posY" @top="backTop"></top>
</div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Back from 'base/back/back'
import Top from 'base/top/top'
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      probeType: 3,
      listenScroll: true,
      posY: 0,
      pic: [
        { imgUrl: 'http://oprwd6vhr.bkt.clouddn.com/background/moren.jpg', desc: '默认' },
        { imgUrl: 'http://oprwd6vhr.bkt.clouddn.com/background/user_bg_1.jpg', desc: '公路' },
        { imgUrl: 'http://oprwd6vhr.bkt.clouddn.com/background/user_bg_2.jpg', desc: '黑夜森林' },
        { imgUrl: 'http://oprwd6vhr.bkt.clouddn.com/background/user_bg_3.jpg', desc: '鱼与水' },
        { imgUrl: 'http://oprwd6vhr.bkt.clouddn.com/background/user_bg_4.jpg', desc: '山之剪影' },
        { imgUrl: 'http://oprwd6vhr.bkt.clouddn.com/background/user_bg_5.jpg', desc: '火山' },
        { imgUrl: 'http://oprwd6vhr.bkt.clouddn.com/background/user_bg_6.jpg', desc: '科技' },
        { imgUrl: 'http://oprwd6vhr.bkt.clouddn.com/background/user_bg_7.jpg', desc: '沙漠' },
        { imgUrl: 'http://oprwd6vhr.bkt.clouddn.com/background/user_bg_8.jpg', desc: '叶子' },
        { imgUrl: 'http://oprwd6vhr.bkt.clouddn.com/background/user_bg_9.jpg', desc: '早餐' },
        { imgUrl: 'http://oprwd6vhr.bkt.clouddn.com/background/user_bg_10.jpg', desc: '英伦骑车' },
        { imgUrl: 'http://oprwd6vhr.bkt.clouddn.com/background/user_bg_11.jpg', desc: '草原' },
        { imgUrl: 'http://oprwd6vhr.bkt.clouddn.com/background/user_bg_12.jpg', desc: '城市' }
      ]
    }
  },
  created () {
    this.scrollToCurrent()
  },
  computed: {
    ...mapGetters([
      'backgroundImg'
    ])
  },
  methods: {
    // 一开始进入页面获取所选择位置
    scrollToCurrent () {
      setTimeout(() => {
        const index = this.pic.findIndex((pic) => {
          return this.backgroundImg === pic.imgUrl
        })
        let lineEl = this.$refs.pic[index - 1]
        this.$refs.listContent.scrollToElement(lineEl, 1000)
      }, 500)
    },
    // 返回上一页
    back () {
      this.$router.back()
    },
    // 选择图片
    choseImg (url) {
      this.saveBackgroundImg(url)
      this.$router.back()
    },
    // 实时获取滚动位置
    scroll (pos) {
      this.posY = pos.y
    },
    // 返回顶部
    backTop () {
      this.$refs.listContent.scrollTo(0, 0, 1000)
    },
    ...mapActions([
      'saveBackgroundImg'
    ])
  },
  components: {
    Scroll,
    Back,
    Top
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
          &.active
            overflow: hidden
          &.active::before
            content: '';
            display: block
            position: absolute
            top: -40px
            right: -40px
            width: 80px
            height: 80px
            transform: rotate(45deg)
            background-color: #47a86c
          &.active::after
            content: '在用'
            display: block
            position: absolute
            top: 12px
            right: 3px
            transform: rotate(45deg)
            color: $color-tab-background
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
              color: $color-tab-background
</style>
