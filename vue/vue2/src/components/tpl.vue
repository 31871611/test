<template>
  <div class="tpl">
    {{msg}}
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'tpl',
  data () {
    return {
      msg: 'tpl'
    }
  },
  beforeCreate: function () { // 组件实例被创建，组件属性计算之前，如data属性等

  },
  created: function () {  // 组件实例创建完成，属性已绑定，但DOM还未生成，$el属性还不存在

  },
  beforeMount: function () {  // 模板编译/挂载之前

  },
  mounted: function () {  // 模板编译/挂载之后（不保证组件已在document中）

  },
  beforeUpdate: function () { // 组件更新之前

  },
  updated: function () { // 组件更新之后

  },
  beforeDestroy: function () { // 组件销毁前调用

  },
  destroyed: function () { // 组件销毁后调用

  }
}
</script>
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
