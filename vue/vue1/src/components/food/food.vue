<template>
  <div class="food" v-show="showFlag" transition="move" v-el:food>
    <div class="food-content">
      <div class="image-header">
        <img :src="food.image">
        <div class="back" v-touch:tap="hide">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售{{food.sellCount}}份</span>
          <span class="rating">好评率{{food.rating}}%</span>
        </div>
        <div class="price">
          <span class="now">￥{{food.price}}</span>
          <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
        </div>
        <div class="cartcontrol-wrapper">
          <cartcontrol :food="food"></cartcontrol>
        </div>
        <div v-touch:tap="addFirst" class="buy" v-show="!food.count || food.count===0" transition="fade">加入购物车</div>
      </div>

      <split v-show="food.info"></split>

      <div class="info" v-show="food.info">
        <h1 class="title">商品信息</h1>
        <p class="text">{{food.info}}</p>
      </div>

      <split></split>

      <div class="rating">
        <h1 class="title">商品评价</h1>
        <!--<ratingselect></ratingselect>-->
        <div class="rating-wrapper">
          <ul v-show="food.ratings && food.ratings.length">
            <li class="rating-item" v-for="rating in food.ratings">
              <div class="user">
                <span>{{rating.username}}</span>
                <img class="avatar" width="12" height="12" :src="rating.avatar">
              </div>
              <div class="time">{{rating.rateTime}}</div>
              <div class="text">
                <p>
                  <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                </p>
              </div>
            </li>
          </ul>
          <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue';
import BScroll from 'better-scroll';
import cartcontrol from 'components/cartcontrol/cartcontrol';
import split from 'components/split/split';

export default {
  props:{
    food:{
      type:Object
    }
  },
  data () {
    return {
      showFlag:false
    }
  },
  ready: function () {

  },
  created() {

  },
  methods: {
    show() {
      this.showFlag = true;

      this.$nextTick(() =>{
        if(!this.scroll){
          // 对应v-el:menu-wrapper
          this.scroll = new BScroll(this.$els.food,{
            click:true
          });
        }else{
          this.scroll.refresh();
        }
      })
    },
    hide() {
      this.showFlag = false;
    },
    addFirst() {
      // 向父组件传递cart.add事件，
      // event.target对象以cart.add事件传入.父组件
      this.$dispatch('cart.add', event.target);
      Vue.set(this.food, 'count', 1);
    }
  },
  components: {
    cartcontrol,
    split
  }

}
</script>
<style lang="scss" src="../../common/scss/_food.scss"></style>

