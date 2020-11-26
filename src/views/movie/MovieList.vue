<template>
  <div v-if="popular_movie_list.length" id='MovieList' style="background-color:black;">
    <h1 id="head">
      <span  @click="current" class="btn_ML third">Current Popular Movies</span>
      <span  @click="newly" class="btn_ML third">Newly Created Movie</span>
      <span  @click="now" class="btn_ML third">Movies In Theatres</span>
      </h1>
    
    
    <carousel-3d :startIndex='show_movie_list.length - 2' :display='7' :perspective='40' :width="300" :height="600" :space='350' :inverse-scaling="500" id='carousel' >
      <slide v-for="(movie,i) in show_movie_list" :index='i' :key="i" id='slide'>
        <div>
          <img :src="movie.poster_path" :alt="movie.title" id='image'>
          <button @click="onClick(movie)" class="outline-button">{{movie.title}}</button>
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
  background-color :black;
  padding-top:80px;
}

#carousel{
  margin-top: 100px;
}
#slide{
  background-color:transparent;
  border: 20px solid transparent;	
  /* border-image: linear-gradient(to right,#6A16CD, #5411A4, #be29ec,	#c616cd);
  border-image-slice: 1; */
}

#image {
  border: 3px solid purple;	
  border-image: linear-gradient(to right,#6A16CD, #5411A4, #be29ec,	#c616cd);
  border-image-slice: 1;
}

.item {
  position: relative;
}

.des {
  position: absolute;
  top: 0;
  left: 0;
}


.btn_ML {
    box-sizing: border-box;
    width:250px;
    appearance: none;
    background-color: transparent;
    border: 1px solid #fff;
    border-radius: 0.6em;
    cursor: pointer;
    display: inline-block;
    align-self: center;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1;
    margin: 20px;
    padding: 20px 10px;
    text-decoration: none;
    text-align: center;
    text-transform: uppercase;
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
}

.btn_ML:hover, .btn_ML:focus {
    color: #fff;
    outline: 0;
}


.third {
    border-color: #fff;
    color: #fff;
    box-shadow: 0 0 40px 40px #6A16CD inset, 0 0 0 0 #6A16CD ;
    transition: all 150ms ease-in-out;
}

.third:hover {
    box-shadow: 0 0 10px 0 #6A16CD inset, 0 0 10px 4px #6A16CD;
    color: #6A16CD;
}

.outline-button {
    appearance: none;
    width: 100%;
    height: 60px;
    background-color: transparent;
    border: none;
    box-shadow: 0 0 0 3px transparent inset;
    color:white;
    font-size:20px;
    text-shadow: -1px 0 #6A16CD, 0 1px #6A16CD, 1px 0 #6A16CD, 0 -1px #6A16CD;
    margin-top: 3px;
    position: relative;
    cursor: pointer;
}


.outline-button::before, .outline-button::after {
    content: "";
    position: absolute;
    height: 0;
    width: 3px;
    transition: height 0.2s 0.2s cubic-bezier(0.86, 0, 0.07, 1), width 0.2s cubic-bezier(0.86, 0, 0.07, 1);
}

.outline-button::before {
    box-shadow: 3px 3px 0 #6A16CD inset;
    bottom: 0;
    left: 0;
}

.outline-button::after {
    box-shadow: -3px -3px 0 #6A16CD inset;
    top: 0;
    right: 0;
}

.outline-button:hover::before, .outline-button:hover::after {
    height: 100%;
    width: 100%;
    transition: height 0.2s cubic-bezier(0.86, 0, 0.07, 1), width 0.2s 0.2s cubic-bezier(0.86, 0, 0.07, 1);
}

</style>