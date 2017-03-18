<template>
<div class="star" :class="starType">
  <span class="star-item" v-for="itemClass in itemClasses" :class="itemClass" track-by="$index"></span>
</div>
</template>

<script type="text/ecmascript-6">
const LENGTH = 5;
const CLS_ON = 'on';        // 全星
const CLS_HALF = 'half';    // 半星
const CLS_OFF = 'off';      // 无星

export default {
  props:{
    size:{
      type:Number
    },
    score:{
      type:Number
    }
  },
  data () {
    return {
      msg: 'star'
    }
  },
  ready: function () {

  },
  methods: {

  },
  components: {

  },
  // 计算属性
  computed: {
    starType(){
      return 'star-' + this.size;
    },
    itemClasses(){
      let result = [];
      // 防止小于。0.4 * 2 = 0.8 = 1 / 2 = 0.5
      let score = Math.floor(this.score * 2) / 2;
      // 有小数不能带除，会余下.以后小数
      let hasDecimal = score % 1 !== 0;
      let integer = Math.floor(score);
      for (let i = 0; i < integer; i++) {
        // 添加全星
        result.push(CLS_ON);
      }
      if (hasDecimal) {
        // 添加半星
        result.push(CLS_HALF);
      }
      // push后长度
      while (result.length < LENGTH) {
        result.push(CLS_OFF);
      }
      return result;
    }
  }
}
</script>
<style lang="scss" src="../../common/scss/_star.scss"></style>


