<style lang="scss" scoped>
  ul{
    margin:30px;
    a{
      &.select{
         background:#f00;
       }
    }
  }
</style>

<template>
  <ul>
    <li><a v-link="'/index'">index</a></li>
    <li><a v-link="{path:'/hello',activeClass:'select'}">hello</a></li>
    <li v-touch:tap="phoneCall()">手机拨打110</li>
    <li><a v-link="'/router/02?favorite=yes'">路由说明</a></li>
    <li><a v-link="'/test'">测试</a></li>
    <li><a v-link="'/photoswipe'">图片</a></li>
  </ul>
  <router-view></router-view>
</template>

<script type="text/ecmascript-6">
require('assets/scss/comm/_reset.scss');
require('assets/scss/comm/_layout.scss');

export default{
  data(){
    return {

    }
  },
  ready:function(){
    /*
    this.scrollTop=event.target.scrollTop;
    if(this.scrollTop > this.adHeight){
      this.isScrollRtrieval=false;
    }else{
      this.isScrollRtrieval=true;
    }
    */
  },
  methods:{
    phoneCall:function(){
      window.location.href = 'tel://110'
    }
  },
  components:{

  }
}

</script>
