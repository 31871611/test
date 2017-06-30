<template>
  <div class="vuex">
    {{msg}}
    <p>{{$store.state.user_name}}</p>
    <div @click="update()">变更</div>
    <div @click="action()">action方法</div>
    <div>{{doneTodosCount}}</div>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  name: 'vuex',
  data () {
    return {
      msg: 'vuex'
    }
  },
  created() {
    console.log('created');
  },
  mounted: function () {
    // 通过 store.state 来获取状态对象
    console.log(this.$store.state.user_name);

  },
  methods:{
    update:function(){
      // 通过 store.commit 方法触发状态变更
      // mutations中showUserName事件
      this.$store.commit('showUserName')

      // 变更count值
      this.$store.commit('increment',10)

      console.log(this.$store.state.user_name);

      // 重新读取count值
      console.log(this.$store.state.count);
    },
    action:function(){

      // Action 通过 store.dispatch 方法触发
      this.$store.dispatch('increment')

    }
  },
  computed: {
    doneTodosCount () {
      return this.$store.getters.doneTodosCount
    }
  },
  components: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
