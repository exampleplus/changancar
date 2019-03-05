<template>
  <article class="center-container" :animation="animationData">
    <div class="center-wrapper">
      <section class="bg-wrapper" @click="back">
        <img src="/static/images/center1.png" v-if="current === 0" class="bg">
        <img src="/static/images/center2.png" v-if="current === 1" class="bg">
        <img src="/static/images/center3.png" v-if="current === 2" class="bg">
        <img src="/static/images/center4.png" v-if="current === 3" class="bg">
      </section>
      <section class="userinfo-wrapper">
        <div class="header">
          <img :src="user.headimgurl" class="avatar">
          <div class="right">
            <p v-if="user.nickname">{{user.nickname}}</p>
            <p v-else>此用户很神秘</p>
            <p>{{user.virtualPhone}}</p>
          </div>
        </div>
        <ul class="menu-wrapper">
          <li class="item" @click="personInfo(0)">
            <img src="/static/images/mine1.png" alt="">
            <p>个人信息</p>
          </li>
          <li class="item" @click="personInfo(1)">
            <img src="/static/images/mine2.png" alt="">
            <p>修改联系人</p>
          </li>
          <li class="item" @click="callSetting()">
            <img src="/static/images/mine3.png" alt="">
            <p>呼叫设置</p>
          </li>
          <li class="item" @click="manual">
            <img src="/static/images/mine4.png" alt="">
            <p>使用帮助</p>
          </li>
        </ul>
      </section>
    </div>
  </article>
</template>

<script>
  import * as urls from '@/common/urls'

  export default {
    data() {
      return {
        animationData: {},
        animation: null,
        current: 0,
        user: {}
      }
    },
    onShow() {
      if (this.$root.$mp.query.current) {
        this.current = Number(this.$root.$mp.query.current)
      }
      var animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'linear'
      })
      // this.animation = animation
      // animation.translate(360).step()
      // this.animationData = animation.export()
      setTimeout(function () {
        animation.opacity(1).translate(0).step()
        this.animationData = animation.export()
      }.bind(this), 1000)
      this._getUserInfo()
    },
    methods: {
      back() {
        wx.navigateBack()
      },
      personInfo(type) {
        if (!type) {
          wx.navigateTo({
            url: `/pages/personInfo/main?type=${type}`
          })
        } else {
          wx.navigateTo({
            url: `/pages/contacterEdit/main?type=${type}`
          })
        }
      },
      callSetting() {
        wx.navigateTo({
          url: '/pages/callSetting/main'
        })
      },
      manual() {
        wx.navigateTo({
          url: '/pages/useHelp/main'
        })
      },
      rotateAndScale: function () {
        // 旋转同时放大
        this.animation.rotate(90).scale(2, 2).step()
        this.animationData = this.animation.export()
      },
      rotateThenScale: function () {
        // 先旋转后放大
        this.animation.rotate(90).step()
        this.animation.scale(2, 2).step()
        this.animationData = this.animation.export()
      },
      rotateAndScaleThenTranslate: function () {
        // 先旋转同时放大，然后平移
        this.animation.rotate(90).scale(2, 2).step()
        this.animation.translate(100, 100).step({
          duration: 1000
        })
        this.animationData = this.animation.export()
      },
      async _getUserInfo() {
        let data = await urls.getUserInfo()
        this.user = data.data.data.user
        console.log(this.user, 'data')
      }
    },
    components: {}
  }

</script>

<style lang='less' scoped>
  @import '../../common/styles/elements.less';

  .center-container {
    height: 100%;
    .center-wrapper {
      font-size: 0;
      height: 100%;
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
            border-radius: 50%;
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
