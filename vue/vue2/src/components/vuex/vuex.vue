<template>
  <div class="vuex">
    {{msg}}
    <p>{{$store.state.user_name}}</p>
    <div @click="update">变更</div>
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
      this.$store.commit('showUserName')

      console.log(this.$store.state.user_name);
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
