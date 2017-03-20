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
        <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
        <div class="rating-wrapper">
          <ul v-show="food.ratings && food.ratings.length">
            <li v-show="needShow(rating.rateType,rating.text)" class="rating-item" v-for="rating in food.ratings">
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
import ratingselect from 'components/ratingselect/ratingselect';

const ALL = 2

export default {
  props:{
    food:{
      type:Object
    }
  },
  data () {
    return {
      showFlag:false,
      selectType:ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  ready: function () {

  },
  created() {

  },
  methods: {
    show() {
      this.showFlag = true;
      // 页面调用时初始化数值
      this.selectType = ALL;
      this.onlyContent = true;
      //页面调用时初始化数值.end
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
    },
    needShow(type, text) {
      // 有评论内容
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      } else {
        return type === this.selectType;
      }
    }
  },
  components: {
    cartcontrol,
    split,
    ratingselect
  },
  events: {
    'ratingtype.select'(type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    'content.toggle'(onlyContent) {
      this.onlyContent = onlyContent;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    }
  }
}
</script>
<style lang="scss" src="../../common/scss/_food.scss"></style>

