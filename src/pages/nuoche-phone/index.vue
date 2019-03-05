<template>
  <article class="phone-container">
    <blue :img="img" imgheight="332rpx"></blue>
    <section class="userinfo-wrapper">
      <p class="title">
        <i class="icon">i</i>
        <span>不输入手机号，对方会看到您的真实电话哦！</span>
      </p>
      <div class="mobile-wrapper">
        <p>您的电话</p>
        <input type="number" maxlength="11" v-model="mobile" placeholder="请填写您的手机号（非必填）" placeholder-class="placeholder">
      </div>
      <!-- 1. 有手机号时，ios会直接拨打电话，安卓先弹框 -->
      <button class="btn" v-if="mobile!==''" @click="call">呼叫车主</button>
      <!-- 2. 无手机号时 -> 直接提示请输入手机号 -->
      <button class="btn" v-else @click="callUser">呼叫车主</button>
      <!-- <button class="btn" v-else open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">呼叫车主</button> -->
      <ul class="rule-wrapper">
        <li class="rule">
          <span class="icon"> • </span>
          <p class="text">为保护您和车主的信息，本次通话将使用匿名电话您拨打的电话并非车主的真实电话</p>
        </li>
        <li class="rule">
          <span class="icon"> • </span>
          <p class="text">匿名电话显示为：17X XXXX XXXX</p>
        </li>
      </ul>
    </section>
    <section class="more-service">
      <p class="title">—— 更多车主服务 ——</p>
      <ul class="service-lists">
        <li class="service" @click="faultLight(0)">
          <img src="/static/images/nuoche1.png" alt="">
          <p>查故障灯</p>
        </li>
        <li class="service">
          <!-- 正式 -->
          <!-- <navigator class="search2" target="miniProgram" open-type="navigate" app-id="wx72bd5bfcae964b0c" :path="'pages/carList/index?shopId=' + departmentId + '&source=3'" :extra-data="source" version="release">
             <img src="/static/images/nuoche2.png" alt="">
            <p>预约保养</p>
          </navigator> -->
          <!-- 测试 -->
          <navigator class="search2" target="miniProgram" open-type="navigate" app-id="wx8c682cfc86229fd6" :path="'pages/carList/index?shopId=' + departmentId + '&source=3'" :extra-data="source" version="release">
             <img src="/static/images/nuoche2.png" alt="">
            <p>预约保养</p>
          </navigator>
        </li>
        <li class="service" @click="faultLight(2)">
          <img src="/static/images/nuoche3.png" alt="">
          <p>一键救援</p>
        </li>
        <li class="service" @click="faultLight(3)">
          <img src="/static/images/nuoche4.png" alt="">
          <p>违章速查</p>
        </li>
      </ul>
    </section>
    <section class="mask" v-if="isCall"></section>
    <!-- 1. -> 输入了手机号后 只有安卓机型 才会到这个modal弹框 -->
    <section class="modal" v-if="isCall" :class="virtualNum? '' : 'noVirtualNum'">
      <div>
        <p class="title">立即拨打？</p>
        <p class="text" v-if="virtualNum">{{virtualNum}}</p>
        <!-- <p class="text" v-else>40080 96818</p> -->
      </div>
      <div class="bottom">
        <a class="a" @click="cancelCall">取消</a>
        <!-- 无手机号并且没有缓冲敏感信息不显示 -->
        <!-- <button class="btn" v-if="!mobile && isActice" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">确定</button> -->
        <!-- 缓冲了敏感信息 (当前版本不显示) -->
        <button class="btn" v-if="!isActice" @click="phoneCall2">确定</button>
        <!-- 1. -> 输入手机号后 -> 安卓机型终于可以打电话了 -->
        <button class="btn" v-else-if="mobile" @click="phoneCall">确定</button>
      </div>
    </section>
  </article>
</template>

<script>
  import Blue from '@/components/blue'
  // import store from '../../store'
  import {
    toast
  } from '@/common/msgAlert'
  import * as urls from '@/common/urls'
  export default {
    data() {
      return {
        img: '/static/images/temp_car.png',
        mobile: '',
        isCall: false, // 输入手机号的弹框显示状态
        virtualNum: '',
        source: 3,
        phoneType: null,
        stopCall: true,
        isActice: true,
        departmentId: '' // 预约跳转的id
      }
    },
    onShow(options) {
      this._getBingInfo() // 获取绑定信息
      // if (!wx.getStorageSync('encrypted') && !wx.getStorageSync('iv')) {
      //   this.isActice = true
      // } else {
      //   this.isActice = false
      // }
      // options 中的 scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
      console.log(this.$root.$mp.query)
      if (this.$root.$mp.query.scene) {
        // store.commit('setCode', options.query.id)
        wx.removeStorageSync('scene')
        wx.setStorageSync('scene', this.$root.$mp.query.scene)
      }
      let scene = wx.getStorageSync('scene')
      urls.getBingInfo({id: scene}).then(res => {
        console.log(res, 'RESRES')
        if (res.data.code === 0) {
          if (res.data.data.isBind === 1) { // 此二维码已被绑定过
            return
          } else if (res.data.data.isBind === 2) { // 此二维码未绑定过，但扫码的用户已绑定其他二维码
            toast('提示', '您已绑定过车辆信息~', () => {
              wx.redirectTo({
                url: '/pages/banners/main'
              })
            })
          } else {
            wx.redirectTo({
              url: '/pages/bindCar/main'
            })
          }
        } else {
          toast('提示', res.data.msg)
          this.stopCall = false
        }
      })
    },
    methods: {
      faultLight(type) {
        wx.navigateTo({
          url: `/pages/banners/main?currIndex=${type}`
        })
      },
      phoneCall() { // ios拨打电话
        if (this.mobile) {
          wx.makePhoneCall({
            phoneNumber: this.virtualNum
          })
        }
      },
      phoneCall2() {
        this._continue()
      },
      call() { // 输入手机号后 先弹框 再拨打
        if (!this.mobile) {
          toast('提示', '请输入您的手机号~')
          return
        } else if (!this.stopCall) {
          toast('提示', '二维码已失效~')
          return
        }
        let that = this
        var reg = /^1[2-9][0-9]{9}$/
        if (!(reg.test(this.mobile))) {
          toast('提示', '请输入正确的手机号')
        } else {
          var formcode = {}
          formcode['id'] = wx.getStorageSync('scene')
          formcode.src = this.mobile
          urls.getCalledVirtualNum(formcode).then((res) => {
            console.log(res)
            if (!res.data.code) {
              this.virtualNum = res.data.msg
              wx.getSystemInfo({
                success: function(ret) {
                  console.log(ret)
                  that.phoneType = ret
                  if (ret.platform === 'ios') {
                    that.phoneCall() // 输入手机了 直接拨打电话
                  } else if (ret.platform === 'android') {
                    that.callUser() // 输入手机了 弹个框再拨打电话
                  }
                }
              })
            } else {
              toast('提示', res.data.msg)
            }
          })
        }
      },
      callUser() { // 拨打电话前的弹框 调用条件：1 不输入手机号时 2 输入手机后->安卓机型
        if (!this.mobile) {
          toast('提示', '请输入您的手机号~')
          return
        } else if (!this.stopCall) {
          toast('提示', '二维码已失效~')
          return
        }
        this.isCall = true
        console.log(this.virtualNum)
      },
      cancelCall() { //  取消拨打电话前的弹框
        this.isCall = false
      },
      getPhoneNumber(e) { // 不输入手机号 直接拨打
        if (!wx.getStorageSync('encrypted') && !wx.getStorageSync('iv')) {
          wx.setStorageSync('encrypted', e.mp.detail.encryptedData)
          wx.setStorageSync('iv', e.mp.detail.iv)
          this.isActice = false
        }
        this._continue()
      },
      _continue() {
        let _this = this
        if (this.mobile === '') {
          wx.login({
            success: function (res) {
              if (res.code) {
                _this.isCall = false
                // 发起网络请求
                // console.log(e)
                var item = {
                  encrypted: wx.getStorageSync('encrypted'),
                  code: res.code,
                  iv: wx.getStorageSync('iv')
                }
                urls.decodeUserInfo(item).then(function (re) {
                  var formcode = {}
                  formcode['id'] = wx.getStorageSync('scene')
                  formcode.src = re.data.phoneNumber
                  urls.getCalledVirtualNum(formcode).then(function (ret) {
                    console.log(ret, 'resres')
                    if (!ret.data.code) {
                      wx.makePhoneCall({
                        phoneNumber: ret.data.msg
                      })
                    } else {
                      toast('提示', ret.data.msg)
                    }
                  })
                })
              } else {
                console.log('获取用户登录态失败！' + res.errMsg)
              }
            }
          })
          // console.log(e.mp.detail.errMsg)
          // console.log(e.mp.detail.iv)
          // console.log(e.mp.detail.encryptedData)
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
    components: {
      Blue
    }
  }

</script>

<style lang='less' scoped>
  @import '../../common/styles/elements.less';

  .phone-container {
    .userinfo-wrapper {
      position: absolute;
      top: 332rpx;
      left: 30rpx;
      right: 30rpx;
      padding: 50rpx 50rpx 56rpx;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0rpx 2rpx 6rpx 0rpx rgba(0, 0, 0, 0.14);
      border-radius: 9rpx;
      box-sizing: border-box;
      .title {
        margin-bottom: 20rpx;
        .list(row, flex-start, center);
        .icon {
          flex: 0 0 28rpx;
          margin-right: 12rpx;
          width: 28rpx;
          height: 28rpx;
          line-height: 28rpx;
          color: rgba(15, 141, 233, 1);
          border: 1rpx solid rgba(15, 141, 233, 1);
          border-radius: 50%;
          box-sizing: border-box;
          font-size: 20rpx;
          text-align: center;
        }
        span {
          font-size: 26rpx;
          font-family: PingFang-SC-Medium;
          color: rgba(15, 141, 233, 1);
        }
      }
      .mobile-wrapper {
        .list(row, flex-start, center);
        height: 108rpx;
        border-bottom: 2rpx solid #D9D9D9;
        box-sizing: border-box;
        .font(30rpx, #000000);
        p {
          flex: 0 0 120rpx;
          margin-right: 42rpx;
        }
        input {
          flex: 1;
        }
      }
      .btn {
        margin-top: 40rpx;
        margin-bottom: 40rpx;
        width: 589rpx;
        height: 84rpx;
        line-height: 84rpx;
        background: linear-gradient(-167.1deg, rgba(0, 210, 255, 1), rgba(58, 123, 213, 1));
        border-radius: 9rpx;
        font-size: 31rpx;
        font-family: PingFang-SC-Medium;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        box-sizing: border-box;
      }
      .rule-wrapper {
        .rule {
          .list(row, flex-start, center);
          flex-wrap: nowrap;
          margin-bottom: 10rpx;
          .icon {
            flex: 0 0 30rpx;
            margin-right: 20rpx;
            color: #9B9B9B;
          }
          .text {
            .font(26rpx, #9B9B9B);
          }
        }
        .rule:last-of-type {
          margin-bottom: 0;
        }
      }
    }
    .more-service {
      margin-top: 52rpx;
      padding: 0 52rpx;
      text-align: center;
      .title {
        margin-bottom: 45rpx;
        font-size: 26rpx;
        font-family: PingFang-SC-Medium;
        color: rgba(155, 155, 155, 1);
      }
      .service-lists {
        .list(row, space-between, center);
        .service {
          img {
            margin-bottom: 10rpx;
            .imgs(56rpx, 56rpx);
          }
          p {
            line-height: 1;
            font-size: 26rpx;
            font-family: PingFang-SC-Medium;
            color: rgba(74, 74, 74, 1);
          }
        }
      }
    }
    .mask {
      .mask()
    }
    .modal {
      position: fixed;
      bottom: 545rpx;
      left: 130rpx;
      right: 128rpx;
      height: 248rpx;
      padding-top: 39rpx;
      border-radius: 20rpx;
      background: white;
      z-index: 2;
      text-align: center;
      box-sizing: border-box;
      &.noVirtualNum {
        padding-top: 60rpx;
      }
      .title {
        margin-bottom: 17rpx;
        font-size:30rpx;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(0,0,0,1);
      }
      .text {
        font-size:26rpx;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(155,155,155,1);
      }
      .bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 88rpx;
        .list(row, flex-start, center);
        .a, .btn {
          flex: 1;
          line-height: 88rpx;
          font-size:30rpx;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(0,0,0,1);
        }
        a {
          border-right: 1rpx solid #D9D9D9;
          border-bottom-left-radius: 20rpx!important;
        }
        .btn {
          padding: 0;
          border-radius: 0;
          background: white;
          border-bottom-right-radius: 20rpx!important;
          &::after {
            border:0 none;
          }
        }
      }
    }
  }

</style>
