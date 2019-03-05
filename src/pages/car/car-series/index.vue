<template>
  <article class="carPai-container">
    <ul class="carPai-wrapper">
      <li class="carPai" v-for="item in brandList" :key="item" @click="saveCarPaiInfo(item)">
        <p>{{item.name}}</p>
      </li>
    </ul>
  </article>
</template>

<script>
  import * as api from '@/common/urls'
  export default {
    data() {
      return {
        brandList: [],
        carPai: {}
      }
    },
    mounted() {
      if (this.$root.$mp.query.carSeries) {
        this.carPai = this.$root.$mp.query.carSeries
      } else {
        this.carPai = ''
      }
      this._getShopCarseries()
    },
    methods: {
      saveCarPaiInfo(item) {
        // let data = JSON.stringify(item)
        // wx.redirectTo({
        //   url: `/pages/personInfo/main?carPai=${this.carPai}&carSeries=${item.name}`
        // })
        wx.setStorageSync('carSeries', item.name)
        wx.navigateBack()
      },
      async _getShopCarseries() {
        let { data } = await api.getShopCarseries({brand: this.carPai})
        console.log(data)
        if (!data.code) {
          this.brandList = data.data.arrayList
        }
      }
    },
    components: {
    }
  }
</script>

<style lang='less' scoped>
@import '../../../common/styles/elements.less';
.carPai-container {
  // min-height: 100%;
  padding-top: 40rpx;
  .carPai-wrapper {
    .carPai {
      padding-left: 30rpx;
      height: 88rpx;
      line-height: 88rpx;
      background: @white;
      box-shadow:0rpx -1rpx 0rpx 0rpx rgba(217,217,217,1);
      p {
        .font(30rpx, #333333);
      }
    }
  }
}
</style>
