<template>
  <div>
    Profile
    <button @click="getProfile">Profile</button>
    <button @click="readProfile">Profile</button>
    <hr>
    <p @click="edit(profile)">{{profile}}</p>
    <p>{{genre}}</p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'Profile',
  data(){
    return {
      profile:null,
      genre : null,
    }
  },
  methods:{
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
    getProfile(){
      const config = this.setToken()
      axios.get('http://127.0.0.1:8000/community/profile/',config)
      .then(res=>{
        console.log(res)
      })

    },
    readProfile(){
      const config = this.setToken()
      axios.post('http://127.0.0.1:8000/community/profile/',{},config)
      .then(res=>{
        console.log(res)
        this.profile = res.data
        this.genre = res.data.genre
      })
    },
    edit(profile){
      this.$router.push({name:'UpdateProfile',params:{profile}})
    }
    
  }
}
</script>

<style>

</style>