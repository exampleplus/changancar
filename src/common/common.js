import {toast} from '@/common/msgAlert'
import * as urls from '@/common/urls'

/* <p class="btn" v-if="!isGetCode" @click="getVerify">获取验证码</p>
<p class="btn" v-else>{{codeTime}}″</p> */

// mobile: '',
// code: '',
// isGetCode: '',
// codeTime: 60
// 倒计时60s函数
export function getVerify() {
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
      }
    })
  }
}
export function getCode() {
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
