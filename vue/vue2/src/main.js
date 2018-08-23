import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'


// mock数据
import '@/mock'





//Vue.config.productionTip = false



new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
