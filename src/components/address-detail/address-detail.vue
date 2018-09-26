<template>
  <transition name="slide">
    <div class="address-detail">
      <div class="address-wrapper">
        <h1 class="title">新增地址</h1>
        <ul>
          <li class="address-item">
            <div class="address-desc">姓名</div>
            <text-input type="text" name="contact_name" placeholder="姓名" class="user-input"></text-input>
          </li>
          <li class="address-item">
            <div class="address-desc">电话</div>
            <text-input type="number" name="contact_phone" placeholder="手机号码" class="user-input"></text-input>
          </li>
          <li class="address-item">
            <div class="address-desc">地址</div>
            <div class="user-input" @click="show">123</div>
          </li>
          <li class="address-item">
            <div class="address-desc">门牌号</div>
            <text-input type="text" name="address" placeholder="例：5号楼203室" class="user-input"></text-input>
          </li>
        </ul>
        <div class="address-save">
          <span>保存</span>
        </div>
      </div>
      <back @back="back"></back>
      <picker @select="handleSelect(arguments)" :data="linkageData" :selected-index="selectedIndex"
          ref="picker" :title="title" @change="handleChange" :cancelTxt="cancelTxt" :confirmTxt="confirmTxt"></picker>
    </div>
  </transition>
</template>

<script>
import TextInput from 'base/input/input'
import Back from 'base/back/back'
import Picker from 'base/picker/picker'
import { provinceList, cityList, areaList } from 'common/js/areaData'

export default {
  data () {
    return {
      tempIndex: [0, 0, 0],
      selectedIndex: [0, 0, 0],
      title: '地址选择',
      cancelTxt: '取消',
      confirmTxt: '确定'
    }
  },
  components: {
    TextInput,
    Back,
    Picker
  },
  computed: {
    linkageData () {
      const provinces = provinceList
      const cities = cityList[provinces[this.tempIndex[0]].value]
      const areas = areaList[cities[this.tempIndex[1]].value]
      return [provinces, cities, areas]
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    show () {
      this.$refs.picker.setData(this.linkageData)
      this.$refs.picker.show()
    },
    handleSelect (args) {
      console.log(args[2])
      // this.$emit('select', ...args)
    },
    handleChange (i, newIndex) {
      if (newIndex !== this.tempIndex[i]) {
        for (let j = 2; j > i; j--) {
          this.tempIndex.splice(j, 1, 0)
          this.$refs.picker.scrollTo(j, 0)
        }

        this.tempIndex.splice(i, 1, newIndex)
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheed/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .address-detail
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    background: #fff
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .address-wrapper
      overflow: hidden
      height: 100%
      .title
        position: absolute
        top: 0
        left: 10%
        width: 80%
        text-align: center
        line-height: 45px
        font-size: 18px
      .address-item
        display: flex
        height: 50px
        line-height: 50px
        border-1px($color-border)
        margin: 0 10px
        &:first-child
          border-t($color-border)
          margin-top: 70px
        .address-desc
          flex: 0 0 100px
          font-weight: 600
          font-size: $font-size-medium
        .user-input
          flex: 0 0 1
          >>> .input-item
            background: #fff
      .address-save
        margin: 20px
        height: 40px
        background: $color-highlight-background
        border-radius: 20px
        text-align: center
        line-height: 40px
        color: #fff
</style>
