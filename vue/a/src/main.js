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
//import { domain, fromNow } from './filters';
import App from './App.vue';
import home from './components/home.vue';
import pinlei from './components/pinlei.vue';
import newpreview from './components/newpreview.vue';
import shopping from './components/shopping.vue';

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