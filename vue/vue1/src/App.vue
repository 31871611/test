<template>
  <div>
    <v-header></v-header>
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
    <router-view></router-view>
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

export default {
  components: {
    'v-header':header
  }
}
</script>

<style lang="scss" src="./common/scss/base.scss"></style>
<style>
.tab{
  display:flex;
  height:40px;
  line-height:40px;
  /*border-bottom: 1px solid rgba(7,17,27,.1);*/
  position: relative;
}
/* 1像素 */
.tab:after{
  content: '\20';
  display: block;
  position: absolute;
  left:0;
  bottom:0;
  width: 100%;
  border-bottom: 1px solid rgba(7,17,27,.1);
}
.tab .tab-item{
  flex: 1;
  text-align: center;
}
.tab .tab-item a{
  display: block;
  font-size:14px;
  color:rgb(77,85,93);
}
.tab .tab-item a.active{
  color:#f01414;
}
</style>
