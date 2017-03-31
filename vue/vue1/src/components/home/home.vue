<template>
  <div class="wrap">
    <header>header</header>
    <article class="main">
      <div class="mainScroll">
        <ul>
          <li><a v-link="'/a?id=1&type=1'">测试路由跳转</a></li>
          <li><a v-link="'/ele/goods'">饿了吗</a></li>
        </ul>
      </div>
    </article>
    <footer>footer</footer>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
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


