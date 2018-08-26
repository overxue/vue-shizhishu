<template>
  <div class="shoplist">
    <div class="shoplist-wrapper">
      <scroll class="menu-wrapper" ref="menuWrapper">
        <ul>
            <li class="menu-item" v-for="(category, index) in categories" :key="index" :class="{'current':currentIndex === index}" ref="menuList" @click="selectMenu(index)">
              <div class="text border-1px">
                <span class="iconfont icon" v-html="category.iconfont"></span>
                <span class="desc">{{category.name}}</span>
              </div>
            </li>
          </ul>
      </scroll>
      <scroll class="foods-wrapper" :probeType="probeType"  :listenScroll="listenScroll" @scroll="scroll" ref="foodWrapper">
        <ul>
          <li v-for="(categoryProduct, index) in categoryProducts" :key="index" ref="foodList">
            <h1 class="title">{{categoryProduct.name}}</h1>
            <ul>
              <li class="food-item" v-for="(item, ind) in categoryProduct.products.data" :key="ind">
                <div class="icon">
                  <img v-lazy="item.image" width="57" height="57">
                </div>
                <div class="content">
                  <h2 class="name">{{item.title}}</h2>
                  <div class="extra">
                    <span class="count">月售229份</span>
                    <span>好评率100%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{item.price}}/{{item.unit}}</span>
                    <span class="old">￥2</span>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </scroll>
      <div class="list-fixed" ref="fixed" v-show="fixedTitle">
        <h1 class="fixed-title">{{fixedTitle}}</h1>
      </div>
      <Loading v-show="!categories.length && !categoryProducts.length"></Loading>
    </div>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {getCateogry, getCategoryProduct} from 'api/category'
export default {
  data () {
    return {
      probeType: 3,
      categories: [],
      categoryProducts: [],
      listHeight: [],
      listenScroll: true,
      scrollY: 0,
      currentIndex: 0,
      diff: -1
    }
  },
  created () {
    setTimeout(() => {
      this._getCategory()
      this._getCategoryProduct()
    }, 1000)
  },
  computed: {
    fixedTitle () {
      if (this.scrollY > 0) {
        return ''
      }
      return this.categories[this.currentIndex] ? this.categories[this.currentIndex].name : ''
    }
  },
  methods: {
    selectMenu (index) {
      let foodList = this.$refs.foodList
      let el = foodList[index]
      this.$refs.foodWrapper.scrollToElement(el, 300)
    },
    _getCategory () {
      getCateogry().then((res) => {
        this.categories = res.data
      })
    },
    _getCategoryProduct () {
      getCategoryProduct(1).then((res) => {
        this.categoryProducts = res.data
        this.$nextTick(() => {
          this._calculateHeight()
        })
      })
    },
    _calculateHeight () {
      let foodList = this.$refs.foodList
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    _followScroll (index) {
      let menuList = this.$refs.menuList
      if (menuList) {
        let el = menuList[index]
        this.$refs.menuWrapper.scrollToElement(el, 300)
      }
    }
  },
  watch: {
    scrollY (newY) {
      const listHeight = this.listHeight
      // 当滚动到顶部，newY>0
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      // 在中间部分滚动
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this._followScroll(i)
          this.currentIndex = i
          this.diff = height2 + newY
          return
        }
      }
    },
    diff (newVal) {
      let fixedTop = (newVal > 0 && newVal < 26) ? newVal - 26 : 0
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
    }
  },
  components: {
    Scroll,
    Loading
  }
}
</script>

<style scoped lang="stylus" rel="stylesheed/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .shoplist
    position: fixed
    top: 0
    bottom: 50px
    width: 100%
    .shoplist-wrapper
      overflow: hidden
      height: 100%
      display: flex
      .menu-wrapper
        position: relative
        flex: 0 0 80px
        width: 80px
        background: #f3f5f7
        .menu-item
          display: table
          height: 65px
          width: 56px
          padding: 0 12px
          &.current
            position: relative
            z-index: 10
            margin-top: -1px
            background: #fff
            .text
              border-none()
              .icon
                color: $color-highlight-background
              .desc
                color: $color-highlight-background
                font-weight: 700
          .text
            display: table-cell
            vertical-align: middle
            width: 56px
            height: 65px
            font-size: 12px
            border-1px(rgba(7,17,27,.1))
            text-align: center
            .icon
              font-size: 22px
              color: #aaa
            .desc
              display: block
              margin-top: 5px
              color: #686868
      .foods-wrapper
        flex: 1
        background: #fff
        .title
          padding-left: 14px
          height: 26px
          line-height: 26px
          border-left: 2px solid #d9dde1
          font-size: 12px
          color: #93999f
          background: #f3f5f7
        .food-item
          display: flex
          margin: 18px
          padding-bottom: 18px
          border-1px(rgba(7,17,27,.1))
          &:last-child
            border-none()
            margin-bottom: 0
          .icon
            flex: 0 0 57px
            margin-right: 10px
          .content
            flex: 1
            .name
              //overflow: hidden;
              //white-space: nowrap;
              //text-overflow: ellipsis;
              margin: 2px 0 8px
              height: 14px
              line-height: 14px
              font-size: 14px
              color: #07111b
            .extra
              line-height: 10px
              font-size: 10px
              color: #93999f
              .count
                margin-right: 12px
            .price
              font-weight: 700
              line-height: 24px
              .now
                margin-right: 8px
                font-size: 14px
                color: #f01414
              .old
                text-decoration: line-through
                font-size: 10px
                color: #93999f
      .list-fixed
        position: absolute
        top: 0
        left: 80px
        width: 100%
        .fixed-title
          padding-left: 14px
          height: 26px
          line-height: 26px
          border-left: 2px solid #d9dde1
          font-size: 12px
          color: #93999f
          background: #f3f5f7
</style>
