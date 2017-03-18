<style>

</style>

<template>
<h1 transition="SlideRightLeft" class="fullPosition">
  {{msg}}
  <a v-link="'/goods'">回首页</a>
</h1>
  <router-view></router-view>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      msg: 'e'
    }
  },
  ready: function () {

  },
  methods: {

  },
  components: {

  }

}
</script>


