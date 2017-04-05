<template>
  <div class="login">
    <h1 :title="msg">{{ msg }}</h1>
    <div ref="item">ref</div>
    <div @click="child">调用子组件test()</div>
    <abc ref="abc" @modify="changeparent"></abc>
  </div>
</template>

<script type="text/ecmascript-6">
import abc from './child.vue';

export default {
  name: 'login',
  data () {
    return {
      msg: 'login'
    }
  },
  created() {
    console.log('created');
  },
  mounted: function () {
    console.log(this.$refs.item);

  },
  methods:{
    // 调用子组件
    child() {
      this.$refs.abc.test();
    },
    // 子组件修改父组件
    changeparent(txt) {
      this.msg = txt;
    }
  },
  components: {
    abc
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
