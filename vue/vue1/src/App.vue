<template>
  <div>
    <router-view keep-alive></router-view>
    <div class="content">
      <ul>
        <li><a v-link="'/a?id=1&type=1'">测试路由跳转</a></li>
        <li><a v-link="'/ele/goods'">饿了吗</a></li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">


export default {
  data() {
    return{

    }
  },
  created() {
  },
  components: {
  }
}
</script>

<style lang="scss" src="./common/scss/base.scss"></style>

