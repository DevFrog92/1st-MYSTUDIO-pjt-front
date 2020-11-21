import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth:{
      username :'',
      loginState:false
    }
  },
  mutations: {
    LOGIN(state,username){
      console.log('변경한다')
      state.auth.username = username
      state.auth.loginState =false
      console.log(state.auth)
    }
  },
  actions: {
    login({commit},username){
      console.log('실행한다')
      commit('LOGIN',username)
    }
  },
  modules: {
  }
})
