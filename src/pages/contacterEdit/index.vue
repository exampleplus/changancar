<template>
  <article class="edit-container">
    <div class="common-wrapper">
      <div class="mobile-wrapper">
        <p>联系方式
          <span>*</span>
        </p>
        <input type="number" v-model="mobile" placeholder="请输入手机号" placeholder-class="placeholder">
      </div>
    </div>
    <div class="common-wrapper">
      <div class="code-wrapper">
        <p>验证码
          <span>*</span>
        </p>
        <div class="verify">
          <input maxlength="6" type="number" v-model="code" placeholder="请输入验证码" placeholder-class="placeholder">
          <p class="btn" v-if="!isGetCode" @click="getVerify">获取验证码</p>
          <p class="btn2" v-else>{{codeTime}}″</p>
        </div>
      </div>
    </div>
    <button class="btns active" @click="confirmEdit">编辑修改</button>
  </article>
</template>

<script>
  import * as urls from '@/common/urls'
  import {
    toast
  } from '@/common/msgAlert'
  export default {
    data() {
      return {
        mobile: '',
        code: ''
      }
    },
    mounted() {
      this.mobile = ''
      this.code = ''
    },
    methods: {
      async confirmEdit() {
        if (!this.mobile || !this.code) {
          toast('提示', '请输入手机号或验证码')
          return
        }
        let { data } = await urls.updateLink({
          virtualPhone: this.mobile,
          code: this.code
        })
        if (data.code === 0) {
          toast('提示', '修改联系人成功', () => {
            wx.navigateBack()
          })
        }
      },
      getVerify() {
        let reg = /^1[2-9][0-9]{9}$/
        if (!this.mobile) {
          toast('提示', '请输入手机号')
        } else if (!(reg.test(this.mobile))) {
          toast('提示', '请输入正确的手机号',
            () => {
              this.mobile = ''
            })
        } else {
          urls.sendCode({
            mobile: this.mobile
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
      }
    },
    components: {}
  }

</script>

<style lang='less' scoped>
  @import '../../common/styles/elements.less';

  .edit-container {
    padding-top: 40rpx;
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
          span {
            color: #F43530;
          }
        }
        input {}
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
          span {
            color: #F43530;
          }
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
  }

</style>
