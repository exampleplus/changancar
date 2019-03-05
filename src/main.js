import Vue from 'vue'
import App from './App'
import store from './store'
import mpvueToastRegistry from 'mptoast/registry'

import {request} from './utils/request.js'

Vue.prototype.$axios = request
mpvueToastRegistry(Vue)
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(
  App,
  store)
app.$mount()
console.log(store)
export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      'pages/token/main',
      'pages/bindCar/main',
      'pages/status/main',
      'pages/nuoche-phone/main',
      '^pages/banners/main',
      'pages/center/main',
      'pages/personInfo/main',
      'pages/contacterEdit/main',
      'pages/callSetting/main',
      'pages/faultLight/main',
      'pages/useHelp/main',
      'pages/search-fault-light/main',
      'pages/car/car-pai/main',
      'pages/car/car-series/main'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#09A4F0',
      backgroundColor: 'white',
      navigationBarTitleText: '永达挪车',
      navigationBarTextStyle: 'white'
    }
    // tabBar: {
    //   color: '#888888',
    //   selectedColor: '#F3A68D',
    //   borderStyle: 'white',
    //   list: [{
    //     pagePath: 'pages/index/main',
    //     text: '首页',
    //     iconPath: '/static/assets/home.png',
    //     selectedIconPath: '/static/assets/home-active.png',
    //     backgroundColor: 'white'
    //   }, {
    //     pagePath: 'pages/order/main',
    //     text: '订单',
    //     iconPath: '/static/assets/order.png',
    //     selectedIconPath: '/static/assets/order-active.png',
    //     backgroundColor: 'white'
    //   }, {
    //     pagePath: 'pages/center/main',
    //     text: '我的',
    //     iconPath: '/static/assets/mine.png',
    //     selectedIconPath: '/static/assets/mine-active.png',
    //     backgroundColor: 'white'
    //   }]
    // }
  }
}
