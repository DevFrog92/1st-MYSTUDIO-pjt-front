<template>
  <div id="app" >
    <!-- <b-navbar toggleable type="dark" variant="#636e72" id="nav"> -->
    <b-navbar toggleable type="dark" style="background-color:#2d3436;" id="nav">
        <b-navbar-brand href="#" to='/movielist' id="nav-head">MY STUDIO</b-navbar-brand>

        <b-navbar-toggle target="navbar-toggle-collapse">
          <template #default="{ expanded }">
            <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
            <b-icon v-else icon="chevron-bar-down"></b-icon>
          </template>
        </b-navbar-toggle>

        <b-collapse id="navbar-toggle-collapse" is-nav>
          <b-navbar-nav class="ml-auto container">
          <span v-if="login">
          <b-row>
            <b-col cols='4'>
            <b-nav-item to="/movielist">MovieList</b-nav-item>
            </b-col>
            <b-col cols='4'>
            <b-nav-item to="/community">Community</b-nav-item>
            </b-col>
            <b-col cols='4'>
            <b-nav-item to="/profile">Profile</b-nav-item>
            </b-col>
            <b-col cols='4'>
            <b-nav-item to="/map">RoadMap</b-nav-item>
            </b-col>
            <b-col cols='4'>
            <b-nav-item to="/movierecommaned">MovieRecommaned</b-nav-item>
            </b-col>
            <b-col cols='4'>
            <b-nav-item @click="logout">logout</b-nav-item>
            </b-col>
          </b-row>
        </span>
        <span v-else>
            <b-row>
            <b-nav-item to="/signup">Signup</b-nav-item>
            </b-row>
      </span>
          </b-navbar-nav>
      </b-collapse>
  </b-navbar>
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
    }else{
      this.$router.push({name:'Login'})
    }
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

#nav-head {
  font-weight: bold;
  color: white;
  height: 50px;
  font-size: 30px;
}

#navbar-toggle-collapse{
  font-weight: bold;
  color: white;
  font-size: 20px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
