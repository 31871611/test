import Vue from 'vue'
import Vuex from 'vuex'
import goodsType from './modules/goodsType'
import cart from './modules/cart'
import goods from './modules/goods'
import user from './modules/user/index'
import createLogger from '../plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    goodsType,
    cart,
    goods,
    user
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
