<template>
  <article class="faultLight-container">
    <section class="first-wrapper" v-for='(item, index) in list' :key='index'>
      <p class="title">{{item.index}}级警示灯</p>
      <ul class="item-wrapper">
        <li class="item" v-for='(itemA, indexA) in item.faultList' :key='indexA' @click='navTo(index, itemA.id)'>
          <img mode="widthFix" :src="itemA.icon" class="icon">
        </li>
      </ul>
    </section>
  </article>
</template>

<script>
  import * as urls from '@/common/urls'
  export default {
    data() {
      return {
        list: null
      }
    },
    methods: {
      SectionToChinese (num) {
        if (num === 1) return '一'
        if (num === 2) return '二'
        if (num === 3) return '三'
        if (num === 4) return '四'
      },
      navTo (index, id) {
        if (Number(this.$root.$mp.query.currIndex) === 0) {
          wx.navigateTo({
            url: `/pages/search-fault-light/main?index=${index}&id=${id}&currIndex=${this.$root.$mp.query.currIndex}`
          })
        } else {
          wx.navigateTo({
            url: `/pages/search-fault-light/main?index=${index}&id=${id}`
          })
        }
      }
    },
    mounted() {
      var that = this
      urls.getFaultComplete().then(function (res) {
        console.log(res.data.data)
        for (var i = 0; i < res.data.data.faults.length; i++) {
          console.log(res.data.data.faults)
          res.data.data.faults[i]['index'] = that.SectionToChinese(i + 1)
        }
        console.log(res.data.data.faults)
        that.list = res.data.data.faults
      })
    },
    components: {}
  }

</script>

<style lang='less' scoped>
  @import '../../common/styles/elements.less';

  .faultLight-container {
    padding: 0 29rpx;
    .first-wrapper {
      .title {
        height: 60rpx;
        line-height: 60rpx;
        font-size: 26rpx;
        font-family: PingFangSC-Regular;
        color: rgba(155, 155, 155, 1);
      }
      .item-wrapper {
        .list(row, flex-start, center);
        .item {
          .list(row, center, center);
          margin-right: 18rpx;
          margin-bottom: 18rpx;
          .imgs(124rpx, 124rpx);
          background: rgba(255, 255, 255, 1);
          border-radius: 18rpx;
          border: 1px solid rgba(151, 151, 151, 1);
          box-sizing: border-box;
          .icon {
            width: 100%;
            // height: 62rpx;
          }
        }
        .item:nth-child(5n) {
          margin-right: 0;
        }
      }
    }
  }

</style>
