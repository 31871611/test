import Vue from 'vue'
import axios from 'axios';
//import router from '../router'
import qs from 'qs';
//import store from '../store'
import { Toast } from 'vant';

Vue.use(Toast);


axios.defaults.baseURL = "";
axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8;';


// 请求拦截器
axios.interceptors.request.use(config=>{

  //const token = store.state.token || window.localStorage.getItem("token");
  const token = window.localStorage.getItem("token");
  if(token){
    config.headers.accessToken = token
  }

  // todo:加载动画
  console.log('加载动画...')
  Toast.loading({
    message: '加载中...',
    forbidClick: true
  });

  config.data = qs.stringify(config.data);
  return config;
},error=>{
  // 对响应错误做点什么
  //return Promise.error(error)
  return Promise.reject(error);
});


// 响应拦截器
axios.interceptors.response.use(response => {
  // todo:停止动画
  console.log('停止动画...')
  Toast.clear();

  const res = response.data;
  console.log("response:")
  console.log(res)
  if(res.code === 0){
    return Promise.resolve(res)
  }else{
    return Promise.reject('error')
  }

},error=>{
  console.log('err：')
  console.log(error)
  return Promise.reject(error)
});


export default axios
