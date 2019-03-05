<template>
  <article class="carPai-container">
    <ul class="carPai-wrapper">
      <li class="carPai" v-for="item in brandList" :key="item" @click="saveCarPaiInfo(item)">
        <img :src="item.logo" alt="">
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
        brandList: []
      }
    },
    mounted() {
      this._getCarBrandList()
    },
    methods: {
      saveCarPaiInfo(item) {
        // let data = JSON.stringify(item)
        wx.setStorageSync('carPai', item.name)
        // wx.redirectTo({
        //   url: `/pages/personInfo/main?carPai=${item.name}`
        // })
        wx.navigateBack()
      },
      async _getCarBrandList() {
        let { data } = await api.getCarBrandList()
        console.log(data)
        if (!data.code) {
          this.brandList = data.data.brandList
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
    .list(row);
    .carPai {
      flex: 1;
      margin-bottom: 30rpx;
      .list(column, center, center);
      img {
        margin-bottom: 4rpx;
        width: 200rpx;
        height: 200rpx;
        border-radius: 12rpx;
      }
      p {
        .font(30rpx, #333333);
      }
    }
  }
}
</style>
