<template>
  <div class="vehicle" v-if="isShow">
    <div class="english" v-if="show === 0">
      <div class="list1">
        <p class="letter" v-for="(item, index) in name1" :key="index" @click="choose(item)">{{item}}</p>
      </div>
      <div class="list1">
        <p class="letter" v-for="(item, index) in name2" :key="index" @click="choose(item)">{{item}}</p>
      </div>
      <div class="list1">
        <p class="letter" v-for="(item, index) in name3" :key="index" @click="choose(item)">{{item}}</p>
      </div>
      <div class="list1">
        <p class="letter letter2" v-for="(item, index) in name4" :key="index" @click="choose(item)">{{item}}</p>
      </div>
    </div>
    <div class="english" v-if="show === 1">
      <div class="list1">
        <p class="letter letter3" v-for="(item, index) in keyNumber" :key="index" @click="choose(item)">{{item}}</p>
      </div>
      <div class="list1">
        <p class="letter letter3" v-for="(item, index) in keyEnInput1" :key="index" @click="choose(item)">{{item}}</p>
      </div>
      <div class="list1">
        <p class="letter letter3" v-for="(item, index) in keyEnInput2" :key="index" @click="choose(item)">{{item}}</p>
        <div class="letter letter3" @click="dele">
          <img src="static/images/delete.png">
        </div>
      </div>
      <div class="list1">
        <p class="letter letter3" v-for="(item, index) in keyEnInput3" :key="index" @click="choose(item)">{{item}}</p>
        <p class="letter letter4" @click="sure">确定</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      show: { // 省份键盘或字母数字键盘
        type: Number,
        default: 0
      },
      isShow: { // 是否显示键盘
        type: Boolean,
        default: false
      },
      checkCode: {
        type: Function
      },
      deleNum: {
        type: Function
      },
      ok: {
        type: Function
      }
    },
    data() {
      return {
        name1: ['粤', '京', '冀', '沪', '津', '晋', '蒙', '辽', '宁'],
        name2: ['苏', '浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '青'],
        name3: ['琼', '渝', '川', '贵', '云', '藏', '陕', '甘', '桂'],
        name4: ['吉', '湘', '黑', '新', '港', '澳'],
        keyNumber: '1234567890',
        keyEnInput1: 'QWERTYUIOP',
        keyEnInput2: 'ASDFGHJKL',
        keyEnInput3: 'ZXCVBNM'
      }
    },
    components: {

    },
    mounted() {

    },
    methods: {
      choose(name) {
        console.log(name)
      },
      dele() {
      },
      sure() {
      }
    }
  }
</script>
<style lang="less">
  .vehicle {
    z-index: 99;
    .english {
      z-index: 99;
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: .133333rem .133333rem 0.399999rem;
      background: #D9DEE6;
      box-sizing: border-box;
      .list1 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: .266667rem;
        .left {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 28%;
        }
        .right {
          display: flex;
          align-items: center;
          justify-content: space-between;
          img {
            width: 1.5rem;
            height: 1.2rem;
            margin-right: .266667rem;
          }
          .over {
            width: 1rem;
            height: 1rem;
            border-radius: .133333rem;
            background: #FFFFFF;
            font-size: .373333rem;
            line-height: 1rem;
            text-align: center;
          }
        }
        .letter {
          width: 1rem;
          height: 1rem;
          border-radius: .133333rem;
          background: #FFFFFF;
          font-size: .453333rem;
          line-height: 1rem;
          text-align: center;
        }
        .letter2 {
          width: 1.5rem;
        }
        .letter3 {
          width: 0.8rem;
          img {
            width: .533333rem;
            height: .533333rem;
            vertical-align: middle;
          }
        }
        .letter4 {
          width: 1.6rem;
          background: #2F7DCD;
          color: #FFFFFF;
        }
      }
    }
  }
</style>

