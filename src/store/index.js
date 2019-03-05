import Vue from 'vue'
import Vuex from 'vuex'
// import state from './states'
// import mutations from './mutations'
// import * as actions from './actions'
// import * as getters from './getters'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    token: '',
    scene: ''
  },
  mutations: {
    setToken(state, token) {
      wx.setStorageSync('token', token)
      state.token = token
    },
    setCode(state, scene) {
      wx.setStorageSync('scene', scene)
      state.scene = scene
    }
  },
  actions: {
    setToken(context) {
      setTimeout(() => {
        this.setToken()
      }, 1000)
    }
  },
  getters: {
    getToken(state) {
      if (!state.token) {
        state.token = wx.getStorageSync('token')
      }
      return state.token
    },
    getCode(state) {
      if (!state.code) {
        state.scene = wx.getStorageSync('scene')
      }
      // return 1
    }
  }
})
