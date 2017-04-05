<template>
  <div class="user">
    <h1 :title="msg">{{ msg }}</h1>
    <div @click="ck()">click</div>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  name: 'user',
  data () {
    return {
      msg: 'user'
    }
  },
  created() {
    console.log('created');


  },
  methods:{
    ck() {
      alert(1);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
