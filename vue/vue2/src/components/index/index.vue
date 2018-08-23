<template>
  <div class="index">
    <ul>
      <li><router-link to="/tpl">跳转到tpl</router-link></li>
      <li><router-link to="/vuex">跳转到vuex</router-link></li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
//import '@/mock'
export default {
  name: 'index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted: function () {

    axios.post('/api/user', {
        firstName: 'Fred',
        lastName: 'Flintstone'
    }).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
