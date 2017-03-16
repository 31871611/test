<style>

</style>

<template>
<h1 transition="SlideRightLeft" class="fullPosition">
  {{msg}}
  <a v-link="'/a/b'">跳转</a>
</h1>
<router-view></router-view>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      msg: 'a'
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


