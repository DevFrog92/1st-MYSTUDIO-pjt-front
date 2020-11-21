<template>
  <div v-if="movie">
    <h1>Movie Detail</h1>
    <p>{{movie.title}}</p>
    <img :src="movie.poster_path" alt="">
    <p>{{movie.overview}}</p>
    <p>{{movie.popularity}}</p>
    <p>{{movie.release_date}}</p>
    <p>{{movie.vote_average}}</p>
    <iframe width="420" height="315" :src="video_url" frameborder="0" allowfullscreen></iframe>
    <button @click="Back">Back</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'MovieDetail',
  props:{
    movie:{
      type:Object
    }
  },
  data(){
    return {
      video_url:'https://www.youtube.com/embed/'
    }
  },
  methods:{
    getVideos(){
      const key = 'e37c0ae71977e8ad20b5a3f6caa339a1'
      const movie_id = this.movie.id
      console.log(movie_id)
      // https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${key}&language=ko-KR
      axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${key}&language=en-US`)
      .then(res=>{
        console.log(res.data.results[0].key)
        this.video_url = this.video_url + res.data.results[0].key
        console.log(this.video_url)
      })
    },
    Back(){
      this.$router.push({name:'MovieList'})
    }
  },
  created(){
  const token = localStorage.getItem('jwt')
  if (token){
    this.getVideos()
    }else{
      alert('로그인한 회원만 접근할 수 있습니다.')
     this.$router.push({name:'Home'})

    }
  }
}
</script>

<style>

</style>