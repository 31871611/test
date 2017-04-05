<template>
  <div class="login">
    <h1 :title="msg">{{ msg }}</h1>
  </div>
</template>

<script type="text/ecmascript-6">

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
  methods:{
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
