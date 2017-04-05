import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import login from '@/components/login/login'
import user from '@/components/user/user'

Vue.use(Router)

const router = new Router({
  linkActiveClass:'select',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/user',
      component: resolve => require(['@/components/user/user'], resolve),
      meta:{
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      }
    }
  ]
})


router.beforeEach((to, from, next) => {
  //console.log(to);
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


export default router;
