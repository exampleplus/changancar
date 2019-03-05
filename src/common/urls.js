import {request} from '../utils/request.js'
// request 参数说明：(url，方法，数据参数，是否需要token)
// 获取token
export const getToken = data => request(`/api/wx_code/code_token?code=${data.code}&nickname=${data.nickname}&headimgurl=${data.headimgurl}&gender=${data.gender}`, 'get', {}, false)
// 获取验证码
export const sendCode = data => request(`/api/wx/user/getCode?mobile=${data.mobile}`, 'get', data, true)
// 注册
export const register = data => request(`/api/wx/user/register?mobile=${data.mobile}&code=${data.code}`, 'post', data, true)
// 绑定车辆二维码
export const bindingPhoneno = data => request('/api/moto/bindingPhoneno', 'post', data, true)
// 呼叫车主获取虚拟号
export const getCalledVirtualNum = data => request(`/api/mixcom/getCalledVirtualNum?id=${data.id}&src=${data.src}`, 'get', data, true)
// 获取救援电话
export const getRescueNum = () => request(`/api/moto/getRescue`, 'get', {}, true)

// 解析手机号
export const decodeUserInfo = data => request(`/api/wx/user/decodeUserInfo2?encrypted=${data.encrypted}&code=${data.code}&iv=${data.iv}`, 'get', data, true)
// 故障车灯
export const getFaultComplete = data => request(`/api/moto/getFaultComplete`, 'get', data, true)
// 故障详情
export const getFaultDetailById = data => request(`/api/moto/getFaultDetailById?id=${data.id}`, 'get', data, true)
// 个人信息
export const getUserInfo = data => request(`/api/wx/user/getUserInfo`, 'get', data, true)
// 选择车辆品牌
export const getCarBrandList = data => request(`/api/userCar/getCarBrandList`, 'get', data, true)
// 选取车系
export const getShopCarseries = data => request(`/api/userCar/getCarseries?brand=${data.brand}`, 'get', data, true)
// 反面-保存修改个人信息
export const updateUserInfo = data => request(`/api/wx/user/updateUserInfo`, 'post', data, true)
// 反面-修改联系人
export const updateLink = data => request(`/api/wx/user/updateLink`, 'post', data, true)
// 反面-开启/关闭呼叫设置
export const isCall = data => request(`/api/wx/user/callSet?isCall=${data.isCall}`, 'get', data, true)
// 上次保养时间
export const lastMaint = data => request(`/api/wx/make/lastMaint`, 'get', data, true)
// 获取绑定信息
export const getBingInfo = data => request(`/api/moto/getBingInfo?id=${data.id}`, 'get', data, true)
// 获取绑定信息2
export const getBingInfo2 = () => request(`/api/moto/getBingInfo`, 'get', {}, true)

// 反面-救援呼出记录
export const rescue = data => request(`/api/moto/rescue`, 'get', data, true)
