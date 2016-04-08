//var Vue = require('vue');
//var App = require('./app.vue');
//
//new Vue({
//    el: '#app',
//    components: {               //当作组件
//        app: App
//    }
//});


import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource';
//import { domain, fromNow } from './filters';
import App from './App.vue';
import home from './components/home.vue';
import pinlei from './components/pinlei.vue';
import newpreview from './components/newpreview.vue';
import shopping from './components/shopping.vue';



// install vue-resource
Vue.use(Resource);

// 不加跨域xhr会发起options请求
//Vue.http.options.headers={
//    'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
//};
// post的时候会把JSON对象转成formdata
//Vue.http.options.emulateJSON=true;

// install router
Vue.use(Router);


// register filters globally
//Vue.filter('fromNow', fromNow);
//Vue.filter('domain', domain);

// routing
var router = new Router();

router.map({
    '/':{
        component: home
        //component:require("components/home.vue")  //还可以直接使用这样的方式也是没问题的。不过会没有import集中引入那么直观
    },
    '/pinlei/': {
        component: pinlei
    },
    '/newpreview/': {
        component: newpreview
    },
    '/shopping/': {
        component: shopping
    }
    //'/news/:page': {
    //    component: NewsView
    //},
    //'/user/:id': {
    //    component: UserView
    //},
    //'/item/:id': {
    //    component: ItemView
    //}
});

//router.beforeEach(function () {
//    window.scrollTo(0, 0)
//});

router.redirect({
    '*': '/'
});

router.start(App, '#app');