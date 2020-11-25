<template >
<div style="background-color:black;" id="body">
  <div>
    <a href="#">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Neon button
    </a>
    <a href="#">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Neon button
    </a>
    <a href="#">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Neon button
    </a>

  </div>
  <b-container id='detail-container' fluid style="width:50%" >
  <b-row class="mb-3">
  <b-col cols="10" class="p-0">

    <b-embed
     type="iframe"
    aspect="16by9"
    :src="video_url"
    allowfullscreen>
    </b-embed>  
  </b-col>
  <b-col cols="2">

  <div class="outer m-0">
    <div class="inner ">
      <label @click="Back" class="label_2">Back</label>
    </div>
  </div>
  <div>

    <b-btn class="m-0 p-0" @click="favorite(movie)">좋아요</b-btn>
  </div>
  <div>

    <b-btn class="m-0 p-0" @click="favorite(movie)">좋아요</b-btn>
  </div>
  </b-col>
    </b-row>

    <b-row>
    <b-col class="p-0">
    <b-card :img-src="movie.poster_path" img-alt="Card image" img-width="40%" img-height="" img-left style="border:4px double #6A16CD; background-color:black;" >
      <b-card-text style="height:100px; ">
        <b-jumbotron class="pt-0" style="background-color:black;width:100%;height:100%;">
        <h2 style="font-weight: bold; font-size:1.5rem; color:white;">{{movie.title}}</h2>
        <p class="mt-3" style="font-size:0.8rem; color:white;">{{movie.overview}}</p>
        <p class='mb-0'>Popularity : {{movie.popularity}}</p>
        <p class='mb-0'>Release Date : {{movie.release_date}}</p>
        <p class='mb-0'>Vote Average : {{movie.vote_average}}</p>

        <hr class="my-1 ">
        <div class="d-flex justify-content-between mt-3">
        <b-button variant="primary" href="#">Do Something</b-button>
        <b-button variant="success" href="#">Do Something Else</b-button>
        </div>
      </b-jumbotron>
      </b-card-text>
    </b-card>
    </b-col>    
    </b-row>
  </b-container>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name:'MovieDetail',
  props:{
    movie:{
      type:Object
    },
    page:{
      type:String
    }
  },
  data(){
    return {
      video_url:'https://www.youtube.com/embed/'
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
    favorite(movie){
      console.log(movie)
      const config = this.setToken()
      const movieItem = new FormData()
      movieItem.append('movie_title',movie.title)
      movieItem.append('poster_path',movie.poster_path)
      movieItem.append('movie_id',movie.id)
      movieItem.append('overview',movie.overview)
      movieItem.append('genre',movie.genre_ids)

      axios.post(`http://127.0.0.1:8000/movie/${movie.id}/favorite_read_save/`,movieItem,config)
      .then(res=>{
        console.log(res)
      })

    },
    getVideos(){
      const key = 'e37c0ae71977e8ad20b5a3f6caa339a1'
      const movie_id = this.movie.id
      console.log(movie_id)
      axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${key}&language=en-US`)
      .then(res=>{
        console.log(res.data.results[0].key)
        this.video_url = this.video_url + res.data.results[0].key
        console.log(this.video_url)
      })
    },
    Back(){
      if(this.page === 'List'){
        this.$router.push({name:'MovieList'})
      }else{
        this.$router.push({name:'MovieRecommaned'})
      }

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

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Noto+Sans:400,400i,700,700i&subset=greek-ext');
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap");
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

#body {
    /* display: flex; */
    /* justify-content: center;
    align-items: center; */
    /* height: 100vh; */
    /* background: #050801;
    font-family: 'Raleway', sans-serif;
    font-weight: bold; */
}

a {
    position: relative;
    display: inline-block;
    padding: 25px 30px;
    margin: 40px 0;
    color: #03e9f4;
    text-decoration: none;
    text-transform: uppercase;
    transition: 0.5s;
    letter-spacing: 4px;
    overflow: hidden;
    margin-right: 50px;
}

a:hover {
    background: #03e9f4;
    color: #050801;
    box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4, 0 0 200px #03e9f4;
    -webkit-box-reflect: below 1px linear-gradient(transparent, #0005);
}

a:nth-child(1) {
    filter: hue-rotate(270deg);
}

a:nth-child(2) {
    filter: hue-rotate(110deg);
}

a span {
    position: absolute;
    display: block;
}

a span:nth-child(1) {
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #03e9f4);
    animation: animate1 1s linear infinite;
}

@keyframes animate1 {
    0% {
        left: -100%;
    }
    50%, 100% {
        left: 100%;
    }
}

a span:nth-child(2) {
    top: -100%;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, transparent, #03e9f4);
    animation: animate2 1s linear infinite;
    animation-delay: 0.25s;
}

@keyframes animate2 {
    0% {
        top: -100%;
    }
    50%, 100% {
        top: 100%;
    }
}

a span:nth-child(3) {
    bottom: 0;
    right: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(270deg, transparent, #03e9f4);
    animation: animate3 1s linear infinite;
    animation-delay: 0.50s;
}

@keyframes animate3 {
    0% {
        right: -100%;
    }
    50%, 100% {
        right: 100%;
    }
}

a span:nth-child(4) {
    bottom: -100%;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(360deg, transparent, #03e9f4);
    animation: animate4 1s linear infinite;
    animation-delay: 0.75s;
}

@keyframes animate4 {
    0% {
        bottom: -100%;
    }
    50%, 100% {
        bottom: 100%;
    }
}




#detail-container{
  padding-top: 60px;
  padding-bottom: 100px;
}


.outer {
  position: relative;
  /* float:right;
  margin: 0px 15px; */
  width: 70px;
  margin-top: 100px;
  cursor: pointer;
}

.inner {
  width: inherit;
  text-align: center;

}

.label_2 { 
  font-size: 15px; 
  font-weight: bold;
  line-height: 4em;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-family: 'Noto Sans', sans-serif;
  color: #6A16CD;
  transition: all .3s ease-in;
  opacity: 0;
  cursor: pointer;
}

.inner:before, .inner:after {
  position: absolute;
  content: '';
  height: 2px;
  width: inherit;
  background: radial-gradient(#c616cd ,#6A16CD, #be29ec,#5411A4	);
  left: 0;
  transition: all .2s ease-in;
}

.inner:before {
  top: 50%; 
  transform: rotate(45deg);  
}

.inner:after {  
  bottom: 50%;
  transform: rotate(-45deg);  
}

.outer:hover label {
  opacity: 1;
}

.outer:hover .inner:before,
.outer:hover .inner:after {
  transform: rotate(0);
}

.outer:hover .inner:before {
  top: 0;

}

.outer:hover .inner:after {
  bottom: 0;
  
}
</style>