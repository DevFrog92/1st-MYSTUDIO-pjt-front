<template>
  <div v-if="popular_movie_list.length" id='MovieList'>
    <h1 id="head"><b-btn @click="current"><h3> Current Popular Movies </h3> </b-btn>|<b-btn @click="newly"><h3> Newly Created Movie </h3> </b-btn>|<b-btn @click="now"> <h3> Movies In Theatres</h3> </b-btn></h1>
    <carousel-3d :startIndex='show_movie_list.length - 2' :display='7' :perspective='40' :width="400" :height="700" :space='500' :inverse-scaling="500" id='carousel' >
      <slide v-for="(movie,i) in show_movie_list" :index='i' :key="i" id='slide'>
        <div>
          <img :src="movie.poster_path" :alt="movie.title" id='image'>
          <b-btn id='btn' @click="onClick(movie)">{{movie.title}}</b-btn>
        </div>
      </slide>
  </carousel-3d>
  <hr>
  </div>
</template>

<script>
import axios from 'axios'
import { Carousel3d, Slide } from 'vue-carousel-3d'
export default {
  name:'MovieList',
  data(){
    return {
      show_movie_list:[],
      popular_movie_list:[],
      latest_movie_list:[],
      upcomming_movie_list:[],
      imageUrl : 'https://image.tmdb.org/t/p/w500',
      yet:false,
      isToggle:false,
      movie_detail : null
    }
  },
  components: {
    Carousel3d,
    Slide,
  },
  methods:{
    current(){
      console.log('누른다')
      this.show_movie_list = this.popular_movie_list
    },
    newly(){
      this.show_movie_list = this.latest_movie_list
    },
    now(){
      console.log('누른다')

      this.show_movie_list = this.upcomming_movie_list
    },
    onClick(movie){
      console.log('이동')
      this.$router.push({name:'MovieDetail',params:{movie:movie,page:'List'}})
    },
    moveToDetail(movie){
      this.$router.push({name:'MovieDetail',params: {movie}})
    },
    getList(){
      const key = 'e37c0ae71977e8ad20b5a3f6caa339a1'
      console.log(key)
      axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=ko-KR`)
      .then(res=>{
        console.log('성공')
        this.yet = !this.yet
        console.log(this.yet)
        for (const r of res.data.results){
          const resItm = {
            ...r,
            poster_path : this.imageUrl + r.poster_path
          }
          this.popular_movie_list.push(resItm) 
        }
        console.log('변환',this.popular_movie_list)
      })

      axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=ko-KR&page=1`)
      .then(res=>{
        console.log('성공')
        this.yet = !this.yet
        console.log(res.data.results)
        for (const r of res.data.results){
          const resItm = {
            ...r,
            poster_path : this.imageUrl + r.poster_path
          }
          this.latest_movie_list.push(resItm) 
        }
      })
      axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=ko-KR&page=1`)
      .then(res=>{
        console.log('성공')
        this.yet = !this.yet
        console.log(res.data.results)
        for (const r of res.data.results){
          const resItm = {
            ...r,
            poster_path : this.imageUrl + r.poster_path
          }
          this.upcomming_movie_list.push(resItm) 
        }
      })
      


    }
  },
  created(){
    const token = localStorage.getItem('jwt')
    if (token){
      this.getList()
      this.show_movie_list = this.popular_movie_list
      }
    else{
       alert('로그인한 회원만 접근할 수 있습니다.')
      this.$router.push({name:'Login'})
  }
  }
}
</script>

<style>
#head{
  margin-top: 80px;
}

#carousel{
  margin-top: 100px;
}
#slide{
  background-color: white;
  border: 1px solid white;
}

.item {
  position: relative;
}
.des {
  position: absolute;
  top: 0;
  left: 0;
}

#btn {
  width:100%;
  text-align: center;
  margin: 7px 0px;
  font-size: 23px;
}
</style>