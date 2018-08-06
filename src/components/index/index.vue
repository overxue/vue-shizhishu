<template>
  <div class="index">
    <scroll class="index-content">
      <div>
        <div class="slider-wrapper">
          <slider>
            <div v-for="(item, index) of bannerList" :key="index">
              <a href="javascript:void(0)">
                <img :src="item.imgUrl">
              </a>
            </div>
          </slider>
        </div>
        <div class="shop-wrapper">
          <div class="shop-top">
            <div class="icon">
              <i class="iconfont icon-item">&#xe603;</i>
            </div>
            <div class="text">
              <p class="title">购物专享券</p>
            </div>
            <div class="icon-back">
              <span>领券购物更优惠</span>
            </div>
          </div>
          <div class="sell">
            <div class="sell-wraper" ref="sell">
              <ul class="sell-list" ref="sellGroup">
                <li class="sell-borer">
                  <div class="radius-top"></div>
                  <div class="radius-bottom"></div>
                  <div class="sell-price">
                    <div class="sell-price-item">
                      <div class="sell-desc">
                        <span class="sell-desc-title">￥</span><span class="sell-desc-many">20</span>
                      </div>
                    </div>
                    <div class="sell-price-right">
                      <div class="sell-right-desc">全场商品满20-10</div>
                    </div>
                  </div>
                </li>
                <li class="sell-borer">
                  <div class="radius-top"></div>
                  <div class="radius-bottom"></div>
                  <div class="sell-price">
                    <div class="sell-price-item">
                      <div class="sell-desc">
                        <span class="sell-desc-title">￥</span><span class="sell-desc-many">20</span>
                      </div>
                    </div>
                    <div class="sell-price-right">
                      <div class="sell-right-desc">全场商品满20-10</div>
                    </div>
                  </div>
                </li>
                <li class="sell-borer">
                  <div class="radius-top"></div>
                  <div class="radius-bottom"></div>
                  <div class="sell-price">
                    <div class="sell-price-item">
                      <div class="sell-desc">
                        <span class="sell-desc-title">￥</span><span class="sell-desc-many">20</span>
                      </div>
                    </div>
                    <div class="sell-price-right">
                      <div class="sell-right-desc">全场商品满20-10</div>
                    </div>
                  </div>
                </li>
                <li class="sell-borer">
                  <div class="radius-top"></div>
                  <div class="radius-bottom"></div>
                  <div class="sell-price">
                    <div class="sell-price-item">
                      <div class="sell-desc">
                        <span class="sell-desc-title">￥</span><span class="sell-desc-many">20</span>
                      </div>
                    </div>
                    <div class="sell-price-right">
                      <div class="sell-right-desc">全场商品满20-10</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="shop-wrapper">
          <div class="shop-top">
            <div class="icon">
              <i class="iconfont icon-item">&#xe60e;</i>
            </div>
            <div class="text">
              <p class="title">新鲜蔬菜</p>
            </div>
            <div class="icon-back">
              <span>新鲜每一天</span>
            </div>
          </div>
          <ul class="shop-bottom">
            <li class="bottom-item">
              <div class="img">
                <img width="125" height="125" src="https://s.lovejixiaoyue.cn/images/201706/source_img/27_G_1497851581998.jpg">
              </div>
              <div class="title">丝瓜</div>
              <div class="price">
                <span class="pric">￥3</span><span class="ke">/斤(500g)</span>
              </div>
            </li>
            <li class="bottom-item">
              <div class="img">
                <img width="125" height="125" src="https://s.lovejixiaoyue.cn/images/201706/source_img/27_G_1497851581998.jpg">
              </div>
              <div class="title">丝瓜</div>
              <div class="price">
                <span class="pric">￥3</span>
                <span class="ke">/斤(500g)</span>
              </div>
            </li>
            <li class="bottom-item">
              <div class="img">
                <img width="125" height="125" src="https://s.lovejixiaoyue.cn/images/201706/source_img/27_G_1497851581998.jpg">
              </div>
              <div class="title">丝瓜</div>
              <div class="price">
                <span class="pric">￥3</span>
                <span class="ke">/斤(500g)</span>
              </div>
            </li>
            <li class="bottom-item">
              <div class="img">
                <img width="125" height="125" src="https://s.lovejixiaoyue.cn/images/201706/source_img/27_G_1497851581998.jpg">
              </div>
              <div class="title">丝瓜</div>
              <div class="price">
                <span class="pric">￥3</span>
                <span class="ke">/斤(500g)</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="shop-wrapper">
          <div class="shop-top">
            <div class="icon">
              <i class="iconfont icon-item">&#xe60e;</i>
            </div>
            <div class="text">
              <p class="title">新鲜蔬菜</p>
            </div>
            <div class="icon-back">
              <i class="iconfont">&#xe68b;</i>
            </div>
          </div>
          <ul class="shop-bottom">
            <li class="bottom-item">
              <div class="img">
                <img width="125" height="125" src="https://s.lovejixiaoyue.cn/images/201706/source_img/52_G_1498123205025.jpg">
              </div>
              <div class="title">丝瓜</div>
              <div class="price">
                <span class="pric">￥3</span>
                <span class="ke">/斤(500g)</span>
              </div>
            </li>
            <li class="bottom-item">
              <div class="img">
                <img width="125" height="125" src="https://s.lovejixiaoyue.cn/images/201706/source_img/27_G_1497851581998.jpg">
              </div>
              <div class="title">丝瓜</div>
              <div class="price">
                <span class="pric">￥3</span>
                <span class="ke">/斤(500g)</span>
              </div>
            </li>
            <li class="bottom-item">
              <div class="img">
                <img width="125" height="125" src="https://s.lovejixiaoyue.cn/images/201706/source_img/27_G_1497851581998.jpg">
              </div>
              <div class="title">丝瓜</div>
              <div class="price">
                <span class="pric">￥3</span>
                <span class="ke">/斤(500g)</span>
              </div>
            </li>
            <li class="bottom-item">
              <div class="img">
                <img width="125" height="125" src="https://s.lovejixiaoyue.cn/images/201706/source_img/27_G_1497851581998.jpg">
              </div>
              <div class="title">丝瓜</div>
              <div class="price">
                <span class="pric">￥3</span>
                <span class="ke">/斤(500g)</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Slider from 'base/slider/slider'
import BScroll from 'better-scroll'
import Scroll from 'base/scroll/scroll'

export default {
  data () {
    return {
      bannerList: [
        { id: '26683290', imgUrl: 'http://oprwd6vhr.bkt.clouddn.com/baner/1.jpg' },
        { id: '25793398', imgUrl: 'http://oprwd6vhr.bkt.clouddn.com/baner/2.jpg' },
        { id: '25793398', imgUrl: 'http://oprwd6vhr.bkt.clouddn.com/baner/3.jpg' },
        { id: '25793398', imgUrl: 'http://oprwd6vhr.bkt.clouddn.com/baner/4.jpg' }
      ]
    }
  },
  mounted () {
    this._initSlider()
    this._initScroll()
  },
  methods: {
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
    _initScroll () {
      this.sell = new BScroll(this.$refs.sell, {
        scrollX: true,
        scrollY: false,
        click: true,
        scrollbar: true
      })
    }
  },
  components: {
    Slider,
    Scroll
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
        position: relative
        width: 100%
        overflow: hidden
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
                width: 160px
                height: 70px
                background: $color-sell-background
                color: $color-font
                .sell-price
                  display: flex
                  align-items: center
                  .sell-price-item
                    flex: 0 0 94px
                    height: 70px
                    text-align: center
                    .sell-desc
                      padding: 10px
                      border-right: 1px solid $color-text-d
                      margin-top: 12.5px
                      .sell-desc-title
                        font-size: $font-size-small
                      .sell-desc-many
                        font-weight: 700
                        font-size: $font-size-icon
                  .sell-price-right
                    flex: 0 0 66px
                    .sell-right-desc
                      width: 50px
                      margin: 0 auto
                      white-space:normal
                      font-size: $font-size-small
                      line-height: 14px
                .radius-top
                  position: absolute
                  top: 0
                  left: 90px
                  width: 8px
                  height: 4px
                  border-radius:0 0 4px 4px; /* 左上、右上、右下、左下 */
                  background: $color-font
                .radius-bottom
                  position: absolute
                  bottom: 0
                  left: 90px
                  width: 8px
                  height: 4px
                  border-radius:4px 4px 0 0; /* 左上、右上、右下、左下 */
                  background: $color-font
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
              margin-top: 5px
            .price
              padding: 10px 0
              .pric
                color: $color-shop-color
              .ke
                color: $color-shop-g
</style>
