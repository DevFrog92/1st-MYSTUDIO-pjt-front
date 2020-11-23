<template>
  <div id="app">
    <div id="nav">
      <span v-if="login">
        <router-link to="/movielist">MovieList</router-link> |
        <router-link to="/community">Community</router-link> |
        <router-link to="/map">LoadMap</router-link> |
        <router-link to="/profile">Profile</router-link> |
        <router-link to="/movierecommaned">MovieRecommaned</router-link> |
        <router-link @click.native="logout" to="#">Logout</router-link> |
       <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item to="/movielist">MovieList</b-dropdown-item>
          <b-dropdown-item to="/community">Community</b-dropdown-item>
          <b-dropdown-item to="/map">LoadMap</b-dropdown-item>
          <b-dropdown-item to="/profile">Profile</b-dropdown-item>
          <b-dropdown-item to="/movierecommaned">MovieRecommaned</b-dropdown-item>
          <b-dropdown-item @click.native="logout" to="#">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </span>
      <span v-else>
        <router-link to="/home"></router-link>
      </span>
      <div class="container">
      <router-view @login='login=true'/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import MovieList from '@/views/movie/MovieList'
// import Home from '@/views/Home'
export default {
  name: 'App',
  components: {
    // MovieList,
    // Home
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
    }
    console.log(this.login)
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
