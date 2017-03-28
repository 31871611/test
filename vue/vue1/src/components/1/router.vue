<style scoped>
  h1 {
    color: #42b983;
  }
</style>

<template>
  Vue.js 跨层事件传递问题
  https://segmentfault.com/q/1010000003816641
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <p>当前路径：{{$route.path}}</p>
      <p>当前参数：{{$route.params | json}}</p>
      <p>路由名称：{{$route.name}}具名路由</p>
      <p>路由查询参数：{{$route.query | json}}</p>
      <p>路由匹配项：{{$route.matched | json}}</p>
    </div>
  </div>
  <h1>钩子函数</h1>
  <dl>
    <dt>全局钩子函数有2个</dt>
    <dd>beforeEach：在路由切换开始时调用</dd>
    <dd>afterEach：在每次路由切换成功进入激活阶段时被调用</dd>
  </dl>
  <dl>
    <dt>组件的钩子函数一共6个.</dt>
    <dd>canReuse：组件是否可以被重用</dd>
    <dd>canActivate：组件是否可以被激活</dd>
    <dd>activate：激活组件</dd>
    <dd>canDeactivate：组件是否可以被禁用</dd>
    <dd>deactivate：禁用组件</dd>
    <dd>data：可以设置组件的data</dd>
  </dl>
  <dl>
    <dt>切换对象</dt>
    <dd>transition.to表示将要切换到的路径的路由对象。</dd>
    <dd>transition.from代表当前路径的路由对象。</dd>
    <dd>transition.next()调用此函数处理切换过程的下一步。</dd>
    <dd>transition.abort([reason])调用此函数来终止或者拒绝此次切换。</dd>
    <dd>transition.redirect(path)取消当前切换并重定向到另一个路由。</dd>
  </dl>
</template>

<script>
  export default {
    data () {
      return {
        msg: 'router',
        currentPath:''
      }
    },
    route: {
      canReuse: function(transition) {
        // 决定组件是否可以被重用。
        console.log('执行组件的钩子函数:canReuse')
        return true
      },
      canActivate: function(transition) {
        console.log('执行组件的钩子函数:canActivate')
        transition.next()
      },
      activate: function(transition) {
        console.log('执行组件的钩子函数:activate')
        transition.next()
      },
      canDeactivate: function(transition) {
        console.log('执行组件的钩子函数:canDeactivate')
        transition.next()
      },
      deactivate: function(transition) {
        console.log('执行组件的钩子函数:deactivate')
        transition.next()
      },
      data: function(transition) {
        console.log('执行组件的钩子函数:data')
        transition.next()
      }
    },
    ready:function (){

    },
    methods:{

    },
    components:{

    }
  }

/*

//进入
  执行组件的钩子函数:canActivate
  执行组件的钩子函数:activate
  执行组件的钩子函数:data

//离开
  执行组件的钩子函数:canDeactivate
  执行组件的钩子函数:deactivate


*/
</script>

