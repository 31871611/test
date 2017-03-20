<template>
  <div class="food">
    <div class="food-content" v-show="showFlag">
      <div class="image-header">
        <img src="">
        <div class="back">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
      <div class="content">
        <h1 class="title">标题</h1>
        <div class="detail">
          <span class="sell-count">月售1份</span>
          <span class="rating">好评率1%</span>
        </div>
        <div class="price">
          <span class="now">￥111</span>
          <span class="old">￥222</span>
        </div>
        <div class="cartcontrol-wrapper">
          <!--<cartcontrol :food="food"></cartcontrol>-->
        </div>
        <div class="buy" transition="fade">加入购物车</div>
      </div>

      <!--<split v-show="food.info"></split>-->

      <div class="info">
        <h1 class="title">商品信息</h1>
        <p class="text">信息</p>
      </div>

      <!--<split></split>-->

      <div class="rating">

      </div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props:{
    food:{
      type:Object
    }
  },
  data () {
    return {

    }
  },
  ready: function () {

  },
  methods: {

  },
  components: {

  }

}
</script>
<style lang="scss" src="../../common/scss/_food.scss"></style>

