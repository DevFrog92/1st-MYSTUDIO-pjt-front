<template>
  <div>
    <h1>Login</h1>
    <div>
      <label for="username">아이디 : </label>
      <input type="text" id="username" v-model='credentials.username'>
    </div>
    <div>
      <label for="password">비밀번호 : </label>
      <input type="password" id='password' v-model="credentials.password" @keypress.enter='login(credentials)'>
    </div>
    <button @click="login(credentials)">Login</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name:'Login',
  data(){
    return {
      credentials :{
        username : '',
        password : ''
      }
    }
  },
  methods:{
    login({username,password}){

      axios.post('http://127.0.0.1:8000/rest-auth/login/',{username,password})
      .then(res=>{
        console.log(res.data)
        console.log(res.data.user.username)
        localStorage.setItem('jwt',res.data.token)
        this.$emit('login')
        this.$router.push({name:'App'})
        this.$store.dispatch('login',res.data.user.username)
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>