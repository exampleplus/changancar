<template>
  <article class="status-container">
    <div class="header-wrapper">
      <img :src="logoSrc" class="logo">
      <p>{{title}}</p>
    </div>
    <slot>
    </slot>
    <button class="recall" v-if="recall === '1'">重新拨打</button>
    <button class="close" @click="close">关闭</button>
  </article>
</template>

<script>
  export default {
    data() {
      return {
        logoSrc: '/static/images/success.png',
        title: '成功绑定',
        recall: null
      }
    },
    // props: {
    //   logoSrc: {
    //     type: String,
    //     default: '/static/images/success.png'
    //   },
    //   title: {
    //     type: String,
    //     default: '成功绑定'
    //   }
    // },
    mounted() {
      if (this.$root.$mp.query.type) {
        this.recall = this.$root.$mp.query.type
        if (Number(this.recall) === 1) {
          this.logoSrc = '/static/images/fail.png'
        }
      }
      if (this.$root.$mp.query.text) {
        this.title = JSON.parse(this.$root.$mp.query.text)
      }
    },
    methods: {
      close() {
        if (Number(this.recall) === 2) {
          wx.redirectTo({
            url: '/pages/banners/main'
          })
        } else if (Number(this.recall) === 1) {
          wx.navigateBack()
        }
      }
    },
    components: {}
  }

</script>

<style lang='less' scoped>
  @import '../../common/styles/elements.less';

  .status-container {
    padding-top: 100rpx;
    text-align: center;
    .header-wrapper {
      margin-bottom: 106rpx;
      .logo {
        margin-bottom: 50rpx;
        .imgs(168rpx, 168rpx);
      }
      p {
        .font(38rpx, #2D3034);
      }
    }
    .recall {
      margin-bottom: 20rpx;
      width: 690rpx;
      height: 88rpx;
      background: linear-gradient(-167.1deg, rgba(0, 210, 255, 1), rgba(58, 123, 213, 1));
      border-radius: 10rpx;
      border: 2rpx solid rgba(212, 212, 212, 1);
      font-size: 34rpx;
      font-family: PingFang-SC-Medium;
      color: rgba(51, 51, 51, 1);
      font-size: 34rpx;
      font-family: PingFang-SC-Medium;
      color: rgba(255, 255, 255, 1);
    }
    .close {
      width: 690rpx;
      height: 88rpx;
      background: rgba(255, 255, 255, 1);
      border-radius: 10rpx;
      border: 2rpx solid rgba(212, 212, 212, 1);
      font-size: 34rpx;
      font-family: PingFang-SC-Medium;
      color: rgba(51, 51, 51, 1);
      &:after {
        border: 0 none;
      }
    }
  }

</style>
