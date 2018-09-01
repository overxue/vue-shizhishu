<template>
  <div class="index">
    <scroll class="index-content">
      <div>
        <div class="slider-wrapper">
          <swiper :bannerList="bannerList"></swiper>
        </div>
        <div class="shop-wrapper" v-if="coupons.length">
          <div class="shop-top">
            <div class="icon">
              <i class="iconfont icon-item">&#xe603;</i>
            </div>
            <div class="text">
              <p class="title">购物专享券</p>
            </div>
            <div class="icon-back" @click="receiveCoupons(1)">
              <span>领券购物更优惠</span>
            </div>
          </div>
          <div class="sell">
            <scroll class="sell-wraper" :scrollX="scrollX" :scrollY="scrollY" :click="click">
              <ul class="sell-list" ref="sellGroup">
                <li class="sell-borer" v-for="(coupon, index) of coupons" :key="index">
                  <div class="radius-top"></div>
                  <div class="radius-bottom"></div>
                  <div class="sell-price">
                    <div class="sell-price-item">
                      <div class="sell-desc">
                        <div class="sell-desc-mon">
                          <span class="sell-desc-title">￥</span><span class="sell-desc-many">{{coupon.money}}</span>
                        </div>
                        <div class="sell-desc-rule">
                          <span>{{coupon.description}}</span>
                          <p>{{coupon.expirAt}} 到期</p>
                        </div>
                      </div>
                    </div>
                    <div class="sell-price-right" @click.stop.prevent="receiveCoupon(coupon.id)">
                      <div class="sell-right-desc">立即领取</div>
                    </div>
                  </div>
                </li>
              </ul>
            </scroll>
          </div>
        </div>
        <div class="shop-wrapper" v-for="(item, index) of categoryProducts" :key="index">
          <div class="shop-top">
            <div class="icon">
              <i class="iconfont icon-item" v-html="item.iconfont"></i>
            </div>
            <div class="text">
              <p class="title">{{item.name}}</p>
            </div>
            <div class="icon-back">
              <span>新鲜每一天</span>
            </div>
          </div>
          <ul class="shop-bottom">
            <li class="bottom-item" v-for="(product, ind) of item.products.data" :key="ind">
              <div class="img">
                <img width="125" height="125" v-lazy="product.image">
              </div>
              <div class="title">{{product.title}}</div>
              <div class="price">
                <span class="pric">￥{{product.price}}</span><span class="ke">/{{product.unit}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <loading v-show="!bannerList.length && !coupons.length && !categoryProducts.length"></loading>
    <tip :message="message"></tip>
  </div>
</template>

<script>
import Loading from 'base/loading/loading'
import Swiper from 'base/swiper/swiper'
import Scroll from 'base/scroll/scroll'
import Tip from 'base/tip/tip'
import {getBanner} from 'api/banner'
import {getCoupon, receiveCoupon} from 'api/coupon'
import {getCategoryProduct} from 'api/category'

export default {
  name: 'home',
  data () {
    return {
      bannerList: [],
      coupons: [],
      categoryProducts: [],
      scrollX: true,
      scrollY: false,
      click: false,
      message: ''
    }
  },
  created () {
    this._getBanner()
    this._getCoupon()
    this._getCategoryProduct()
  },
  methods: {
    _getBanner () {
      getBanner().then((res) => {
        this.bannerList = res.data
      })
    },
    _getCoupon () {
      getCoupon().then((res) => {
        this.coupons = res.data
      })
    },
    _getCategoryProduct () {
      getCategoryProduct(0).then((res) => {
        this.categoryProducts = res.data
      })
    },
    _initSlider () {
      this.children = this.$refs.sellGroup.children
      let margin = 6
      let width = 0 - margin
      for (let i = 0; i < this.children.length; i++) {
        // 单个元素的宽度
        let childWidth = this.children[i].clientWidth + margin
        width += childWidth
      }
      this.$refs.sellGroup.style.width = width + 'px'
    },
    receiveCoupon (id) {
      receiveCoupon(id).then((res) => {
        console.log(res)
      }).catch((error) => {
        let err = error.response
        if (err.status === 401) {
          this.message = err.data.message
        }
      })
    }
  },
  watch: {
    coupons (nVal) {
      if (nVal.length > 0) {
        this.$nextTick(() => {
          this._initSlider()
        })
      }
    }
  },
  components: {
    Scroll,
    Loading,
    Swiper,
    Tip
  }
}
</script>

<style scoped lang="stylus" rel="stylesheed/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin.styl"

  .index
    position: fixed
    width: 100%
    top: 0
    bottom: 50px
    .index-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        overflow: hidden
        width: 100%
        height: 0
        padding-bottom: 40%
        background: $color-background
      .shop-wrapper
        margin-top: 10px
        width: 100%
        height: 100%
        background: $color-tab-background
        .shop-top
          display: flex
          padding: 0 10px
          height: 40px
          border-1px($color-shop-border)
          line-height: 40px
          .icon
            flex: 0 0 20px;
            margin-right: 5px
            .icon-item
              color: $color-highlight-background
              font-size: $font-size-large-x
          .text
            flex: 1
            .title
              font-size: $font-size-medium
          .icon-back
            flex: 0 0 auto
            color: $color-tab-color
            font-size: $font-size-medium
        .sell
          position: relative
          padding: 10px
          .sell-wraper
            width: 100%
            overflow: hidden
            white-space: nowrap
            .sell-list
              font-size: 0
              .sell-borer
                position: relative
                display: inline-block
                margin-right: 6px
                width: 190px
                height: 80px
                background: $color-sell-background
                color: $color-font
                .sell-price
                  display: flex
                  align-items: center
                  .sell-price-item
                    flex: 0 0 150px
                    height: 80px
                    .sell-desc
                      padding: 10px 0
                      border-right: 1px dashed $color-text-d
                      margin-top: 16px
                      .sell-desc-mon
                        display: inline-block
                        margin-left: 10px
                        .sell-desc-title
                          font-size: $font-size-small
                        .sell-desc-many
                          font-weight: 700
                          font-size: $font-size-icon
                      .sell-desc-rule
                        font-size: 12px
                        display: inline-block
                        margin-left: 5px
                        p
                          padding-top: 3px
                  .sell-price-right
                    flex: 0 0 40px
                    .sell-right-desc
                      width: 14px
                      white-space:normal
                      padding: 3px 6px
                      text-align: center
                      font-size: 12px
                      margin: 0 auto
                      line-height: 15px
                .radius-top, .radius-bottom
                  position: absolute
                  left: 146px
                  width: 8px
                  height: 4px
                  background: $color-font
                .radius-top
                  top: 0
                  border-radius:0 0 4px 4px; /* 左上、右上、右下、左下 */
                .radius-bottom
                  bottom: 0
                  border-radius:4px 4px 0 0; /* 左上、右上、右下、左下 */
                border-radius: 5px
                &:last-child
                  margin-right: 0
        .shop-bottom
          display: flex
          flex-wrap: wrap
          justify-content: space-between
          padding: 10px 10px 0 10px
          .bottom-item
            flex: 1
            text-align: center
            border: 1px solid $color-shop-border
            border-radius: 10px
            box-shadow: 5px 5px 5px #eee
            margin-right: 10px
            margin-bottom: 10px
            &:nth-of-type(even)
              margin-right: 0
            .title
              margin: 0 1px
              overflow: hidden
              text-overflow: ellipsis
              display: -webkit-box
              -webkit-box-orient: vertical
              -webkit-line-clamp: 2
              margin-top: 5px
            .price
              padding: 10px 0
              .pric
                color: $color-shop-color
              .ke
                color: $color-shop-g
</style>
