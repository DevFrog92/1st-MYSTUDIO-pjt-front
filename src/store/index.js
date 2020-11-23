import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth:{
      username :'',
      loginState:false,
      genre : null,
    }
  },
  mutations: {
    LOGIN(state,username){
      console.log('변경한다')
      state.auth.username = username
      state.auth.loginState =false
      console.log(state.auth)
    },
    UPDATE_GENRE(state,genre){
      state.auth.genre = genre
      console.log('변환한다',state.auth.genre)

    }
  },
  actions: {
    login({commit},username){
      console.log('실행한다')
      commit('LOGIN',username)
    },
    updategenre({commit},genre){   
      commit('UPDATE_GENRE',genre)   
    }
  },
})
