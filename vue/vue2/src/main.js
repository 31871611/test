import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
// mock数据
import '@/mock'



Vue.use(Mint);

//Vue.config.productionTip = false



new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
