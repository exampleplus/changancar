<template>
  <article class="personInfo-container">
    <p class="tip">绑定车辆</p>
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
        <li class="new" v-else @click="change">
          <p>+</p>
          <p>新能源</p>
        </li>
      </ul>
    </div>
    <div class="common-wrapper">
      <div class="pinpai-wrapper">
        <p>品牌
          <span v-if="type === 1">*</span>
        </p>
        <div class="car-infos" @click="caiSelect(0)" v-if="!car.brand">
          <p class="select">请选择</p>
          <img src="/static/images/right-icon.png" class="right-icon">
        </div>
        <di v-else>
          <p class="select2" @click="caiSelect(0)">{{car.brand}}</p>
        </di>
        <!-- <picker @change="bindPickerChange" :value="index" :range="array" style="flex: 1;">
          <view class="picker" v-if="index !== 0" style="font-size:30rpx;font-family:PingFangSC-Regular;color:rgba(0,0,0,1);">
            {{array[index]}}
          </view>
          <div v-else style="flex: 1;display:flex;justify-content: space-between;align-items: center">
            <p class="select">请选择</p>
            <img src="/static/images/right-icon.png" class="right-icon">
          </div>
        </picker> -->
      </div>
      <div class="pinpai-wrapper">
        <p>车系</p>
        <div class="car-infos" @click="caiSelect(1)" v-if="!car.carSeries">
          <p class="select">请选择</p>
          <img src="/static/images/right-icon.png" class="right-icon">
        </div>
        <di v-else>
          <p class="select2" @click="caiSelect(1)">{{car.carSeries}}</p>
        </di>
      </div>
    </div>
    <div class="common-wrapper">
      <div class="mobile-wrapper">
        <p>发动机号</p>
        <input type="number" :disabled="type !==1" v-model="car.engine" placeholder="请输入发动机号" placeholder-class="placeholder">
      </div>
    </div>
    <p class="tip">虚拟电话联系人</p>
    <div class="common-wrapper">
      <div class="mobile-wrapper">
        <p>联系方式
          <span v-if="type === 1">*</span>
        </p>
        <input type="number" :disabled="type !==1" v-model="user.virtualPhone" placeholder="139 2384 2293" placeholder-class="placeholder">
      </div>
    </div>
    <div class="common-wrapper" v-if="type === 1">
      <div class="code-wrapper">
        <p>验证码
          <span v-if="type === 1">*</span>
        </p>
        <div class="verify">
          <input type="number" maxlength="6" v-model="code" placeholder="请输入验证码" placeholder-class="placeholder">
          <p class="btn" v-if="!isGetCode" @click="getVerify">获取验证码</p>
          <p class="btn2" v-else>{{codeTime}}″</p>
        </div>
      </div>
    </div>
    <button v-if="!type" class="btns" @click="edit">编辑修改</button>
    <button v-else class="btns active" :class="getActive && type === 1 ? 'active' : ''" @click="confirmEdit">编辑修改</button>
    <div style="background: white;position:fixed;bottom:0;left:0;right:0;z-index:2;background:white;">
      <key-map :isShow="isShow" :keyBoardType="keyBoardType" @triggerEvent="triggerEvent" @inputchange="inputchange"></key-map>
    </div>
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
  export default {
    data() {
      return {
        type: '', // 0查看个人信息 1修改
        mobile: '',
        code: '',
        isGetCode: '',
        codeTime: 60,
        tuijianCode: '',
        keyBoardType: 2,
        num: [],
        firstActive: false,
        isNum: [],
        isShow: false, // 键盘显隐藏
        idx: 0, // 当前输入到第几位的索引
        isNew: false, // 是否是新能源
        carNo: '',
        faDongjiCode: '', // 发动机号
        array: ['美国', '中国', '巴西', '日本'],
        index: 0,
        user: {}, // 用户信息
        car: {}, // 汽车详情
        carPai: {},
        carSeries: {}
      }
    },
    computed: {
      getActive() {
        if (this.mobile && this.code && this.faDongjiCode) {
          return true
        } else {
          return false
        }
      }
    },
    onShow() {
      this.isNum = []
      this.num = []
      this.idx = 0
      this.code = ''
      this.type = Number(this.$root.$mp.query.type)
      this._getUserInfo()
      // 获取当前编辑状态
      if (wx.getStorageSync('editType')) {
        this.type = Number(wx.getStorageSync('editType'))
      } else {
        this.type = ''
      }
    },
    methods: {
      async confirmEdit() {
        const datas = {
          virtualPhone: this.user.virtualPhone,
          code: this.code,
          plateNo: this.num.join(''),
          brand: this.car.brand,
          carSeries: this.car.carSeries,
          carId: this.car.id,
          engine: this.car.engine
        }
        wx.removeStorageSync('editType')
        this.type = 0
        console.log(datas, 'datas')
        let { data } = await urls.updateUserInfo(datas)
        console.log(data)
        if (!data.code) {
          toast('提示', '修改成功', () => {
            wx.removeStorageSync('carSeries')
            wx.removeStorageSync('carPai')
            wx.navigateBack()
          })
        } else {
          toast('提示', data.msg)
        }
      },
      caiSelect(type) {
        if (this.type !== 1) {
          console.log('AA')
          return
        } else {
          if (!type) {
            wx.navigateTo({
              url: '/pages/car/car-pai/main'
            })
          } else {
            if (!this.car.brand) {
              toast('提示', '请先选择品牌')
              return
            }
            wx.navigateTo({
              url: `/pages/car/car-series/main?carSeries=${this.car.brand}`
            })
          }
        }
      },
      edit() {
        this.type = 1
        wx.setStorageSync('editType', 1)
      },
      change() {
        if (!wx.getStorageSync('editType')) {
          return
        }
        this.isNew = true
        this.isNum = []
        this.isNum[7] = true
        this.idx = 7
        this.isShow = true
        this.show = 1
        Vue.set(this.isNum, 7, this.isNum[7])
      },
      keymaps(idx) {
        if (this.type !== 1) return
        if (idx === 0) {
          this.keyBoardType = 1
        } else {
          this.keyBoardType = 2
        }
        this.isNum = []
        this.isNum[idx] = true
        this.idx = idx
        this.isShow = true
        Vue.set(this.isNum, idx, this.isNum[idx])
      },
      inputchange(e) {
        this.num[this.idx] = e
        if (this.isNew) {
          if (this.idx === 7) {
            this.idx = 7
          } else {
            this.idx = this.idx + 1
          }
        } else {
          if (this.idx === 6) {
            this.idx = 6
          } else {
            this.idx = this.idx + 1
          }
        }
        console.log(this.idx, 'this.index')
        this.isNum = []
        this.isNum[this.idx] = true
        if (this.idx === 0) {
          this.keyBoardType = 1
        } else {
          this.keyBoardType = 2
        }
        Vue.set(this.isNum, this.idx, this.isNum[this.idx])
        Vue.set(this.num, this.idx, this.num[this.idx])
      },
      triggerEvent(e) {
        console.log(e, 'triggerEvent')
        if (e === 'ok') {
          this.isShow = false
          this.isNum = []
          this.idx = 0
        } else if (e === 'delete') {
          if (this.idx === 7) {
            this.isNew = false
          }
          this.num[this.idx] = ''
          this.isNum = []
          this.isNum[this.idx - 1] = true
          this.idx = this.idx - 1
          if (this.idx === 0) {
            this.keyBoardType = 1
          } else {
            this.keyBoardType = 2
          }
          Vue.set(this.num, this.idx, this.num[this.idx])
          Vue.set(this.isNum, this.idx, this.isNum[this.idx])
        }
        // if (this.keyBoardType === 1) {
        //   console.log('A')
        //   this.first = e
        // }
      },
      bindPickerChange(e) {
        this.index = e.mp.detail.value
      },
      getVerify() {
        let reg = /^1[2-9][0-9]{9}$/
        if (!this.car.phoneno) {
          toast('提示', '请输入手机号')
        } else if (!(reg.test(this.car.phoneno))) {
          toast('提示', '请输入正确的手机号')
        } else {
          urls.sendCode({
            mobile: this.car.phoneno
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
      async _getUserInfo() {
        let { data } = await urls.getUserInfo()
        this.user = data.data.user
        this.car = data.data.car
        // if (!this.car.engine) this.car.engine = '请输入发动机号'
        this.num = this.car.plateNo.split('')
        if (this.num.length >= 8) this.isNew = true
        console.log(this.user, 'data')
        // 获取车牌
        if (wx.getStorageSync('carPai')) {
          this.carPai = wx.getStorageSync('carPai')
          this.car.brand = this.carPai
          this.car.carSeries = ''
        } else {
          this.carPai = ''
        }
        // 获取车系
        if (wx.getStorageSync('carSeries')) {
          this.carSeries = wx.getStorageSync('carSeries')
          this.car.carSeries = this.carSeries
        } else {
          this.carSeries = ''
        }
      }
    },
    components: {KeyMap}
  }

</script>

<style lang='less' scoped>
  @import '../../common/styles/elements.less';

  .personInfo-container {
    padding-top: 20rpx;
    .tip {
      padding-left: 30rpx;
      height: 60rpx;
      line-height: 60rpx;
      font-size: 26rpx;
      font-family: PingFangSC-Regular;
      color: rgba(155, 155, 155, 1);
    }
    .common-wrapper {
      padding-left: 30rpx;
      background: white;
      .pinpai-wrapper {
        .list(row, flex-start, center);
        padding-right: 30rpx;
        height: 88rpx;
        line-height: 88rpx;
        border-bottom: 1rpx solid rgba(217, 217, 217, 1);
        box-sizing: border-box;
        p {
          height: 100%;
          font-size: 30rpx;
          font-family: PingFangSC-Regular;
          color: rgba(0, 0, 0, 1);
        }
        p:first-of-type {
          flex: 0 0 148rpx;
          margin-right: 42rpx;
        }
        .select {
          flex: 1;
          height: 100%;
          font-size: 30Rpx;
          font-family: PingFangSC-Regular;
          color: rgba(208, 208, 208, 1);
        }
        .right-icon {
          flex: 0 0 28rpx;
          width: 28rpx;
          height: 28rpx;
        }
        .car-infos {
          flex: 1;
          display:flex;
          justify-content: space-between;
          align-items: center
        }
      }
    }
    .common-wrapper {
      padding-left: 30rpx;
      background: white;
      .mobile-wrapper {
        .list(row, flex-start, center);
        margin-bottom: 20rpx;
        padding-right: 30rpx;
        height: 88rpx;
        border-bottom: 1rpx solid rgba(217, 217, 217, 1);
        box-sizing: border-box;
        background: white;
        .font(30rpx, #000000);
        p {
          flex: 0 0 148rpx;
          margin-right: 42rpx;
        }
        input {}
      }
    }
    .carNo-wrapper {
      padding: 25rpx 30rpx 30rpx;
      height: 200rpx;
      box-sizing: border-box;
      background: white;
      .title {
        margin-bottom: 18rpx;
        font-size: 26rpx;
        font-family: PingFangSC-Regular;
        color: rgba(155, 155, 155, 1);
      }
      .carNo {
        .list(row, flex-start, center);
        li {
          width: 80rpx;
          height: 76rpx;
          line-height: 76rpx;
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
          width: 72rpx;
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
          height: 76rpx;
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
    .common-wrapper {
      padding-left: 30rpx;
      background: white;
      .code-wrapper {
        .list(row, flex-start, center);
        margin-top: -20rpx;
        padding-right: 30rpx;
        height: 88rpx;
        border-bottom: 2rpx solid #D9D9D9;
        box-sizing: border-box;
        background: white;
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
          p,
          .btn2 {
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
    }
    .btns {
      margin-top: 40rpx;
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
      &.active {
        background: linear-gradient(-167.1deg, rgba(0, 210, 255, 1), rgba(58, 123, 213, 1));
        color: white;
        border: 0 none;
      }
    }
    span {
      color: red;
    }
  }

</style>
