<template>
  <transition name="picker-fade">
    <div class="picker">
      <transition name="picker-move">
        <div class="picker-panel">
          <div class="picker-choose">
            <span class="cancel">取消</span>
            <span class="confirm">确定</span>
            <h1 class="picker-title">选择地址</h1>
          </div>
          <div class="picker-content">
            <div class="mask-top"></div>
            <div class="mask-bottom"></div>
            <div class="wheel-wrapper" ref="wheelWrapper">
              <div class="wheel">
                <ul class="wheel-scroll">
                  <li class="wheel-item" v-for="(item, index) of province" :key="index" :data-id="index">{{item}}</li>
                </ul>
              </div>
              <div class="wheel">
                <ul class="wheel-scroll">
                  <li class="wheel-item" v-for="(it, ind) of city" :key="ind" :data-id="ind">{{it}}</li>
                </ul>
              </div>
              <div class="wheel">
                <ul class="wheel-scroll">
                  <li class="wheel-item" v-for="(ite, inde) of district" :key="inde" :data-id="inde">{{ite}}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="picker-footer"></div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import BScroll from 'better-scroll'
import addressData from 'china-area-data/v3/data'

export default {
  data () {
    return {
      pickerData: 3,
      province: addressData['86'],
      city: addressData['110000'],
      district: addressData['110100'],
      wheels: []
    }
  },
  mounted () {
    setTimeout(() => {
      let wheelWrapper = this.$refs.wheelWrapper
      for (let i = 0; i < this.pickerData; i++) {
        this._createWheel(wheelWrapper, i)
      }
      this.$emit('change', 0, this.province['110000'])
      this.$emit('change', 1, this.city['110100'])
      this.$emit('change', 2, this.district['110101'])
    }, 20)
  },
  methods: {
    scrollTo (index, dist) {
      const wheel = this.wheels[index]
      wheel.wheelTo(dist)
    },
    _createWheel (wheelWrapper, i) {
      if (!this.wheels[i]) {
        this.wheels[i] = new BScroll(wheelWrapper.children[i], {
          wheel: {
            selectedIndex: 0,
            /** 默认值就是下面配置的两个，为了展示二者的作用，这里再配置一下 */
            wheelWrapperClass: 'wheel-scroll',
            wheelItemClass: 'wheel-item'
          },
          probeType: 3
        })
        this.wheels[i].on('scrollEnd', () => {
          let wheel = this.wheels[i]
          let id = wheel.items[wheel.getSelectedIndex()].dataset.id
          if (i === 0) {
            this.city = addressData[id]
            this.district = addressData[parseInt(id) + 100]
            this.scrollTo(1, 0)
            this.scrollTo(2, 0)
            this.$emit('change', 0, this.province[id])
            this.$emit('change', 1, this.city[parseInt(id) + 100])
            this.$emit('change', 2, Object.values(this.district)[0])
          } else if (i === 1) {
            this.district = addressData[id]
            this.scrollTo(2, 0)
            this.$emit('change', 1, this.city[id])
            if (this.district) {
              this.$emit('change', 2, Object.values(this.district)[0])
            }
          } else if (i === 2) {
            this.$emit('change', 3, this.district[id])
          }
        })
      } else {
        this.wheels[i].refresh()
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheed/stylus">
  .picker
    position: fixed
    left: 0
    top: 0
    z-index: 100
    width: 100%
    height: 100%
    overflow: hidden
    text-align: center
    font-size: 14px
    background-color: rgba(37,38,45,.4)
    &.picker-fade-enter, &.picker-fade-leave-active
      opacity: 0
    &.picker-fade-enter-active, &.picker-fade-leave-active
      transition: all .3s ease-in-out
    .picker-panel
      position: absolute
      z-index: 600
      bottom: 0
      width: 100%
      height: 273px
      background: #fff
      &.picker-move-enter, &.picker-move-leave-active
        transform: translate3d(0, 273px, 0)
      &.picker-move-enter-active, &.picker-move-leave-active
        transition: all .3s ease-in-out
      .picker-choose
        position: relative
        height: 60px
        color: #999
        border-1px(#ebebeb)
        .picker-title
          margin: 0
          line-height: 60px
          font-weight: normal
          text-align: center
          font-size: 18px
          color: #333
        .confirm, .cancel
          position: absolute
          top: 6px
          padding: 16px
          font-size: 14px
        .confirm
          right: 0
          color: #007bff
        .cancel
          left: 0
      .picker-content
        position: relative
        top: 20px
        .mask-top, .mask-bottom
          z-index: 10
          width: 100%
          height: 68px
          pointer-events: none
          transform: translateZ(0)
        .mask-top
          position: absolute
          top: 0
          background: linear-gradient(to top, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8))
          border-bottom: 1px solid red
        .mask-bottom
          position: absolute
          bottom: 1px
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8))
          border-top: 1px solid red
      .wheel-wrapper
        display: flex
        padding: 0 16px
        .wheel
          flex: 1;
          -webkit-flex-basis: 1e-9px;
          -ms-flex-preferred-size: 1e-9px;
          flex-basis: 1e-9px;
          width: 1%;
          height: 173px
          overflow: hidden
          font-size: 20px
          .wheel-scroll
            padding: 0
            margin-top: 68px
            line-height: 36px
            list-style: none
            .wheel-item
              list-style: none
              height: 36px
              overflow: hidden
              white-space: nowrap
              color: #333
    .picker-footer
      height: 20px
</style>
