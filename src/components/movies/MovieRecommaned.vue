<template>
  <div>
    <h1>영화를 추천해주지</h1>
    <p>{{genre}}</p>
    <button @click="recommendMovie">GET</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name : 'MovieRecommaned',
  data (){
    return {
      genre : null
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
    readProfile(){
      const config = this.setToken()
      axios.post('http://127.0.0.1:8000/community/profile/',{},config)
      .then(res=>{
        console.log(res)
        this.genre = res.data.genre
        const genreItem = this.genre.split('/')
        genreItem.pop()
        console.log(this.genre)
        console.log(genreItem)
      })
    },
    recommendMovie(){
      const config = this.setToken()
      axios.post('http://127.0.0.1:8000/movie/recommend/',this.genre,config)
      .then(res=>{
        console.log(res)
      })
    }
  },
  created(){
    console.log('실행한다')
    this.readProfile()
  }
}
</script>

<style>

</style>