// import {getToken} from '@/common/urls'

const baseURL = 'https://e4swxqrcode.yddop.com' // 正式版
// const baseURL = 'https://e4swxuat.yddop.com' // 测试版

export function request(url, method, data, needToken) {
  return new Promise((resolve, reject) => {
    let token = wx.getStorageSync('token')
    if (!needToken) {
      wx.request({
        url: baseURL + url, // 接口地址,
        data: data,
        method: method,
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          resolve(res)
        },
        fail(ret) {
          reject(ret)
        }
      })
    } else {
      if (!token) {  // 如果没有token
        wx.removeStorageSync('token')
        wx.redirectTo({
          url: '/pages/token/main'
        })
      } else { // 获取到token时
        wx.request({
          url: baseURL + url, // 接口地址,
          data: data,
          method: method,
          header: {
            'content-type': 'application/json',
            Authorization: token
          },
          success(res) {
            // console.log(res, 'REQUEST')
            // console.log(wx.getStorageSync('token'))
            if (res.statusCode === 403) {
              wx.redirectTo({
                url: '/pages/bindMobile/main'
              })
            } else if (res.statusCode === 401) {
              wx.removeStorageSync('token')
              wx.redirectTo({
                url: '/pages/token/main'
              })
            } else {
              resolve(res)
            }
          },
          fail(ret) {
            reject(ret)
          }
        })
      }
    }
  })
}
