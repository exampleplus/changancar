<template>
  <article class="banners-container">
    <div style="height:100%">
      <swiper :indicator-dots="true" class="swiper-wrapper" @change="currIndexs" :current="currIndex">
        <swiper-item class="item-wrapper">
          <div class="header">
            <p class="text">查故障灯</p>
            <p class="desc">故障查询 轻松读懂您的爱车</p>
          </div>
          <img src="/static/images/back1.png" />
          <a class="search" @click="search">立即查询</a>
        </swiper-item>
        <swiper-item class="item-wrapper">
          <div class="header2">
            <p class="text">预约保养</p>
            <p class="desc">线上预约 保养无需排队等待</p>
          </div>
          <img src="/static/images/back2.png" :class="{img2: time}" />
          <p class="last" v-if="time">上次保养：{{time}}</p>
          <!-- <a class="search2" v-if="currIdx === '0' || currIdx === '2' || currIdx === '3'">立即预约</a> -->
          <!-- 正式 -->
          <!-- <navigator class="search2" target="miniProgram" open-type="navigate" app-id="wx72bd5bfcae964b0c" :path="'pages/carList/index?shopId=' + departmentId + '&source=3'" :extra-data="source" version="release">
            立即预约
          </navigator> -->
          <!-- 测试 -->
          <navigator class="search2" target="miniProgram" open-type="navigate" app-id="wx8c682cfc86229fd6" :path="'pages/carList/index?shopId=' + departmentId + '&source=3'" :extra-data="source" version="release">
            立即预约
          </navigator>
        </swiper-item>
        <swiper-item class="item-wrapper">
          <div class="header3">
            <p class="text">一键救援</p>
            <p class="desc">24H服务 专业团队护您安行天下</p>
          </div>
          <img src="/static/images/back3.png" />
          <a class="search3" @click="beSave">立即呼救</a>
        </swiper-item>
        <swiper-item class="item-wrapper">
          <div class="header4">
            <p class="text">违章速查</p>
            <p class="desc">莫名被扣分 5分钟速查</p>
          </div>
          <img src="/static/images/back4.png" />
          <a class="search4">敬请期待</a>
        </swiper-item>
      </swiper>
      <div class="circle" @click="center">
        <img src="/static/images/8.png" class="left-bot">
      </div>
    </div>
    <!-- <div v-else class="center-wrapper">
      <section class="bg-wrapper">
        <img src="/static/images/center1.png" class="bg">
      </section>
      <section class="userinfo-wrapper">
        <div class="header">
          <img src="/static/images/nuoche4.png" class="avatar">
          <div class="right">
            <p>夜莺居士</p>
            <p>13928673289</p>
          </div>
        </div>
        <ul class="menu-wrapper">
          <li class="item">
            <img src="/static/images/mine1.png" alt="">
            <p>个人信息</p>
          </li>
          <li class="item">
            <img src="/static/images/mine2.png" alt="">
            <p>修改联系人</p>
          </li>
          <li class="item">
            <img src="/static/images/mine3.png" alt="">
            <p>呼叫设置</p>
          </li>
          <li class="item">
            <img src="/static/images/mine4.png" alt="">
            <p>使用帮助</p>
          </li>
        </ul>
      </section>
    </div> -->
  </article>
</template>

<script>
  import * as urls from '@/common/urls'
  // import { toast } from '@/common/msgAlert'
  import {transform13Time} from '@/utils/index'
  export default {
    data() {
      return {
        current: 0,
        time: null,
        currIndex: 0, // 正面扫码进来的id并且和banner绑定，切换banner动态改变
        currIdx: null, // 是否能预约的id
        departmentId: ''
      }
    },
    mounted() {
      console.log(typeof this.$root.$mp.query.currIndex)
      if (this.$root.$mp.query.currIndex) {
        this.currIndex = this.$root.$mp.query.currIndex
        this.currIdx = this.$root.$mp.query.currIndex
      }
      this._lastMaint()
      this._getBingInfo() // 获取绑定信息
    },
    methods: {
      currIndexs(e) {
        console.log(e.mp.detail.current)
        this.currIndex = e.mp.detail.current
      },
      center() {
        let currIdx = this.$root.$mp.query.currIndex
        console.log(currIdx)
        if (currIdx === '0' || currIdx === '2' || currIdx === '3') {
          return
        }
        wx.navigateTo({
          url: `/pages/center/main?current=${this.currIndex}`
        })
      },
      search() {
        let currIdx = this.$root.$mp.query.currIndex
        if (currIdx === '0' || currIdx === '2' || currIdx === '3') {
          wx.navigateTo({
            url: `/pages/faultLight/main?currIndex=0`
          })
        } else {
          wx.navigateTo({
            url: `/pages/faultLight/main`
          })
        }
      },
      async beSave() {
        let { data } = await urls.getRescueNum()
        console.log(data)
        if (!data.code) {
          wx.makePhoneCall({
            phoneNumber: data.data.string, // 仅为示例，并非真实的电话号码
            success: function(res) {
              urls.rescue()
            }
          })
        } else {
          wx.makePhoneCall({
            phoneNumber: '4008096818', // 仅为示例，并非真实的电话号码
            success: function(res) {
              urls.rescue()
            }
          })
        }
      },
      async _lastMaint() {
        try {
          let { data } = await urls.lastMaint()
          console.log(data)
          if (!data.code) {
            if (data.data.date) this.time = transform13Time(data.data.date)
          }
        } catch (e) {
          console.log(e)
        }
      },
      async _getBingInfo() {
        // console.log('aa')
        // let scene = wx.getStorageSync('scene')
        urls.getBingInfo2().then(res => {
          console.log(res, 'RESRES')
          if (!res.data.code) {
            if (!res.data.data.user.departmentId) this.departmentId = ''
            else this.departmentId = res.data.data.user.departmentId
          }
        })
      }
    },
    components: {}
  }

</script>

<style lang='less' scoped>
  @import '../../common/styles/elements.less';

  .banners-container {
    height: 100%;
    background: white;
    .swiper-wrapper {
      width: 100%;
      height: 100%;
      .item-wrapper {
        text-align: center;
        .header,
        .header2,
        .header3,
        .header4 {
          margin-bottom: 71rpx;
          padding-top: 24rpx;
          text-align: center;
          .text {
            font-size: 72rpx;
            font-family: PingFang-SC-Heavy;
            color: #0F8DE9;
          }
          .desc {
            font-size: 36rpx;
            font-family: PingFang-SC-Medium;
            color: rgba(15, 141, 233, 1);
          }
        }
        .header2 {
          color: #08D3BD;
          .text {
            font-size: 72rpx;
            font-family: PingFang-SC-Heavy;
            color: #08D3BD;
          }
          .desc {
            font-size: 36rpx;
            font-family: PingFang-SC-Medium;
            color: #08D3BD;
          }
        }
        .header3 {
          color: #F5A623;
          .text {
            font-size: 72rpx;
            font-family: PingFang-SC-Heavy;
            color: #F5A623;
          }
          .desc {
            font-size: 36rpx;
            font-family: PingFang-SC-Medium;
            color: #F5A623;
          }
        }
        .header4 {
          color: #FC3768;
          .text {
            font-size: 72rpx;
            font-family: PingFang-SC-Heavy;
            color: #FC3768;
          }
          .desc {
            font-size: 36rpx;
            font-family: PingFang-SC-Medium;
            color: #FC3768;
          }
        }
        img,
        .img2 {
          margin-bottom: 168rpx;
          width: 546rpx;
          height: 546rpx;
        }
        .img2 {
          margin-bottom: 109rpx;
        }
        .last {
          margin-bottom: 20rpx;
          line-height: 42rpx;
          font-size: 31rpx;
          font-family: PingFang-SC-Medium;
          color: rgba(155, 155, 155, 1);
        }
        .search,
        .search2,
        .search3,
        .search4 {
          display: inline-block;
          width: 453rpx;
          height: 91rpx;
          line-height: 91rpx;
          background: rgba(15, 141, 233, 1);
          box-shadow: 0rpx 0rpx 18rpx 0rpx rgba(15, 141, 233, 0.5);
          border-radius: 45rpx;
          font-size: 36rpx;
          font-family: PingFang-SC-Bold;
          color: rgba(255, 255, 255, 1);
        }
        .search2 {
          background: rgba(26, 216, 195, 1);
          box-shadow: 0rpx 0rpx 18rpx 0rpx rgba(26, 216, 195, 0.5);
        }
        .search3 {
          background: rgba(255, 189, 0, 1);
          box-shadow: 0rpx 0rpx 18rpx 0rpx rgba(255, 189, 0, 0.5);
        }
        .search4 {
          background: rgba(252, 55, 104, 0.3);
          box-shadow: 0rpx 0rpx 18rpx 0rpx rgba(252, 55, 104, 0.5);
        }
      }
    }
    .circle {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 140rpx;
      height: 137rpx; // border-radius:0 100% 0 0;
      // background: #FFBD00;
      // box-shadow:0rpx 0rpx 18rpx 0rpx rgba(245,166,35,0.38);
      .left-bot {
        width: 140rpx;
        height: 137rpx;
      }
    }
    .center-wrapper {
      font-size: 0;
      .bg-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        .bg {
          width: 100%;
          height: 100%;
        }
      }
      .userinfo-wrapper {
        position: absolute;
        top: 112rpx;
        left: 36rpx;
        z-index: 2;
        .header {
          padding-bottom: 32rpx;
          border-bottom: 2rpx solid rgba(255, 255, 255, 0.5);
          box-sizing: border-box;
          font-size: 0;
          .list(row, flex-start);
          .avatar {
            margin-right: 20rpx;
            .imgs(108rpx, 108rpx);
          }
          .right {
            padding-top: 12rpx;
            height: 108rpx;
            font-size: 30rpx;
            font-family: PingFang-SC-Bold;
            color: rgba(255, 255, 255, 1);
          }
        }
        .menu-wrapper {
          margin-top: 93rpx;
          margin-left: 30rpx;
          .item {
            .list(row, flex-start, center);
            margin-bottom: 40rpx;
            height: 80rpx;
            img {
              margin-right: 42rpx;
              .imgs(42rpx, 42rpx);
            }
            img:first-of-type {
              .imgs(42rpx, 39rpx);
            }
            img:nth-of-type(2) {
              .imgs(46rpx, 39rpx);
            }
            img:last-of-type {
              .imgs(42rpx, 42rpx);
            }
            p {
              font-size: 30rpx;
              font-family: PingFang-SC-Bold;
              color: rgba(255, 255, 255, 1);
            }
          }
        }
      }
    }
  }

</style>
