import Vue from 'vue';
//import VueRouter from 'vue-router';
import router from './router'
import VueTouch from 'vue-touch';
import VueResource from 'vue-resource';
import App from './App';


Vue.use(VueResource);
Vue.use(VueTouch);

// 不加跨域xhr会发起options请求
// Vue.http.options.headers={
//    'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
// };

// post的时候会把JSON对象转成formdata
Vue.http.options.emulateJSON=true;

let app = Vue.extend(App);

//原路由信息

router.start(app, '#app');


