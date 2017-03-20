<template>
<div class="ratingselect">
  <div class="rating-type">
    <span v-touch:tap="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
    <span v-touch:tap="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
    <span v-touch:tap="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
  </div>
  <div class="switch" v-touch:tap="toggleContent" :class="{'on':onlyContent}">
    <span class="icon-check_circle"></span>
    <span class="text">只看有内容的评价</span>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
const POSITIVE = 0;   // 满意评论
const NEGATIVE = 1;   // 不满意评论
const ALL = 2;        // 全部评论

export default {
  props:{
    ratings:{
      type:Array,
      default() {
        return [];
      }
    },
    selectType:{
      type:Number,
      default:ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        };
      }
    }
  },
  data () {
    return {
      msg: 'ratingselect'
    }
  },
  ready: function () {

  },
  computed: {
    positives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE;
      });
    },
    negatives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE;
      });
    }
  },
  methods: {
    select(type,event) {
      this.selectType = type;
      // type值以ratingtype.select事件传入.父组件
      this.$dispatch('ratingtype.select', type);
    },
    toggleContent() {
      this.onlyContent = !this.onlyContent;
      // this.onlyContent值以content.toggle事件传入.父组件
      this.$dispatch('content.toggle', this.onlyContent);
    }
  },
  components: {

  }

}
</script>
<style lang="scss" src="../../common/scss/_ratingselect.scss"></style>
