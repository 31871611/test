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
    }
  ]
})

// 路由跳转前的钩子
router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})
  next()
})

// 路由跳转后的钩子
router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
})

export default router
