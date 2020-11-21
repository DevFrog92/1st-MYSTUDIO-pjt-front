<template>
  <div>
    <h1>서비스를 이용하려면 로그인 하세요</h1>
    <Login 
    @login="login"
    />
  </div>
</template>

<script>
import Login from '@/views/accounts/Login'
export default {
  name : "Home",
  components:{
    Login
  },
  methods:{
    login(){
      console.log('login')
        this.$emit('login')
    }
  },
  computed:{
    getLoginState(){
      console.log('Home',this.$store.state.auth.loginState)
      return this.$store.state.auth.loginState
    },
  }
}
</script>

<style>

</style>