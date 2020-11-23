<template>
  <div>
    <h1>영화를 추천해주지</h1>
    <p>{{genre}}</p>
    <button @click="recommendMovie">GET</button>
    <hr>
    <div v-if="yet">
      <div v-for="idx in genre_name" :key='idx.id'>
        <h2>{{idx}}</h2>
        <p v-for="item in recommend[idx]" :key="item.id">
          {{item.title}}
          <img :src="'https://image.tmdb.org/t/p/w500'+item.poster_path" alt="item.poster_path">
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name : 'MovieRecommaned',
  data (){
    return {
      genre : [],
      recommend : [],
      genre_name : [],
      yet :false,
      genre_id : {'drama':18,'fantasy':14,'horror':27,'romance':10749,'adventure':12,'thriller':53,
    'comedy':35,'mystery':9648,'war':10752,'action':28,'sf':878,'animation':16,'crime':80,'documentary':99,
    'family':10751,'history':36,'music':10402}
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
        const genreItem = res.data.genre.split('/')
        genreItem.pop()
      for(const item of genreItem){
        this.genre.push(this.genre_id[item])
      }
      console.log(typeof this.recommend)
      })
    },
    recommendMovie(){
      console.log(this.genre)
      console.log(typeof this.recommend)
      const config = this.setToken()
      // const params = this.genre
      const params = new FormData()
      params.append('genre',this.genre)
      axios.post('http://127.0.0.1:8000/movie/recommend/',params,config)
      .then(res=>{
        console.log(res.data.data2)
        this.recommend = res.data.data
        this.genre_name = res.data.data2
        console.log(this.recommend)
        console.log(this.genre_name)
        this.yet = !this.yet
      })

      // const key = 'e37c0ae71977e8ad20b5a3f6caa339a1'
      
      
      // axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=ko-KR&page=1`)
      // .then(res=>{
      //   console.log(this.genre)
      //   console.log(res.data)
      //   for (const item of res.data.results){
      //     for (const id of item.genre_ids ){
      //       if (this.genre.includes(id) && !this.recommend.includes(item)){
      //         this.recommend.push(item)
      //       }
      //     }
      //   }
      //   console.log(this.recommend)
      // })
    }
  },
  created(){
    this.readProfile()
  }
}
</script>

<style>

</style>