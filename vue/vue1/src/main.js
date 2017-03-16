import Vue from 'vue';
import VueRouter from 'vue-router';
import VueTouch from 'vue-touch';
import VueResource from 'vue-resource';
import App from './App';
import goods from './components/goods/goods.vue';
import ratings from './components/ratings/ratings.vue';
import seller from './components/seller/seller.vue';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueTouch);

// 不加跨域xhr会发起options请求
// Vue.http.options.headers={
//    'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
// };

// post的时候会把JSON对象转成formdata
Vue.http.options.emulateJSON=true;

let app = Vue.extend(App);

let router = new VueRouter({
  hashbang: true,
  history: false,//当使用 HTML5 history 模式时，服务器需要被正确配置 以防用户在直接访问链接时会遇到404页面。
  saveScrollPosition: true,
  transitionOnLoad: true,
  linkActiveClass:'active'
});

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
  }


  //'/article/:type':{
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

router.start(app, '#app');


