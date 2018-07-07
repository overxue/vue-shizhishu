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
