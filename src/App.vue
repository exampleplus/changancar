<script>
  // import store from './store'
  // import store from '@/store/index'
  export default {
    // computed: {
    //   ...mapGetters({
    //     getToken: 'getToken'
    //   })
    // },
    data() {
      return {
        tokens: ''
      }
    },
    onLoad (options) {
    },
    onLaunch (options) {
      if (this.$root.$mp.appOptions.scene) {
        // store.commit('setCode', options.query.id)
        wx.removeStorageSync('scene')
        wx.setStorageSync('scene', this.$root.$mp.appOptions.scene)
      }
      // store.commit('setCode', options.query.id)
      if (!wx.getStorageSync('token')) {
        wx.reLaunch({
          url: '/pages/token/main'
        })
      }
    },
    methods: {
      // _getToken() {
      //   let token = store.getters.getToken
      //   // let tokens = wx.getStorageSync('token')
      //   // console.log(store.getters.getToken)
      //   if (!token) {
      //     console.log(11)
      //     wx.reLaunch({
      //       url: './pages/token/main'
      //     })
      //   }
      // }
    }
  }
</script>

<style>
  page {
    height: 100%;
    background: #F7F7F7;
  }

  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 200rpx 0;
    box-sizing: border-box;
  }

  .placeholder {
    font-size:30rpx;
    font-family:PingFangSC-Regular;
    color:rgba(208,208,208,1);
  }

  .choose {
    color: #BBBBBB;
  }

  .wx-switch-input {
    width: 79rpx !important;
    height: 48rpx !important;
  }

  /*白色样式（false的样式）*/

  .wx-switch-input::before {
    width: 79rpx !important;
    height: 48rpx !important;
  }

  /*绿色样式（true的样式）*/

  .wx-switch-input::after {
    width: 43rpx !important;
    height: 43rpx !important;
  }

  /* this rule will be remove */

  * {
    transition: width 2s;
    -moz-transition: width 2s;
    -webkit-transition: width 2s;
    -o-transition: width 2s;
  }

</style>
