<template>
  <v-header :seller="seller"></v-header>
  <div class="tab">
    <div class="tab-item">
      <a v-link="'/ele/goods'">商品</a>
    </div>
    <div class="tab-item">
      <a v-link="'/ele/ratings'">评论</a>
    </div>
    <div class="tab-item">
      <a v-link="'/ele/seller'">商家</a>
    </div>
  </div>
  <router-view :seller="seller" keep-alive></router-view>
</template>

<script type="text/ecmascript-6">
import header from '../header/header.vue'

const ERR_OK = 0;

export default {
  data () {
    return {
      seller:{}
    }
  },
  created() {
    this.$http.get('/api/seller').then(function(response){
      //console.log(response);
      var res = response.data;
      if(res.error === ERR_OK){
        this.seller = res.data;
      }
    },function(){

    })
  },
  components: {
    'v-header':header
  }
}
</script>
<style lang="scss" src="../../common/scss/app.scss"></style>

