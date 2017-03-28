import Vue from 'vue';
import VueRouter from 'vue-router';

import goods from './components/goods/goods.vue';
import ratings from './components/ratings/ratings.vue';
import seller from './components/seller/seller.vue';

Vue.use(VueRouter);



let router = new VueRouter({
  hashbang: true,
  history: false,//当使用 HTML5 history 模式时，服务器需要被正确配置 以防用户在直接访问链接时会遇到404页面。
  saveScrollPosition: true,
  transitionOnLoad: true,
  linkActiveClass:'active'
});

// 饿了ele
router.map({
  '/goods':{
    component: goods
  },
  '/ratings':{
    component: ratings
  },
  '/seller':{
    component: seller
  },
  '/a':{
    component: function(resolve){
      require(['./components/router/a.vue'], resolve);
    },
    subRoutes:{
      '/b': {
        component: function(resolve){
          require(['./components/router/b.vue'], resolve);
        },
        subRoutes:{
          '/c': {
            component: function(resolve){
              require(['./components/router/c.vue'], resolve);
            },
            subRoutes:{
              '/d': {
                component: function(resolve){
                  require(['./components/router/d.vue'], resolve);
                },
                subRoutes:{
                  '/e': {
                    component: function(resolve){
                      require(['./components/router/e.vue'], resolve);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },

  /*
   '/aa':{   =/aa
   component: function(resolve){
   require(['./components/router/a.vue'], resolve);
   },
   subRoutes:{
   '/':{   =/aa
   name:'aa.b',  //好像没什么用，没明白有什么意义
   component: function(resolve){
   require(['./components/router/b.vue'], resolve);
   }
   },
   '/c':{  =/aa/c
   name:'aa.c',  //好像没什么用，没明白有什么意义
   component: function(resolve){
   require(['./components/router/c.vue'], resolve);
   }
   }
   }
   }
   */

  //'/article/:type':{
  //  name: 'article',
  //  component: article,
  //  subRoutes:{
  //    '/:id': {
  //      component: articleContent
  //    }
  //  }
  //}
});

//router.redirect({
//  '*': '/home'
//});

//router.beforeEach(function () {
//    window.scrollTo(0, 0)
//});

//注册路由切换前
router.beforeEach(function (transition) {
  transition.next();
});


//注册路由切换后
router.afterEach(function (transition) {
  //console.log('成功浏览到: ' + transition.to.path)
});


export default router;
