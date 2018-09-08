<template>
  <div class="shop">
    <div class="shop-top">
      <scroll class="shop-content">
        <div class="shop-wrapper">
          <div class="slider-wrapper">
            <swiper :bannerList="bannerList"></swiper>
          </div>
          <div class="content">
            <div class="content-wrapper">
              <h1 class="title">{{productDetail.title}}</h1>
              <div class="price">
                <span class="price-p">价格:</span><span class="price-f">￥</span><span class="price-m">{{productDetail.price}}</span><span class="price-r">/{{productDetail.unit}}</span>
              </div>
              <div class="shop-weight" v-if="productDetail.unit === '斤'">
                <span>购买重量:</span>
                <div class="weight-i">
                  <text-input type="number" placeholder="请输入购买重量" :show="showIcon" @query="query"></text-input>
                </div>
                <span>g</span>
                <span class="weight-l" v-show="weight">({{weight}})</span>
              </div>
              <div class="shop-weight" v-else>
                <span>购买数量:</span>
                <div class="weight-il">
                  <input-number :number="number" @query="query"></input-number>
                </div>
              </div>
              <div class="desc" v-if="productDetail.unit === '斤'">
                <p class="desc-l">温馨提示:</p>
                <p class="desc-r">500g = 1斤 = 10两</p>
              </div>
              <div class="desc">
                <p class="desc-l">运费:</p>
                <p class="desc-r">满20起送，配送费3元</p>
              </div>
              <div class="desc desc-border">
                <p class="desc-l">说明:</p>
                <p class="desc-r">蔬菜重量误差为上下10g左右，您对菜品有什么特殊的要求(比如,削不削皮),可以在下单时留言告诉我们</p>
              </div>
            </div>
          </div>
        </div>
      </scroll>
    </div>
    <back @back="back"></back>
    <div class="bottom">
      <div class="content">
        <div class="content-left">
          <div class="content-all">
            <div class="content-icon">
              <i class="iconfont icon">&#xe63e;</i>
              <div class="icon-test">菜篮子</div>
              <div class="cicle">14</div>
            </div>
            <div class="content-and">
              <span class="content-heji">金额:</span>
              <span class="content-price">￥{{total}}</span>
            </div>
          </div>
        </div>
        <div class="content-right">
          <div class="pay" :class="{'extra': total > 0}">加入菜篮子</div>
        </div>
      </div>
    </div>
    <loading v-show="!productDetail.productImages"></loading>
  </div>
</template>

<script>
import TextInput from 'base/input/input'
import Swiper from 'base/swiper/swiper'
import Scroll from 'base/scroll/scroll'
import Back from 'base/back/back'
import Loading from 'base/loading/loading'
import InputNumber from 'base/input/input-number'
import { getProductDetail } from 'api/product'

export default {
  name: 'productDetail',
  data () {
    return {
      showIcon: false,
      productDetail: [],
      number: 1,
      inputValue: 0
    }
  },
  created () {
    this._getProductDetail()
  },
  computed: {
    bannerList () {
      if (this.productDetail.productImages) {
        return this.productDetail.productImages.data
      }
    },
    total () {
      let price = this.productDetail.price
      let prix = this.productDetail.unit === '斤' ? price / 500 : price
      return (prix * this.inputValue).toFixed(2)
    },
    weight () {
      if (this.productDetail.unit !== '斤') return
      let weight = this.inputValue / 50
      if (this.inputValue % 500 !== 0 && this.inputValue > 499) {
        let res = (weight / 10).toString().split('.')
        return `${res[0]}斤${res[1]}两`
      } else if (this.inputValue < 500 && this.inputValue !== 0 && this.inputValue !== '') {
        return `${weight}两`
      } else if (this.inputValue % 500 === 0 && this.inputValue > 499) {
        return `${weight / 10}斤`
      }
    }
  },
  methods: {
    _getProductDetail () {
      const id = this.$route.params.id
      getProductDetail(id).then((res) => {
        this.productDetail = res
        if (this.productDetail.unit !== '斤') {
          this.inputValue = 1
        }
      })
    },
    back () {
      this.$router.back()
    },
    query (nVal) {
      console.log(nVal)
      this.inputValue = nVal
    }
  },
  components: {
    Swiper,
    TextInput,
    Scroll,
    Back,
    Loading,
    InputNumber
  }
}
</script>

<style scoped lang="stylus" rel="stylesheed/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .shop
    position: fixed
    width: 100%
    top: 0
    bottom: 0
    .shop-top
      position: absolute
      top: 0
      bottom: 50px
      width: 100%
      background: $color-tab-background
      .shop-content
        height: 100%
        overflow: hidden
        .shop-wrapper
          .slider-wrapper
            overflow: hidden
            width: 100%
            height: 0
            padding-bottom: 55.5%
            background: $color-background
          .content
            margin-top: 10px
            height: 100%
            background: $color-tab-background
            .content-wrapper
              margin: 0 10px
              height: 100%
              .title
                padding: 15px 0
                font-size: 20px
                font-weight: 700
                border-1px($color-border)
              .price
                padding: 15px 0
                font-size: $font-size-medium-x
                border-1px($color-border)
                .price-p
                  color: #707070
                .price-f
                  margin-left: 5px
                  color: $color-shop-color
                .price-m
                  font-size: $font-size-center
                  font-weight: 600
                  color: $color-shop-color
                .price-r
                  margin-left: 1px
                  color: $color-shop-g
              .shop-weight
                display: flex
                height: 50px
                line-height: 50px
                font-size: $font-size-medium-x
                color: $color-icon
                border-1px($color-border)
                .weight-i
                  margin: 0 10px
                  width: 150px
                .weight-il
                  display: flex
                  background: $color-background
                  height: 25px
                  line-height: 25px
                  margin-top: 12.5px
                  margin-left: 10px
                .weight-l
                  margin-left: 15px
                  color: $color-shop-color
              .desc
                padding: 10px 0
                display: flex
                border-1px($color-border)
                &.desc-border
                  border-none()
              .desc-r
                margin-left: 5px
                flex: 1
                color: $color-shop-g
                line-height: 20px
    .bottom
      position: absolute
      bottom: 0
      left: 0
      width: 100%
      height: 50px
      background: $color-tab-background
      .content
        display: flex
        border-t($color-border)
        .content-left
          flex: 1
          .content-all
            display: flex
            justify-content: space-between
            align-items: center
            padding-right: 15px
            height: 100%
            .content-icon
              display: flex
              justify-content:center
              flex-direction: column
              align-items:center
              width: 60px
              height: 100%
              border-right: 1px solid $color-border
              .icon
                font-size: $font-size-large-x
              .icon-test
                margin-top: 2px
                font-size: $font-size-medium
              .cicle
                position: absolute
                top: 5px
                left: 35px
                width: 15px
                height: 15px
                border-radius: 7.5px
                background: $color-icon
                text-align: center
                font-size: $font-size-small
                line-height: 15px
                color: $color-font
            .content-and
              font-size: $font-size-medium
              .content-price
                font-weight: 700
                color: $color-shop-color
        .content-right
          flex: 0 0 105px
          width: 105px
          .pay
            line-height: 50px
            text-align: center
            font-size: $font-size-medium
            font-weight: 700
            background: $color-tab-text
            color: #fff
            &.extra
              background: $color-highlight-background
</style>
