<template>
  <div>
    <h1>Signup</h1>
    <div>
      <label for="username"> 아이디 :  </label>
    <input type="text" id='username' v-model="credentials.username">
      </div>
    <div><label for="password1">비밀번호 : </label><input type="password" id="password1" v-model="credentials.password1"></div>
    <div><label for="password2">비밀번호 확인 : </label><input type="password" v-model="credentials.password2" @keypress.enter='signup(credentials)'></div>
    <button @click="signup(credentials)">회원가입</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'Signup',
  data(){
    return {
      credentials:{
        username :'',
        password1 : '',
        password2:''
      }
    }
  },
  methods:{
    signup({username,password1,password2}){
      const userData = {
        username,
        password1,
        password2
      }
      console.log(userData)
      if (password1 === password2){
        axios.post('http://127.0.0.1:8000/rest-auth/registration/',userData)
        .then(()=>{
          this.$router.push({name:'Login'})
        })
      }else{
        alert('작성된 비밀번호가 다릅니다.')
      }
    }
  },
  created(){
    const token = localStorage.getItem('jwt')
    if (token){
       alert('로그인한 회원은 접근할 수 있습니다.')
      this.$router.push({name:'Home'})
    }
  }
  
}
</script>

<style>

</style>