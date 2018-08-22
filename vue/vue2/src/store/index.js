import Vue from 'vue'
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'

Vue.use(Vuex);


export default new Vuex.Store({
  // 共享状态state
  state:{
    isLoading: false,
    count: 1,
    user_name:"store用户名",
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  // 可以认为是 store 的计算属性
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    }
  },
  // 改变状态的方法
  mutations:{
    // 控制loading显示隐藏
    updateLoadingStatus(state, payload) {
      state.isLoading = payload.isLoading
    },
    increment (state,n) {
      // 变更状态
      state.count += n
    },
    showUserName(state){
      alert(state.user_name);
    },
    // 读取mutation-types.js中值
    [SOME_MUTATION](){

    }
  },
  // Action 类似于 mutation，不同在于：
  // Action 提交的是 mutation，而不是直接变更状态。
  // Action 可以包含任意异步操作。
  // mutation 必须同步执行这个限制么？Action 就不受约束！
  actions: {
    increment (context) {
      context.commit('increment',2)
    }
  }
})
