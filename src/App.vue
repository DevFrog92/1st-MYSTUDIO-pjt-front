<template>
  <div id="app" >
    <div v-if="login">
      <b-navbar toggleable type="dark" style="background-color:black;" id="nav" >
        <b-navbar-brand href="#" to='/movielist' id="nav-head" >
        <div>
          <img src="http://127.0.0.1:8000/api/logo/logo.png" alt="logo" style="float:left;" width="20%">
          <!-- <b-img src="http://127.0.0.1:8000/api/logo/logo.png" style="float:left;" width="20%"></b-img> -->
          </div>
          </b-navbar-brand>
          <b-navbar-nav class="ml-auto mr-4">
            
          <span v-if="login">
          <b-row>
            <b-nav-item style="margin:0 5px;" to="/movielist">MOVIELIST</b-nav-item>
            <b-nav-item style="margin:0 5px;" to="/community">COMMUNITY</b-nav-item>
            <b-nav-item style="margin:0 5px;" to="/profile">MY PAGE</b-nav-item>
            <b-nav-item style="margin:0 5px; f" @click="logout">LOGOUT</b-nav-item>
          </b-row>
        </span>
          </b-navbar-nav>
  </b-navbar>
      </div>      
      <router-view @login='login=true'/>  
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  components: {
  },
  data(){
    return {
      login:this.$store.state.auth.loginstate
    }
  },
  methods:{
    logout(){
      localStorage.removeItem('jwt')
      this.login = !this.login
      axios.post('http://127.0.0.1:8000/rest-auth/logout/')
      .then(()=>{
        this.$store.dispatch('removeList',[])
        this.$store.dispatch('removeName',[])
       this.$router.push({name:'Login'})
      })
    }
  },
  computed:{
    loginstate (){
      console.log(this.$store.state.loginState)
      return this.$store.state.loginState
    }
  },
  created(){
    const token = localStorage.getItem('jwt')
    if(token){
      console.log('token state')
      this.login=true
      // this.$router.push({name:'MovieList'})
    }else{
      this.$router.push({name:'Login'})
    }
  }
};
</script>

<style>

#app {
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


#nav-head {
  font-weight: bold;
  color: white;
  height: 50px;
  font-size: 30px;
}



#nav a.router-link-exact-active {
  color: #6A16CD;
}

</style>
