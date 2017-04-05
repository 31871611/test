<template>
  <div class="login">
    {{msg}}
    <div @click="modifyparent">子组件去修改父组件</div>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  name: 'abc',
  data () {
    return {
      msg: '子组件测试'
    }
  },
  created() {
    console.log('created');
  },
  mounted: function () {

  },
  methods:{
    test:function(){
      alert('调用子组件test()');
    },
    modifyparent:function(){
      this.$emit('modify','被子组件修改'); //主动触发upup方法，'hehe'为向父组件传递的数据
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
