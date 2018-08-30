<template>
  <div class="index">
    <ul>
      <li><router-link to="/tpl">跳转到tpl</router-link></li>
      <li><router-link to="/vuex">跳转到vuex</router-link></li>
    </ul>
    <div @click="getPhpIndex">点击getPhpIndex</div>
    <div @click="getUser">点击getUser</div>
  </div>
</template>

<script type="text/ecmascript-6">
import {user, phpIndex} from '../../api/api';
//import '@/mock'
export default {
  name: 'index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted: function () {

    //this.getUser();

  },
  methods: {
    getPhpIndex(){
      let para = {
        class_id:123,
        firstName: 'Fred',
        lastName: 'Flintstone'
      }
      phpIndex(para).then((res) => {
        console.log(res);
        if (res.code === -1) {

        }else{

        }
      })
    },
    getUser(){
      let para = {class_id:123}
      user(para).then((res) => {
        console.log(res);
        if (res.code === -1) {

        }else{

        }
      })
    }
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
