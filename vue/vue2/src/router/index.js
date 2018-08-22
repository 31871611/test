import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

// 实例化路由
const router = new Router({
  routes:[
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/tpl',
      name: 'Tpl',
      component: resolve => require(['@/components/tpl'], resolve),
      meta:{
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    }
  ]
})

// 路由跳转前的钩子
router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})
  if(to.meta.requireAuth){
    alert('需要登录');
    /*
     if (store.state.token) {  // 通过vuex state获取当前的token是否存在
       next();
     }else {
       next({
         path: '/login',
         query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由.login?redirect=url
       })
     }
     */
  }else{
    next()
  }
})

// 路由跳转后的钩子
router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
})

export default router
