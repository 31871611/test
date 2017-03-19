<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <a v-link="'/goods'">商品</a>
      </div>
      <div class="tab-item">
        <a v-link="'/ratings'">评论</a>
      </div>
      <div class="tab-item">
        <a v-link="'/seller'">商家</a>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
    <div class="content">
      content
      <div>
        <a v-link="'/a'">测试路由跳转</a>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import header from './components/header/header.vue'

const ERR_OK = 0;

export default {
  data() {
    return{
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

<style lang="scss" src="./common/scss/base.scss"></style>
<style lang="scss" src="./common/scss/app.scss"></style>
