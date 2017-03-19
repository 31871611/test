<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>


    <div class="ball-container">
      <div class="ball">
        <div class="inner inner-hook"></div>
      </div>
    </div>

  </div>

</template>

<script type="text/ecmascript-6">
export default {
  props:{
    selectFoods: {
      type: Array,
      default() {
        return [
          {
            price: 10,
            count: 1
          }
        ];
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {

    }
  },
  ready: function () {

  },
  computed:{
    totalPrice() {
      let total = 0;
      // this.selectFoods=点击+号的商品信息
      this.selectFoods.forEach((food) => {
        total += food.price * food.count;
      });
      return total;
    },
    totalCount() {
      let count = 0;
      this.selectFoods.forEach((food) => {
        count += food.count;
      });
      return count;
    },
    payDesc() {
      if (this.totalPrice === 0) {
        // 反引号``
        return `￥${this.minPrice}元起送`;
      } else if (this.totalPrice < this.minPrice) {
        // 配送价 - 总价 = 还差多少起送
        let diff = this.minPrice - this.totalPrice;
        return `还差￥${diff}元起送`;
      } else {
        return '去结算';
      }
    },
    payClass() {
      // 总价大于最小配送价20
      if (this.totalPrice < this.minPrice) {
        return 'not-enough';
      } else {
        return 'enough';
      }
    }
  },
  methods: {
    toggleList:function(){

    },
    hideList:function(){

    }
  },
  components: {

  }

}
</script>
<style lang="scss" src="../../common/scss/_shopcart.scss"></style>


