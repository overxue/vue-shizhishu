<template>
  <div class="order">
    <div class="order-tab border-bottom-1px">
      <back @back="back"></back>
      <h1 class="sub">全部订单</h1>
    </div>
    <div class="order-content">
      <scroll class="order-wrapper" ref="orderWrapper">
        <ul>
          <li class="order-item">
            <div class="title">
              <img src="../login/login.png" width="20" height="20" class="img">
              <p class="shop-name">食之蔬</p>
              <i class="iconfont del">&#xe61e;</i>
            </div>
            <div class="content">
              <div class="content-item">
                <div class="image">
                  <img src="https://img10.360buyimg.com/mobilecms/s187x187_jfs/t21334/315/2090378892/32202/665b0c25/5b46ed66n30b1dadc.jpg!q70.dpg.webp" width="75" height="75">
                </div>
                <p class="desc">虎牌（TIGER） 保温杯不锈钢商务原装进口男女水杯MJA-B048 480ML 藏黑色AN</p>
              </div>
              <div class="content-bottom border-bottom-1px">
                <span class="total">共2件商品</span>
                <span class="money">实付款：</span>
                <span class="mon">￥398.00</span>
              </div>
            </div>
            <div class="bottom">
              <div class="border">交易成功</div>
              <div class="border">交易成功</div>
            </div>
          </li>
          <li class="order-item">
            <div class="title">
              <img src="../login/login.png" width="20" height="20" class="img">
              <p class="shop-name">食之蔬</p>
              <i class="iconfont del">&#xe61e;</i>
            </div>
            <div class="content">
              <div class="content-item">
                <div class="image">
                  <img src="https://img10.360buyimg.com/mobilecms/s187x187_jfs/t21334/315/2090378892/32202/665b0c25/5b46ed66n30b1dadc.jpg!q70.dpg.webp" width="75" height="75">
                </div>
                <p class="desc">虎牌（TIGER） 保温杯不锈钢商务原装进口男女水杯MJA-B048 480ML 藏黑色AN</p>
              </div>
              <div class="content-bottom border-bottom-1px">
                <span class="total">共2件商品</span>
                <span class="money">实付款：</span>
                <span class="mon">￥398.00</span>
              </div>
            </div>
            <div class="bottom">
              <div class="border">交易成功</div>
              <div class="border">交易成功</div>
            </div>
          </li>
          <li class="order-item">
            <div class="title">
              <img src="../login/login.png" width="20" height="20" class="img">
              <p class="shop-name">食之蔬</p>
              <i class="iconfont del">&#xe61e;</i>
            </div>
            <div class="content">
              <div class="content-item">
                <div class="image">
                  <img src="https://img10.360buyimg.com/mobilecms/s187x187_jfs/t21334/315/2090378892/32202/665b0c25/5b46ed66n30b1dadc.jpg!q70.dpg.webp" width="75" height="75">
                </div>
                <p class="desc">虎牌（TIGER） 保温杯不锈钢商务原装进口男女水杯MJA-B048 480ML 藏黑色AN</p>
              </div>
              <div class="content-bottom border-bottom-1px">
                <span class="total">共2件商品</span>
                <span class="money">实付款：</span>
                <span class="mon">￥398.00</span>
              </div>
            </div>
            <div class="bottom">
              <div class="border">交易成功</div>
              <div class="border">交易成功</div>
            </div>
          </li>
          <li class="order-item">
            <div class="title">
              <img src="../login/login.png" width="20" height="20" class="img">
              <p class="shop-name">食之蔬</p>
              <i class="iconfont del">&#xe61e;</i>
            </div>
            <div class="content">
              <div class="content-item">
                <div class="image">
                  <img src="https://img10.360buyimg.com/mobilecms/s187x187_jfs/t21334/315/2090378892/32202/665b0c25/5b46ed66n30b1dadc.jpg!q70.dpg.webp" width="75" height="75">
                </div>
                <p class="desc">虎牌（TIGER） 保温杯不锈钢商务原装进口男女水杯MJA-B048 480ML 藏黑色AN</p>
              </div>
              <div class="content-bottom border-bottom-1px">
                <span class="total">共2件商品</span>
                <span class="money">实付款：</span>
                <span class="mon">￥398.00</span>
              </div>
            </div>
            <div class="bottom">
              <div class="border">交易成功</div>
              <div class="border">交易成功</div>
            </div>
          </li>
        </ul>
      </scroll>
    </div>
  </div>
</template>

<script>
import Back from 'base/back/back'
import Scroll from 'base/scroll/scroll'

export default {
  methods: {
    back () {
      this.$router.push('/my')
    }
  },
  components: {
    Back,
    Scroll
  }
}
</script>

<style scoped lang="stylus" rel="stylesheed/stylus">
  .order
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    .order-tab
      background: #fff
      .sub
        width: 100%
        text-align: center
        line-height: 44px
        font-size: 18px
    .order-content
      position: absolute
      top: 44px
      bottom: 0
      width: 100%
      .order-wrapper
        overflow: hidden
        height: 100%
        .order-item
          background: #fff
          margin-top: 15px
          &:first-child
            margin-top: 0
          .title
            display: flex
            padding: 10px
            background: #fff
            line-height: 20px
            .img
              flex: 0 0 20px
            .shop-name
              flex: 1
              line-height: 20px
              margin-left: 5px
              font-size: 16px
            .del
              padding-left: 10px
              font-size: 18px
          .content
            background: #f7f7f7
            .content-item
              display: flex
              align-items: center
              padding: 10px
              .image
                flex: 0 0 75px
              .desc
                margin-left: 10px
                font-size: 16px
                line-height: 18px
            .content-bottom
              background: #fff
              padding: 10px 0
              text-align: right
              .total, .money
                font-size: 14px
              .money
                margin-left: 5px
              .mon
                margin-right: 10px
                font-weight: 700
          .bottom
            padding: 10px
            display: flex
            justify-content: flex-end
            .border
              width: 80px
              height: 30px
              border: 1px solid red
              border-radius: 5px
              text-align: center
              line-height: 30px
              margin-left: 10px
</style>
