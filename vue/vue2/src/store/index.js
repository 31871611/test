import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


export default new Vuex.Store({
  // 共享状态state
  state:{
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
    showUserName(state){
      alert(state.user_name);
    }
  }
})
