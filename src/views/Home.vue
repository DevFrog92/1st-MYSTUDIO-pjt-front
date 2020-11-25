<template>
  <div  :style="{'background-image':`url(http://127.0.0.1:8000/api/%ED%8F%AC%EC%8A%A4%ED%84%B0%EC%99%84%EC%84%B12.png)`}">
    <h1>서비스를 이용하려면 로그인 하세요</h1>
    <div style="margin:400px auto;">

    <Login 
    @login="login"
    />
    </div>
  </div>
</template>

<script>
import Login from '@/views/accounts/Login'
import axios from 'axios'
export default {
  name : "Home",
  components:{
    Login
  },
  methods:{
    login(){
      console.log('login')
        this.$emit('login')
    },
    setToken(){
      const token = localStorage.getItem('jwt')
      const config = {
        headers: {
          Authorization:`JWT ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      }
      return config
    },
    getBackImg(){
      const config = this.setToken()
      axios.get('http://127.0.0.1:8000/api/%ED%8F%AC%EC%8A%A4%ED%84%B0%EC%99%84%EC%84%B12.png',config)
      .then(res=>{
        console.log(res,'성공')
      })
    }
  },
  computed:{
    getLoginState(){
      console.log('Home',this.$store.state.auth.loginState)
      return this.$store.state.auth.loginState
    },
  },
  created(){
    const token = localStorage.getItem('jwt')
    if (token){
      alert('로그인한 회원은 접근할 수 없습니다. 무비이동')
      this.$router.push({name:'MovieList'})
    }else{
      this.getBackImg()
    }
  }
}
</script>

<style>

</style>