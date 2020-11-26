import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth:{
      username :'',
      loginState:false,
      genre : null,
    },
    recommand : [],
    genre_name:[]
  },
  plugins:[
    createPersistedState()
  ],
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
    },
    ADD_LIST(state,list){
      state.recommand = list
      console.log(state.recommand)
    },
    ADD_NAME(state,name){
      state.genre_name = name
      console.log(state.genre_name)
    },
    REMOVE_LIST(state,list){
      state.recommand = list
    },
    REMOVE_NAME(state,name){
      state.genre_name = name
    }
  },
  actions: {
    login({commit},username){
      console.log('실행한다')
      commit('LOGIN',username)
    },
    updategenre({commit},genre){   
      commit('UPDATE_GENRE',genre)   
    },
    addList({commit},list){
      commit('ADD_LIST',list)
    },
    addName({commit},name){
      commit('ADD_NAME',name)
    },
    removeList({commit},list){
      commit('REMOVE_LIST',list)
    },
    removeName({commit},name){
      commit('REMOVE_NAME',name)
    }
  },
})
