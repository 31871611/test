import Vue from 'vue'
import Router from 'vue-router'
import VueTouch from 'vue-touch'
import Resource from 'vue-resource'
import App from './App'
import Index from './components/index'


// install vue-resource
Vue.use(Resource);
Vue.use(VueTouch);

// 不加跨域xhr会发起options请求
// Vue.http.options.headers={
//    'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
// };

// post的时候会把JSON对象转成formdata
Vue.http.options.emulateJSON=true;


// install router
Vue.use(Router);


// routing
var router = new Router({
  hashbang: true,
  history: false,//当使用 HTML5 history 模式时，服务器需要被正确配置 以防用户在直接访问链接时会遇到404页面。
  saveScrollPosition: true,
  transitionOnLoad: true
});

router.map({
  '/index':{
    component: Index
  },
  '/hello':{
    component: function(resolve){
      require(['./components/Hello.vue'], resolve);
    }
  },
  '/router/:id':{
    component: function(resolve){
      require(['./components/router.vue'], resolve);
    }
  },
  '/test':{
    component: function(resolve){
      require(['./components/test.vue'], resolve);
    }
  },
  '/photoswipe':{
    component: function(resolve){
      require(['./components/photoswipe/photoswipe.vue'], resolve);
    }
  },
  '/larea':{
    component: function(resolve){
      require(['./components/larea/larea.vue'], resolve);
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

router.redirect({
  '*': '/index'
});

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


router.start(App, '#app');
