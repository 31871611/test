<template>
  <div class="indicator">
    <div class="wrapper">
      <span class="mint-indicator-spin">
        <div class="mint-spinner-snake"></div>
      </span>
      <span class="text" v-show="isText">
        加载中...
      </span>
    </div>
    <div class="mask"></div>
  </div>
</template>

<script type="text/ecmascript-6">
/*
 是否显示文字
*/
export default {
  name: 'hello',
  props:{
    isText:{
      type : Boolean,
      default : true
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<style scoped lang="scss">
  .indicator{
    transition: opacity .2s linear;
    .wrapper{
      padding: 15px;
      top: 50%;
      left: 50%;
      position: fixed;
      -webkit-transform: translate(-50%,-50%);
      transform: translate(-50%,-50%);
      border-radius: 5px;
      background: rgba(0,0,0,.7);
      color: #fff;
      box-sizing: border-box;
      text-align: center;
    }

    .mint-indicator-spin{
      display: inline-block;
      text-align: center;
    }
    .mint-spinner-snake{
      height: 32px;
      width: 32px;
      -webkit-animation: mint-spinner-rotate .8s infinite linear;
      animation: mint-spinner-rotate .8s infinite linear;
      border: 4px solid transparent;
      border-top-color: rgb(204, 204, 204);
      border-left-color: rgb(204, 204, 204);
      border-bottom-color: rgb(204, 204, 204);
      border-radius: 50%;
    }
    @keyframes mint-spinner-rotate {
      0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }

    .text {
      display: block;
      color: #fff;
      text-align: center;
      margin-top: 10px;
      font-size: 16px;
    }

    .mask{
      top: 0;
      left: 0;
      position: fixed;
      width: 100%;
      height: 100%;
      opacity: 0;
      background: transparent;
    }
  }
</style>
