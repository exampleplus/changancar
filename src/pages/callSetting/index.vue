<template>
  <article class="setting-container">
    <section class="on-wrapper">
      <div class="wrapper">
        <p>是否开启</p>
        <switch :checked="isCall" @change="switch1Change" />
      </div>
    </section>
    <p class="tips">您当前已开启扫码呼叫，其他人可以通过扫码找到您</p>
  </article>
</template>

<script>
  import * as urls from '@/common/urls'
  import {toast} from '@/common/msgAlert'
  export default {
    data() {
      return {
        isCall: ''
      }
    },
    mounted() {
      this._getUser()
    },
    methods: {
      async switch1Change(e) {
        console.log(e.mp.detail.value)
        let { data } = await urls.isCall({isCall: Number(e.mp.detail.value)})
        if (data.code === 0) {
          if (!e.mp.detail.value) {
            toast('提示', '已关闭扫码呼叫')
          } else {
            toast('提示', '已开启扫码呼叫')
          }
        } else {
          toast('提示', data.msg)
        }
      },
      async _getUser() {
        let { data } = await urls.getUserInfo()
        console.log(data)
        if (data.code === 0) {
          this.isCall = data.data.user.isCall
        }
      }
    },
    components: {}
  }

</script>

<style lang='less' scoped>
  @import '../../common/styles/elements.less';
  .setting-container {
    padding-top: 20rpx;
    .on-wrapper {
      padding-left: 30rpx;
      background: white;
      .wrapper {
        .list(row, space-between, center);
        padding-right: 30rpx;
        height: 88rpx;
        border-bottom: 2rpx solid #D9D9D9;
        p {
          font-size: 30rpx;
          font-family: PingFangSC-Regular;
          color: rgba(0, 0, 0, 1);
        }
      }
    }
    .tips {
      margin-top: 17rpx;
      padding-left: 30rpx;
      font-size: 26rpx;
      font-family: PingFangSC-Regular;
      color: rgba(155, 155, 155, 1);
    }
  }

</style>
