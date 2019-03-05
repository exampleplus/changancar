<template>
  <article class="blue-container">
    <section class="bg-wrapper" :style="{height: initHeight}">
      <img :src="img" alt="" :style="{height: imgheight}">
    </section>
  </article>
</template>

<script>
  export default {
    data() {
      return {}
    },
    props: {
      initHeight: {
        type: String,
        default: '900rpx'
      },
      img: {
        type: String,
        default: '/static/images/bindCar.png'
      },
      imgheight: {
        type: String,
        default: '300rpx'
      }
    },
    components: {}
  }

</script>

<style lang='less' scoped>
  .blue-container {
    .bg-wrapper {
      height: 900rpx;
      background: linear-gradient(180deg, rgba(9, 164, 240, 1), rgba(255, 255, 255, 0));
      img {
        width: 100%;
        height: 300rpx;
        border: 0 none;
      }
    }
  }

</style>
