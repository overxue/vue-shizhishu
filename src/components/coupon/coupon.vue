<template>
  <div class="coupon">
    <div class="tab border-top-1px">
      <div class="tab-item" :class="{'current': currentIndex === index}" v-for="(item, index) of title" :key="index" @click="selectTab(index)">
        <span class="tab-link">{{item.title}} {{item.count}}</span>
      </div>
    </div>
    <div class="swiper-content">
      <swiper :options="swiperOption" ref="swiper" v-if="coupons.length">
        <swiper-slide v-for="(coupon, index) of coupons" :key="index">
          <div class="content">
            <scroll class="content-wrapper">
              <ul class="content-item">
                <li class="coupon_voucher2" :class="{'type_disabled': index === 1 || index == 2 || (parseFloat(totalMoney) < item.min_amount && showChoose)}" v-for="(item, ind) of coupon" :key="ind">
                  <span class="coupon_voucher2_tag" :class="{'color_gray': index === 1 || index == 2 || (parseFloat(totalMoney) < item.min_amount && showChoose)}" v-if="showTitle(item.satarTime, index)">
                    <i v-if="index === 1">已使用</i>
                    <i v-else-if="index === 2">已过期</i>
                    <i v-else>新到</i>
                  </span>
                  <div class="coupon_voucher2_main">
                    <div class="coupon_voucher2_view">
                      <p class="coupon_voucher2_view_price">
                        <i>¥</i>
                        <strong>{{item.money}}</strong>
                      </p>
                      <p class="coupon_voucher2_view_des">满{{item.min_amount}}元可用</p>
                    </div>
                    <div class="coupon_voucher2_info">
                      <p class="coupon_voucher2_info_text">
                        <i class="coupon_voucher2_info_type" :class="{'icon': index === 1 || index == 2 || (parseFloat(totalMoney) < item.min_amount && showChoose)}">优惠券</i>
                        仅可购买金龙鱼等品牌部分商品
                      </p>
                      <p class="coupon_voucher2_info_label">
                        <span>全平台</span>
                      </p>
                      <p class="coupon_voucher2_info_date">请在{{item.expirAt}}前使用</p>
                      <div class="choose" v-if="showChoose && index === 0 && parseFloat(totalMoney) >= item.min_amount" @click="chooseCoupon(item)" :class="{'chooseCurrent': chCoupon.id == item.id}">
                        <i class="iconfont radius-icon">&#xe61f;</i>
                      </div>
                    </div>
                  </div>
                  <div class="coupon_voucher2_foot" v-if="totalMoney && parseFloat(totalMoney) < item.min_amount && index === 0">
                    <div class="coupon_voucher2_hr"></div>
                    <div class="coupon_voucher2_description">
                      <p class="coupon_voucher2_description_title">还差<strong>¥{{ item.min_amount - parseFloat(totalMoney) }}</strong>可使用</p>
                    </div>
                  </div>
                </li>
                <div class="no-result-wrapper" v-show="!coupon.length">
                  <no-result title="暂无此类优惠券"></no-result>
                </div>
              </ul>
            </scroll>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <back @back="back"></back>
    <h1 class="title">{{this.$route.meta.title}}</h1>
    <loading v-show="!coupons.length"></loading>
  </div>
</template>

<script>
import Back from 'base/back/back'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import NoResult from 'base/no-result/no-result'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { getUserCoupon } from 'api/coupon'
import { mapGetters, mapMutations } from 'vuex'
import 'swiper/dist/css/swiper.css'

export default {
  name: 'coupon',
  data () {
    return {
      title: [],
      currentIndex: 0,
      swiperOption: {
        autoplay: false
      },
      coupons: [],
      showChoose: this.$route.meta.showChoose
    }
  },
  created () {
    this._getCoupon()
  },
  methods: {
    _getCoupon () {
      getUserCoupon().then((res) => {
        this._filterCoupon(res.data)
        this.tabTitle()
        this.$nextTick(() => {
          this.swiper.on('SlideChangeEnd', () => {
            this.currentIndex = this.swiper.activeIndex
          })
        })
      })
    },
    _filterCoupon (data) {
      let coupon = [[], [], []]
      data.forEach((item) => {
        // 过期了，没有使用
        if (dayjs().isAfter(dayjs(item.expirAt).add(1, 'day')) && parseInt(item.isUsed) === 0) {
          coupon[2].push(item)
        } else if (parseInt(item.isUsed) === 1) {
          coupon[1].push(item)
        } else if (dayjs().isBefore(dayjs(item.expirAt).add(1, 'day')) && parseInt(item.isUsed) === 0) {
          coupon[0].push(item)
        }
      })
      this.coupons = coupon
    },
    tabTitle () {
      let tab = [{ title: '待使用', count: this.coupons[0].length }, { title: '已使用', count: this.coupons[1].length }, { title: '已过期', count: this.coupons[2].length }]
      this.title = tab
    },
    selectTab (index) {
      this.currentIndex = index
      this.swiper.slideTo(index, 0, false)
    },
    back () {
      this.$router.back()
    },
    showTitle (date, index) {
      if (index === 1 || index === 2) {
        return true
      }
      dayjs.extend(isBetween)
      return dayjs(date).isBetween(dayjs().subtract(3, 'day'), dayjs())
    },
    chooseCoupon (item) {
      const money = parseInt(item.money).toFixed(2)
      this.setChooseCoupon({ id: item.id, money: money })
      this.$router.back()
    },
    ...mapMutations({
      setChooseCoupon: 'SET_CHOOSE_COUPON'
    })
  },
  computed: {
    swiper () {
      return this.$refs.swiper.swiper
    },
    ...mapGetters([
      'totalMoney',
      'chCoupon'
    ])
  },
  components: {
    Back,
    swiper,
    swiperSlide,
    Scroll,
    Loading,
    NoResult
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
              color: #ff774b
              border-top: 6px solid currentColor
              border-bottom: 10px solid #fff
              &.type_disabled
                color: #999
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
                background: linear-gradient(to left,#ff9574 20%,#e93b3d)
                box-shadow: 2px 2px 5px rgba(233,59,61,.2)
                &.color_gray
                  background: linear-gradient(to left, #ccc 20%, #999)
                  box-shadow: 2px 2px 5px hsla(0, 0%, 60%, .2)
                  &::before
                    background-color: #ccc
                  &::after
                    background-color: #999
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
                      background-color: #ff774b
                      &.icon
                        background-color: #999
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
                  .choose
                    position: absolute
                    top: 40px
                    right: 10px
                    width: 22px
                    height: 22px
                    border-radius: 50%
                    text-align: center
                    background: #bbb
                    &.chooseCurrent
                      background: #4eb828
                      border: 1px solid #4eb828
                    .radius-icon
                      color: #fff
                      line-height: 28px
                      font-weight: 700
                      font-size: 26px
              .coupon_voucher2_foot
                .coupon_voucher2_hr
                  position: relative
                  height: 18px
                  mask-border-slice: 12 fill
                  mask-border-width: 6px
                  background-color: #fff
                  box-sizing: border-box
                  &::before
                    content: "";
                    display: block;
                    border-top: 1px dashed #e5e5e5;
                    position: absolute;
                    left: 10px;
                    right: 10px;
                    top: 9px;
                .coupon_voucher2_description
                  display: block
                  background-color: #fff
                  padding: 0 10px
                  overflow: hidden
                  position: relative
            .no-result-wrapper
              margin-top: 150px
    .title
      position: absolute
      top: 0
      left: 10%
      width: 80%
      text-align: center
      line-height: 45px
      font-size: 18px
</style>
