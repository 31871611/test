<template>
  <div class="cartcontrol">
    <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart" transition="move">
      <span class="inner icon-remove_circle_outline"></span>
    </div>

    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue';

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
    addCart:function(event){
      // 防止pc端click，触发2次。pc上无event._constructed
      if (!event._constructed) {
        return;
      }
      if (!this.food.count) {
        // 需要新增，使用set
        Vue.set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
      //this.$dispatch('cart.add', event.target);
    },
    decreaseCart:function(){
      if (!event._constructed) {
        return;
      }
      if (this.food.count) {
        this.food.count--;
      }
    }
  },
  components: {

  }

}
</script>
<style lang="scss" src="../../common/scss/_cartcontrol.scss"></style>


