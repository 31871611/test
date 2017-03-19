<template>
  <div class="goods">
    <div class="menu-wrapper" v-el:menu-wrapper>
      <ul>
        <li class="menu-item" v-for="item in goods"  :class="{'current':currentIndex===$index}" @click="selectMenu($index,$event)">
          <span class="text">
            <span v-show="item.type>0" :class="classMap[item.type]" class="icon"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>

    <div class="foods-wrapper" v-el:foods-wrapper>
      <ul>
        <!-- -hook钩子给js使用 -->
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
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart v-ref:shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
  </div>
  <!--<food :food="selectedFood" v-ref:food></food>-->
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import shopcart from '../shopcart/shopcart.vue';
import cartcontrol from '../cartcontrol/cartcontrol.vue';

const ERR_OK = 0;

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      classMap:[],
      listHeight:[],
      scrollY:0
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

        // 异步后才运行，nextTick方法更新dom
        this.$nextTick(function(){
          this._initScroll();
          // 计算右边列表分类高度
          this._calculateHeight();
        });
      }
    })
  },
  methods: {
    selectMenu:function(index,event){
      // 防止pc端click，触发2次。pc上无event._constructed
      if (!event._constructed) {
        return;
      }
      let foodList = this.$els.foodsWrapper.getElementsByClassName('food-list-hook');
      // 元素数组
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el, 300);
    },
    selectFood:function(food,event){
      console.log(food);
    },
    _drop(target) {
      // 体验优化,异步执行下落动画
      this.$nextTick(() => {
        // 需要在使用的组件上添加v-ref才能调用子组件方法
        // 把dom节点分发到，shopcart组件中的drop方法
        this.$refs.shopcart.drop(target);
      });
    },
    _initScroll() {
      // 对应v-el:menu-wrapper
      this.meunScroll = new BScroll(this.$els.menuWrapper,{
        click:true
      });

      // 右边列表
      this.foodsScroll = new BScroll(this.$els.foodsWrapper,{
        click:true,
        probeType: 3
      });

      // 获取右边列表滚动Y值
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });

    },
    _calculateHeight() {
      // 得到每个分类的节点.返回数组节点
      let foodList = this.$els.foodsWrapper.getElementsByClassName('food-list-hook');
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        // 每个节点的高度.进行累加得到下一个节点高度
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    }
  },
  computed:{
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        // 数值
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        // 大于第一个 && 小于第二个 = 区间
        // 最后一个数组+1，height2为空
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      let foods = [];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          // 点击+号后，生成food.count数量
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  components: {
    shopcart,
    cartcontrol
  },
  events:{
    // 接收子组件事件.参数节点dom元素
    'cart.add'(target) {
      this._drop(target);
    }
  }
}
</script>
<style lang="scss" src="../../common/scss/_goods.scss"></style>
