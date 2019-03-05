<template>
  <article class="search-fault-light-container" v-if='message'>
    <header class="header" :class="'type' + type">
      <img :src="message.detailIcon" class="logo">
      <p>{{message.name}}</p>
      <a class="btn" :class="'type' + type" @click="moreLight">更多故障灯</a>
    </header>
    <p class="tips-wrapper" :class="'type' + type">
      <i>!</i>
      你的爱车非常危险！建议立即预约保养
    </p>
    <section class="content-wrapper">
      <!-- <ul class="reason">
        <li class="title">【故障原因】 </li>
        <li class="item">1、行驶跑偏</li>
        <li class="item">1、行驶跑偏</li>
        <li class="item">1、行驶跑偏</li>
        <li class="item">1、行驶跑偏</li>
      </ul>
      <ul class="reason">
        <li class="title">【定义】</li>
        <li class="item">转向助力是协助驾驶员作汽车方向调整，为驾驶员减轻打方向盘的用力强度，当然，转向助力在汽车行驶的安全性、经济性上也一定的作用。 </li>
      </ul>
      <ul class="reason">
        <li class="title">【助力转向故障灯作用】</li>
        <li class="item">车辆行驶时转向助力系统故障灯亮起，表明转向助力系统故障，此时的转向助力可能被削弱或彻底失效，转动方向盘的阻力会比平时大好几倍，而此故障也无法自行检查或维修，所以最好的办法就是行驶到最近的维修服务站进行维修。</li>
      </ul> -->
      <wx-parse :content="message.content"></wx-parse>
    </section>
    <div class="bottom" v-if="type === '0' || type === '1'">
      <!-- <a class="baoyang" :class="'type' + type" v-if="currIndex === 0">立即预约保养</a> -->
      <!-- 正式 -->
      <!-- <navigator class="baoyang" :class="'type' + type" target="miniProgram" open-type="navigate" app-id="wx72bd5bfcae964b0c" :path="'pages/carList/index?shopId=' + departmentId + '&source=3'" :extra-data="source" version="release">
          立即预约保养
      </navigator> -->
      <!-- 测试 -->
      <navigator class="baoyang" :class="'type' + type" target="miniProgram" open-type="navigate" app-id="wx8c682cfc86229fd6" :path="'pages/carList/index?shopId=' + departmentId + '&source=3'" :extra-data="source" version="release">
          立即预约保养
      </navigator>
      <!-- <a class="baoyang" :class="'type' + type">立即预约保养</a> -->
      <img src="/static/images/save.png" v-if="type === '0'" class="save" @click="call">
      <img src="/static/images/save2.png" v-if="type === '1'" class="save" @click="call">
    </div>
    <div class="bottom" v-else>
      <a class="back" @click="back()">返回首页</a>
    </div>
  </article>
</template>

<script>
  import * as urls from '@/common/urls'
  import wxParse from 'mpvue-wxparse'
  // import { toast } from '@/common/msgAlert'
  export default {
    data() {
      return {
        type: 1, // 0 red 1 yello 2 green 3 blue,
        message: null,
        currIndex: null,
        departmentId: ''
      }
    },
    mounted() {
      this.type = this.$root.$mp.query.index
      if (Number(this.$root.$mp.query.currIndex) === 0) {
        this.currIndex = 0
      } else {
        this.currIndex = 1
      }
      console.log(this.currIndex, 'this.type')
      this._setNavBg(this.$root.$mp.query.index)
      this.info()
      this._getBingInfo() // 获取绑定信息
    },
    methods: {
      back() {
        if (!this.currIndex) {
          wx.navigateBack({
            delta: 3
          })
        } else {
          wx.navigateBack({
            delta: 2
          })
        }
      },
      moreLight() {
        wx.navigateBack()
      },
      async call() {
        let { data } = await urls.getRescueNum()
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
      async info () {
        var that = this
        await urls.getFaultDetailById({id: this.$root.$mp.query.id}).then(function (res) {
          that.message = res.data.data.fault
          console.log(that.message)
        })
      },
      _setNavBg(type) {
        if (type === '0') {
          wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#FC3768'
          })
        } else if (type === '1') {
          wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#FEB143'
          })
        } else if (type === '2') {
          wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#15D1D4'
          })
        } else if (type === '3') {
          wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#09A4F0'
          })
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
    components: {wxParse}
  }

</script>

<style lang='less' scoped>
  @import '../../common/styles/elements.less';
  @import url("~mpvue-wxparse/src/wxParse.css");

  .search-fault-light-container {
    padding-bottom: 134rpx;
    .header {
      .list(column, flex-start, center);
      height: 372rpx;
      background: #FC3768;
      &.type0 {
        background: #FC3768;
      }
      &.type1 {
        background: #FEB143;
      }
      &.type2 {
        background: #15D1D4;
      }
      &.type3 {
        background: #09A4F0;
      }
      .logo {
        margin-top: 40rpx;
        margin-bottom: 41rpx;
        .imgs(120rpx, 120rpx);
      }
      p {
        margin-bottom: 30rpx;
        font-size: 42rpx;
        font-family: PingFang-SC-Bold;
        color: rgba(255, 255, 255, 1);
      }
      .btn {
        .btn(block, 52rpx, #FC3768, 35rpx, @white, 26rpx);
        width: 220rpx;
        text-align: center;
        border: 2rpx solid rgba(255, 255, 255, 1);
        box-sizing: border-box;
        &.type0 {
          background: #FC3768;
        }
        &.type1 {
          background: #FEB143;
        }
        &.type2 {
          background: #15D1D4;
        }
        &.type3 {
          background: #09A4F0;
        }
      }
    }
    .tips-wrapper {
      .list(row, flex-start, center);
      padding-left: 30rpx;
      height: 76rpx;
      background: rgba(255, 246, 246, 1);
      box-shadow: 0rpx -1rpx 0rpx 0rpx rgba(217, 217, 217, 1), 0rpx -1rpx 0rpx 0rpx rgba(217, 217, 217, 1);
      font-size: 26rpx;
      font-family: PingFangSC-Regular;
      color: rgba(244, 53, 48, 1);
      &.type0 {
        color: rgba(244, 53, 48, 1);
        i {
          background: rgba(244, 53, 48, 1);
        }
      }
      &.type1 {
        color: #FEB143;
        i {
          background: #FEB143;
        }
      }
      &.type2 {
        color: #15D1D4;
        i {
          background: #15D1D4;
        }
      }
      &.type3 {
        color: #09A4F0;
        i {
          background: #09A4F0;
        }
      }
      i {
        margin-right: 10rpx;
        .imgs(28rpx, 28rpx);
        line-height: 28rpx;
        border-radius: 50%;
        background: #FC3768;
        color: white;
        text-align: center;
      }
    }
    .content-wrapper {
      padding: 40rpx 80rpx 55rpx;
      min-height: 624rpx;
      background: white;
      box-sizing: border-box;
      .reason {
        margin-bottom: 30rpx;
        .title {
          .font(30rpx, #4A4A4A);
          line-height: 1.5;
        }
        .item {
          .font(26rpx, #4A4A4A);
          line-height: 1.5;
        }
      }
    }
    .bottom {
      position: fixed;
      bottom: 40rpx;
      left: 0;
      width: 100%;
      .list(row, flex-start, center);
      padding: 0 30rpx;
      background: white;
      .baoyang {
        margin-right: 10rpx;
        width: 550rpx;
        height: 94rpx;
        line-height: 94rpx;
        background: linear-gradient(-131.3deg, rgba(255, 54, 146, 1), rgba(244, 53, 48, 1));
        border-radius: 9rpx;
        font-size: 34rpx;
        font-family: PingFang-SC-Medium;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        box-sizing: border-box;
        &.type0 {
          background: linear-gradient(-131.3deg, rgba(255, 54, 146, 1), rgba(244, 53, 48, 1));
        }
        &.type1 {
          background: linear-gradient(-133.9deg, rgba(255, 205, 82, 1), rgba(254, 155, 55, 1));
        }
      }
      img {
        .imgs(130rpx, 94rpx);
      }
      .back {
        .btn(block, 94rpx, #FFFFFF, 10rpx, #2F7DCD, 34rpx);
        line-height: 94rpx;
        width: 690rpx;
        text-align: center;
        border: 2rpx solid rgba(47, 125, 205, 1);
        box-sizing: border-box;
      }
    }
  }

</style>
