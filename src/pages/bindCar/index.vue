<template>
  <article class="bindCar-container">
    <blue></blue>
    <!-- <section class="bg-wrapper">
      <img src="/static/images/bindCar.png" alt="">
    </section> -->
    <section class="userinfo-wrapper">
      <p class="title">
        <i class="icon">i</i>
        <span>该挪车码尚未绑定，填写信息即可开启电话保护</span>
      </p>
      <div class="mobile-wrapper">
        <p>您的电话</p>
        <input type="number" v-model="formItem.phoneNo" placeholder="请填写您的手机号" placeholder-class="placeholder">
      </div>
      <div class="code-wrapper">
        <p>验证码</p>
        <div class="verify">
          <input type="number" maxlength="6" v-model="formItem.code" placeholder="请输入验证码" placeholder-class="placeholder">
          <p class="btn1" v-if="!isGetCode" @click="getVerify">获取验证码</p>
          <p class="btn2" v-else>{{codeTime}}″</p>
        </div>
      </div>
      <div class="carNo-wrapper">
        <p class="title">请输入车牌号</p>
        <ul class="carNo">
          <li class="area" @click="keymaps(0)" :class="{hasNum: isNum[0]}">
            <p v-if="!num[0]">沪</p>
            <p v-else :class="{active: firstActive}">{{num[0]}}</p>
          </li>
          <li class="area bor" @click="keymaps(1)" :class="{hasNum: isNum[1]}">
            <p v-if="!num[1]">A</p>
            <p v-else>{{num[1]}}</p>
          </li>
          <i class="icon"></i>
          <li @click="keymaps(2)" :class="{hasNum: isNum[2]}">
            <p v-if="!num[2]">8</p>
            <p v-else class="activeNum">{{num[2]}}</p>
          </li>
          <li @click="keymaps(3)" :class="{hasNum: isNum[3]}">
            <p v-if="!num[3]">8</p>
            <p v-else class="activeNum">{{num[3]}}</p>
          </li>
          <li @click="keymaps(4)" :class="{hasNum: isNum[4]}">
            <p v-if="!num[4]">8</p>
            <p v-else class="activeNum">{{num[4]}}</p>
          </li>
          <li @click="keymaps(5)" :class="{hasNum: isNum[5]}">
            <p v-if="!num[5]">8</p>
            <p v-else class="activeNum">{{num[5]}}</p>
          </li>
          <li @click="keymaps(6)" :class="{hasNum: isNum[6]}">
            <p v-if="!num[6]">8</p>
            <p v-else class="activeNum">{{num[6]}}</p>
          </li>
          <li @click="keymaps(7)" :class="{hasNum: isNum[7]}" v-if="isNew">
            <p v-if="!num[7]">8</p>
            <p v-else class="activeNum">{{num[7]}}</p>
          </li>
          <li class="new" v-else @click="change(8)">
            <p v-if="!num[8]">+</p>
            <p v-if="!num[8]">新能源</p>
            <p v-else class="activeNum">{{num[8]}}</p>
          </li>
        </ul>
      </div>
      <div class="mobile-wrapper">
        <p>推荐码</p>
        <input type="number" v-model="formItem.referralCode" placeholder="请询问服务顾问（选填）" placeholder-class="placeholder">
      </div>
      <a class="btn" :class="getActive ? 'active' : ''" @click="openFun">立即开启</a>
      <div style="background: white;position:fixed;bottom:0;left:0;right:0;z-index:2;background:white;">
        <key-map :isShow="isShow" :keyBoardType="keyBoardType" @triggerEvent="triggerEvent" @inputchange="inputchange"></key-map>
      </div>
    </section>
  </article>
</template>

<script>
  import * as urls from '@/common/urls'
  import KeyMap from '@/components/car-keymap/car-keymap'
  // import KeyMap from '@/components/keymap/keymap'
  import Vue from 'vue'
  import {
    toast
  } from '@/common/msgAlert'
  import Blue from '@/components/blue'
  // import store from '../../store'
  export default {
    data() {
      return {
        mobile: '',
        code: '',
        isGetCode: '',
        codeTime: 60,
        tuijianCode: '',
        carNo: '',
        keyBoardType: 2,
        num: [],
        firstActive: false,
        isNum: [],
        isShow: false,
        index: 0,
        isNew: false,
        formItem: {
          phoneNo: '',
          code: ''
        }
      }
    },
    computed: {
      getActive() {
        if (this.formItem.phoneNo && this.formItem.code && this.index >= 6) {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      // 立即开启
      openFun () {
        for (var i = 0; i < this.num.length; i++) {
          if (this.num[i] === undefined) {
            if (i !== 0 && i !== 1) this.num[i] = 8
            else if (i === 0) this.num[i] = '沪'
            else if (i === 1) this.num[i] = 'A'
          }
        }
        this.formItem.id = wx.getStorageSync('scene')
        this.formItem.plateNo = this.num.join('')
        urls.bindingPhoneno(this.formItem).then(function (res) {
          if (res.data.code === 0) {
            wx.navigateTo({
              url: '/pages/status/main?type=2'
            })
          } else {
            toast('提示', res.data.msg)
          }
        })
      },
      change(idx) {
        this.isNew = true
        this.isNum = []
        this.isNum[7] = true
        this.index = 7
        this.isShow = true
        this.show = 1
        // this.keymaps(idx)
        Vue.set(this.isNum, 7, this.isNum[7])
      },
      keymaps(idx) {
        if (idx === 0) {
          this.keyBoardType = 1
        } else {
          this.keyBoardType = 2
        }
        this.isNum = []
        this.isNum[idx] = true
        this.index = idx
        this.isShow = true
        Vue.set(this.isNum, idx, this.isNum[idx])
      },
      inputchange(e) {
        console.log(this.num.length, 'LENGTH')
        this.num[this.index] = e
        if (this.isNew) {
          if (this.index === 7) {
            this.index = 7
          } else {
            this.index = this.index + 1
          }
        } else {
          if (this.index === 6) {
            this.index = 6
          } else {
            this.index = this.index + 1
          }
        }
        console.log(this.index, 'this.index')
        this.isNum = []
        this.isNum[this.index] = true
        if (this.index === 0) {
          this.keyBoardType = 1
        } else {
          this.keyBoardType = 2
        }
        Vue.set(this.isNum, this.index, this.isNum[this.index])
        Vue.set(this.num, this.index, this.num[this.index])
      },
      getCarNo() {
        this.carNo = `${this.num1}${this.num2}${this.num3}${this.num4}${this.num5}`
      },
      getVerify() {
        let reg = /^1[2-9][0-9]{9}$/
        if (!this.formItem.phoneNo) {
          toast('提示', '请输入手机号')
        } else if (!(reg.test(this.formItem.phoneNo))) {
          toast('提示', '请输入正确的手机号',
            () => {
              this.formItem.phoneNo = ''
            })
        } else {
          urls.sendCode({
            mobile: this.formItem.phoneNo
          }).then(res => {
            console.log(res)
            if (res.data.code === 0) {
              toast('提示', '已发送至您的手机',
                () => {
                  this.getCode()
                })
            } else {
              toast('提示', res.data.msg)
            }
          })
        }
      },
      getCode() {
        var interval = setTimeout(() => {
          this.getCode()
        }, 1000)
        if (this.codeTime > 0) {
          this.isGetCode = true
          this.codeTime--
        } else {
          clearTimeout(interval)
          this.isGetCode = false
          this.codeTime = 60
        }
      },
      triggerEvent(e) {
        console.log(e, 'triggerEvent')
        if (e === 'ok') {
          this.isShow = false
          this.isNum = []
        } else if (e === 'delete') {
          if (this.index === 7) {
            this.isNew = false
          }
          this.num[this.index] = ''
          this.isNum = []
          this.isNum[this.index - 1] = true
          this.index = this.index - 1
          if (this.index === 0) {
            this.show = 0
          } else {
            this.show = 1
          }
          Vue.set(this.num, this.index, this.num[this.index])
          Vue.set(this.isNum, this.index, this.isNum[this.index])
        }
        // if (this.keyBoardType === 1) {
        //   console.log('A')
        //   this.first = e
        // }
      }
    },
    components: {Blue, KeyMap}
  }

</script>

<style lang='less' scoped>
  @import '../../common/styles/elements.less';
  .bindCar-container {
    // font-size: 0;
    .bg-wrapper {
      height: 900rpx;
      background:linear-gradient(180deg,rgba(9,164,240,1),rgba(255,255,255,0));
      img {
        width: 100%;
        height: 300rpx;
        border: 0 none;
      }
    }
    .userinfo-wrapper {
      position: absolute;
      top: 300rpx;
      left: 30rpx;
      right: 30rpx;
      padding: 40rpx 50rpx 60rpx;
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
          margin-right: 70rpx;
        }
      }
      .code-wrapper {
        .list(row, flex-start, center);
        height: 108rpx;
        border-bottom: 2rpx solid #D9D9D9;
        box-sizing: border-box;
        .font(30rpx, #000000);
        p {
          flex: 0 0 120rpx;
          margin-right: 70rpx;
        }
        .verify {
          flex: 1;
          .list(row, space-between, center);
          input {
            flex: 1;
          }
          p, .btn2 {
            flex: 0 0 155rpx;
            margin-right: 0;
            .imgs(155rpx, 51rpx);
            line-height: 51rpx;
            background: #F5A623;
            border-radius: 24rpx;
            font-size: 24rpx;
            font-family: PingFangSC-Regular;
            color: rgba(255, 255, 255, 1);
            text-align: center;
          }
          .btn2 {
            background: rgba(224, 224, 224, 1);
            color: rgba(187, 187, 187, 1);
          }
        }
      }
      .carNo-wrapper {
        padding: 25rpx 0 30rpx;
        height: 176rpx;
        border-bottom: 2rpx solid #D9D9D9;
        box-sizing: border-box;
        .title {
          margin-bottom: 18rpx;
          font-size: 26rpx;
          font-family: PingFangSC-Regular;
          color: rgba(155, 155, 155, 1);
        }
        .carNo {
          .list(row, flex-start, center);
          li {
            width: 69rpx;
            height: 67rpx;
            line-height: 67rpx;
            background: rgba(255, 255, 255, 1);
            border-radius: 3rpx;
            border: 2rpx solid rgba(221, 221, 221, 1);
            box-sizing: border-box;
            .font(32rpx, #D0D0D0);
            text-align: center;
            &:not(.area) {
              margin-right: 4rpx;
            }
            &.hasNum {
              border: 2rpx solid #2F7DCD;
            }
            input {
              height: 100%;
              line-height: 67rpx;
              color: #000000;
            }
            .activeNum {
              color: #000000;
            }
          }
          .area {
            width: 64rpx;
            font-size: 30rpx;
            font-family: PingFang-SC-Medium;
            color: rgba(0, 0, 0, 1);
            text-align: center;
            border-right: 0 none;
            &.bor {
              border-right: 2rpx solid rgba(221, 221, 221, 1);
            }
            &.hasNum {
              border: 2rpx solid #2F7DCD;
            }
          }
          .icon {
            margin: 0 7rpx;
            width: 10rpx;
            height: 10rpx;
            border-radius: 50%;
            background: rgba(221, 221, 221, 1);
          }
          .new {
            .list(column, center, center);
            flex-wrap: nowrap;
            height: 67rpx;
            line-height: 1;
            border: 2rpx dotted rgba(221, 221, 221, 1);
            .font(18rpx, #9B9B9B);
            text-align: center;
            p {
              flex: 1;
              font-family: PingFangSC-Regular;
            }
            p:first-of-type {
              font-size: 39rpx;
            }
          }
        }
      }
      .btn {
        margin-top: 40rpx;
        width: 589rpx;
        height: 84rpx;
        line-height: 84rpx;
        background: rgba(166, 197, 229, 1);
        border-radius: 9rpx;
        font-size: 31rpx;
        font-family: PingFang-SC-Medium;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        box-sizing: border-box;
        &.active {
          background:linear-gradient(-167.1deg,rgba(0,210,255,1),rgba(58,123,213,1));
        }
      }
    }
  }

</style>
