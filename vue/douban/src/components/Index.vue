<style scoped>
  h1 {
    color: #42b983;
  }
</style>

<template>

    <div class="hello">
      <h1>{{ msg }}</h1>
    </div>

</template>

<script>
export default {
  data () {
    return {
      msg: 'index'
    }
  },
  ready:function (){

    this.$http.jsonp('https://api.douban.com/v2/movie/top250?count=10', {}, {
      headers: {
      },
      emulateJSON: true
    }).then(function(response) {
      console.log(response.data);
    }, function(response) {
      console.log(response)
    });

  },
  methods:{

  },
  components:{

  }
}
</script>




