<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li class="menu-item" v-for="item in goods" v-touch:tap="selectMenu($index,$event)">
          <span class="text">
            <span v-show="item.type>0" :class="classMap[item.type]" class="icon"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <!--<cartcontrol :food="food"></cartcontrol>-->
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!--<shopcart v-ref:shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>-->
  </div>
  <!--<food :food="selectedFood" v-ref:food></food>-->
</template>

<script type="text/ecmascript-6">
const ERR_OK = 0;

export default {
  data () {
    return {
      goods: [],
      classMap:[]
    }
  },
  ready: function () {

  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

    this.$http.get('/api/goods',{}).then(function(response){
      var res = response.data;
      if(res.error === ERR_OK){
        this.goods = res.data;
      }
    })
  },
  methods: {
    selectMenu:function(index,event){
      console.log(index);
    },
    selectFood:function(food,event){
      console.log(food);
    }
  },
  computed:{

  },
  components: {}
}
</script>
<style lang="scss" src="../../common/scss/_goods.scss"></style>
