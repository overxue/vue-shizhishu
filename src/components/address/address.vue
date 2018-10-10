<template>
  <div class="address">
    <div class="pat-top border-bottom-1px">
      <back @back="back"></back>
      <h1 class="sub">{{this.$route.meta.title}}</h1>
    </div>
    <div class="address-content">
      <scroll class="address-wrapper">
        <transition-group name="list" tag="ul">
          <li :key="address.id" class="address-item" v-for="address in addresses">
            <div class="address-top" :class="{'address-chose':show}">
              <div class="text">
                <span class="name">{{address.contact_name}}</span>
                <span class="phone">{{address.contact_phone}}</span>
              </div>
              <div class="add">
                {{address.fulladdress}}
              </div>
              <div class="choose" v-show="show" @click="chooseAddress(address.id)" :class="{'chooseCurrent': addressId == address.id}">
                <i class="iconfont radius-icon">&#xe61f;</i>
              </div>
            </div>
            <div class="address-bottom">
              <div class="left" :class="{'current':address.default_address}" @click="defaultAddress(address.id, address.default_address)">
                <div class="radius">
                  <i class="iconfont radius-icon" v-if="address.default_address">&#xe61f;</i>
                </div>
                <span class="desc" v-if="address.default_address">默认地址</span>
                <span class="desc" v-else>设为默认</span>
              </div>
              <div class="right">
                <router-link tag="div" class="edit" :to="`/address/${address.id}`">
                  <i class="iconfont edit-icon">&#xe657;</i><span class="desc-edit">编辑</span>
                </router-link>
                <div class="delete" @click="del(address.id)">
                  <i class="iconfont del-icon">&#xe61e;</i><span class="desc-delete">删除</span>
                </div>
              </div>
            </div>
          </li>
        </transition-group>
      </scroll>
      <router-link tag="div" to="/address/add" class="add-address">
        <div class="desc">
          <i class="iconfont icon-jia">&#xe601;</i>
          <span class="text">新增地址</span>
        </div>
      </router-link>
    </div>
    <router-view></router-view>
    <confim text="确认要删除该地址吗？" ref="confim" @confirm="confirm"></confim>
    <loading v-show="!addresses.length && !showNull"></loading>
    <load v-show="showLoading" desc="设置中"></load>
    <div class="no-result-wrapper" v-show="showNull">
      <no-result title="暂无地址，快去添加吧 ~"></no-result>
    </div>
  </div>
</template>

<script>
import Back from 'base/back/back'
import Confim from 'base/confim/confim'
import Scroll from 'base/scroll/scroll'
import Load from 'base/loading/loadingmore'
import loading from 'base/loading/loading'
import NoResult from 'base/no-result/no-result'
import { getAddress, defaultAddress, delAddress } from 'api/address'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'addresses',
  data () {
    return {
      addresses: [],
      showLoading: false,
      address_id: '',
      showNull: false,
      show: this.$route.meta.showChoose
    }
  },
  created () {
    this._getAddress()
  },
  methods: {
    _getAddress () {
      getAddress().then((res) => {
        this.addresses = res.data
        if (!res.data.length) {
          this.showNull = true
        }
        this.showLoading = false
      })
    },
    defaultAddress (id, def) {
      if (def) {
        return
      }
      this.showLoading = true
      defaultAddress(id).then((res) => {
        this._getAddress()
      })
    },
    back () {
      this.$router.back()
    },
    del (id) {
      this.address_id = id
      this.$refs.confim.show()
    },
    confirm () {
      delAddress(this.address_id).then((res) => {
        this._getAddress()
      })
    },
    chooseAddress (id) {
      this.setAddressId(id)
      this.$router.back()
    },
    ...mapMutations({
      setAddressId: 'SET_ADDRESS_ID'
    })
  },
  watch: {
    '$route' (to, from) {
      if (from.path !== '/address' && from.path !== '/choose/address') {
        this._getAddress()
      }
    }
  },
  computed: {
    ...mapGetters([
      'addressId'
    ])
  },
  components: {
    Back,
    Confim,
    Scroll,
    Load,
    loading,
    NoResult
  }
}
</script>

<style scoped lang="stylus" rel="stylesheed/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .address
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    .pat-top
      height: 44px
      background: #fff
      .sub
        width: 100%
        text-align: center
        line-height: 44px
        font-size: 18px
    .address-content
      position: fixed
      top: 44px
      bottom: 40px
      width: 100%
      .address-wrapper
        overflow: hidden
        height: 100%
        .address-item
          height: 118px
          margin-bottom: 10px
          background: $color-tab-background
          &.list-enter-active
            transition: all 1s linear
          &.list-leave-active
            transition: all .1s linear
          &.list-enter, &.list-leave-to
            height: 0px
          .address-top
            padding: 20px
            font-size: $font-size-medium
            border-1px($color-border)
            background: #fff
            &.address-chose
              padding-right: 30px
            .text
              margin-bottom: 10px
              .name, .phone
                font-weight: 700
              .phone
                margin-left: 5px
            .add
              no-wrap()
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
          .address-bottom
            display: flex
            align-items: center
            padding: 0 20px
            font-size: $font-size-large
            background: #fff
            .left
              flex: 0 0 100px
              padding: 10px 0
              &.current
                .radius
                  background: $color-highlight-background
                  border: 1px solid $color-highlight-background
                  .radius-icon
                    color: $color-font
                .desc
                  color: $color-highlight-background
              .radius
                display: inline-block
                vertical-align: top
                width: 16px
                height: 16px
                border-radius: 50%
                line-height: 16px
                border: 1px solid $color-tab-text
                text-align: center
                .radius-icon
                  line-height: 20px
                  font-weight: 600
              .desc
                font-size: $font-size-medium
                color: $color-tab-text
            .right
              flex: 1
              text-align: right
              .edit, .delete
                display: inline-block
                vertical-align: top
                line-height: 40px
                .edit-icon, .del-icon
                  display: inline-block
                  vertical-align: top
                  font-size: $font-size-center
                  color: $color-highlight-background
                .desc-edit, .desc-delete
                  font-size: $font-size-medium
                  color: $color-highlight-background
                .desc-edit
                  margin-left: 2px
              .delete
                margin-left: 10px
                .del-icon
                  color: $color-icon
                .desc-delete
                  color: $color-icon
      .add-address
        position: fixed
        bottom: 0
        right: 0
        left: 0
        height: 40px
        background: $color-tab-background
        .desc
          text-align: center
          line-height: 40px
          .icon-jia, .text
            color: $color-highlight-background
            font-size: $font-size-medium-x
          .text
            margin-left: 5px
            font-weight: 700
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 30%
      transform: translateY(-50%)
</style>
