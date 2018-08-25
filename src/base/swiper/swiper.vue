<template>
  <div class="swiper">
    <swiper :options="swiperOption" ref="mySwiper" v-if="bannerList.length">
      <swiper-slide v-for="(item, index) of bannerList" :key="index">
        <img class="swiper-img" :src="item.imgUrl" />
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

export default {
  props: {
    bannerList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        loop: true,
        autoplay: 3000,
        autoplayDisableOnInteraction: false,
        speed: 300
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .swiper >>> .swiper-pagination-bullet
    border-radius: 50%
    background: #ccc
    opacity: 1
  .swiper >>> .swiper-pagination-bullet-active
    width: 20px
    border-radius: 5px
    background: rgba(255,255,255,0.8)
  .swiper
    .swiper-img
      width: 100%
</style>
