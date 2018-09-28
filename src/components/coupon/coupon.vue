<template>
  <div class="coupon">
    <div class="tab border-top-1px">
      <div class="tab-item" :class="{'current': currentIndex === index}" v-for="(item, index) of title" :key="index" @click="selectTab(index)">
        <span class="tab-link">{{item}}</span>
      </div>
    </div>
    <div class="swiper-content">
      <swiper :options="swiperOption" ref="swiper">
        <swiper-slide>
          <div class="content">
            <scroll class="content-wrapper">
              <ul class="content-item">
                <li class="coupon_voucher2">
                  <span class="coupon_voucher2_tag">
                    <i>新到</i>
                  </span>
                  <div class="coupon_voucher2_main">
                    <div class="coupon_voucher2_view">
                      <p class="coupon_voucher2_view_price">
                        <i>¥</i>
                        <strong>40</strong>
                      </p>
                      <p class="coupon_voucher2_view_des">满199元可用</p>
                    </div>
                    <div class="coupon_voucher2_info">
                      <p class="coupon_voucher2_info_text">
                        <i class="coupon_voucher2_info_type">东券</i>仅可购买金龙鱼等品牌部分商品
                      </p>
                      <p class="coupon_voucher2_info_label">
                        <span>全平台</span>
                      </p>
                      <p class="coupon_voucher2_info_date">2018.09.26-2018.09.28</p>
                    </div>
                  </div>
                </li>
              </ul>
            </scroll>
          </div>
        </swiper-slide>
        <swiper-slide>I'm Slide 2</swiper-slide>
        <swiper-slide>I'm Slide 3</swiper-slide>
      </swiper>
    </div>
    <back></back>
  </div>
</template>

<script>
import Back from 'base/back/back'
import Scroll from 'base/scroll/scroll'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

export default {
  data () {
    return {
      title: ['待使用', '已使用', '已过期'],
      currentIndex: 0,
      swiperOption: {
        autoplay: false
      }
    }
  },
  mounted () {
    this.swiper.on('SlideChangeEnd', () => {
      this.currentIndex = this.swiper.activeIndex
    })
  },
  methods: {
    selectTab (index) {
      this.currentIndex = index
      this.swiper.slideTo(index, 0, false)
    }
  },
  computed: {
    swiper () {
      return this.$refs.swiper.swiper
    }
  },
  destroyed () {
    console.log('123')
    this.swiper.destroy(false)
  },
  components: {
    Back,
    swiper,
    swiperSlide,
    Scroll
  }
}
</script>

<style scoped lang="stylus" rel="stylesheed/stylus">
  @import "~common/stylus/variable"

  .coupon
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    background: $color-tab-background
    .tab
      display: flex
      height: 44px
      line-height: 44px
      font-size: $font-size-medium
      margin-top: 44px
      background: #fff
      .tab-item
        flex: 1
        text-align: center
        .tab-link
          padding-bottom: 12px
        &.current
          .tab-link
            color: $color-highlight-background
            border-bottom: 2px solid $color-highlight-background
    .swiper-content
      position: fixed
      width: 100%
      top: 88px
      bottom: 0
      background: $color-background
      >>> .swiper-container
        height: 100%
      .content
        position: absolute
        width: 100%
        top: 0
        bottom: 0
        .content-wrapper
          overflow: hidden
          height: 100%
          .content-item
            padding: 10px 0
            .coupon_voucher2
              position: relative
              margin: 0 10px 15px 10px
              border-radius: 6px
              color: #53c7ca
              border-top: 6px solid currentColor
              border-bottom: 10px solid #fff
              &:last-child
                margin-bottom: 0
              &::before
                content: ""
                position: absolute
                top: 4px
                bottom: 4px
                left: 10px
                right: 10px
                box-shadow: 0 2px 10px 10px rgba(0,0,0,.1)
                z-index: -1
              .coupon_voucher2_tag
                z-index: 1
                position: absolute
                left: -4px
                top: 5px
                background-color: #ff9574
                height: 14px
                line-height: 14px
                font-size: 10px
                color: #fff
                padding: 0 8px
                text-align: center
                border-radius: 10px 10px 10px 0
                background-image: linear-gradient(left,#ff9574 20%,#e93b3d)
                box-shadow: 2px 2px 5px rgba(233,59,61,.2)
                &::before
                  content: ""
                  width: 4px
                  height: 10px
                  background-color: #ff9574
                  position: absolute
                  left: 0
                  top: 7px
                &::after
                  content: ""
                  width: 4px
                  height: 8px
                  border-radius: 8px 0 0 8px
                  background-color: #d02b2d
                  position: absolute
                  top: 14px
                  left: 0
                i::before
                  content: ""
                  display: inline-block
                  vertical-align: middle
                  width: 0
                  height: 100%
                  margin-top: 1px
              .coupon_voucher2_main
                display: flex
                color: currentColor!important
                padding: 10px
                min-height: 96px
                box-sizing: border-box
                background-color: #fff
                .coupon_voucher2_view
                  width: 120px
                  text-align: center
                  position: relative
                  display: flex
                  flex-direction: column
                  justify-content: center
                  margin-right: 10px
                  .coupon_voucher2_view_price
                    line-height: 1
                    i
                      font-size: 14px
                      display: inline-block
                      vertical-align: top
                      margin: 6px 4px 0 0
                    strong
                      font-weight: 700
                      font-size: 45px
                      position: relative
                      top: 1px
                  .coupon_voucher2_view_des
                    font-size: 14px
                    margin-top: 5px
                    overflow: hidden
                    text-overflow: ellipsis
                    white-space: nowrap
                .coupon_voucher2_info
                  flex: 1
                  min-width: 0
                  position: relative
                  padding-bottom: 15px
                  .coupon_voucher2_info_text
                    font-size: 12px
                    color: #666
                    height: 3em
                    line-height: 1.5em
                    overflow: hidden
                    text-overflow: ellipsis
                    margin-bottom: 10px
                    .coupon_voucher2_info_type
                      display: inline-block
                      vertical-align: middle
                      margin-top: -2px
                      margin-right: 4px
                      padding: 0 6px 0 12px
                      mask-border-source: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAAAeBAMAAABnKKUQAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAYUExURUdwTEbBxEfAwkbBxEbCxUrCwkjAw0fBxIl6Q0sAAAAHdFJOUwCtGOpWE1EMBueFAAAAZ0lEQVQ4y63TsQ3AIAwFURdWVqAnRQZikqT56xM8gM8SuD7xhMBm/7iyWYUNThomuSN2xM5KLmEyOGmYkCN2xI7YUThvz44K57NnM7kZcp24dEiQuE48I0r8dYsfk6TikhRWDSRjaQIDkrCy+FPWEgAAAABJRU5ErkJggg==')
                      mask-border-slice: 10 20 20 20 fill
                      color: #fff
                      font-size: 10px
                      height: 15px
                      line-height: 15px
                      border-radius: 0 2px 2px 0
                      background-color: #53c7ca
                      &::before
                        content: ""
                        display: inline-block
                        vertical-align: middle
                        width: 0
                        height: 100%
                        margin-top: 2px
                  .coupon_voucher2_info_label
                    font-size: 0
                    span
                      display: inline-block
                      vertical-align: middle
                      height: 17px
                      line-height: 17px
                      font-size: 12px
                      color: #999
                      background-color: #f8f8f8
                      border-radius: 2px
                      margin: -2px 5px 5px 0
                      padding: 0 5px
                  .coupon_voucher2_info_date
                    line-height: 1
                    font-size: 10px
                    color: #999
                    position: absolute
                    bottom: 2px
                    left: 0
</style>
