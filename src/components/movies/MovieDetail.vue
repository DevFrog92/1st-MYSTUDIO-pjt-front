<template >
<div style="background-color:black;" id="body">

  
  <b-container id='detail-container' fluid style="width:80%;padding-left:0;padding-right:0;margin-top:4rem;" >
      <div style="border:4px double #6A16CD; padding:1rem;">
    <b-row>
      <b-col cols="4">
        <img :src="movie.poster_path" alt="" width="100%">
      </b-col>
      <b-col cols="7">
        <b-row>
          <b-col>
            <b-embed
        type="iframe"
        aspect="16by9"
        :src="video_url"
        allowfullscreen>
        </b-embed>  
          </b-col>
        </b-row>
        <b-row style="padding:1rem;display:block;color:white;text-align:left;">
          <h2>{{movie.title}}</h2>
          <hr style="background-color:white;" class="my-3">
          
          <p class="mt-3" style="font-size:0.8rem; color:white;">{{movie.overview}}</p>
          <p class='mb-0'>Popularity : {{movie.popularity}}</p>
          <p class='mb-0'>Release Date : {{movie.release_date}}</p>
          <p class='mb-0'>Vote Average : {{movie.vote_average}}</p>
        </b-row>
        <b-row class="d-flex justify-content-end m-0 p-0">
        
        </b-row>
      </b-col>
      <b-col cols='1' >
        <div class="outer ">
        <div class="inner ">
          <label @click="Back" class="label_2">Back</label>
        </div>
        </div>
        <a href="#" @click="favorite(movie)">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <div v-if="fav_state">
            <b-icon-star-fill></b-icon-star-fill>
            </div>
            <div v-else>
            <b-icon-star></b-icon-star>

            </div>
        </a>
        <a href="#" v-b-modal.modal-lg @click="getMovieReview(movie)">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <b-icon-list-ul></b-icon-list-ul>
        </a>
        <a href="#" @click="getSimilar()">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <b-icon-chevron-double-down></b-icon-chevron-double-down>
        </a>
      </b-col>

    </b-row>
      </div >
      <div v-if="similar_state">
        <div v-if="similar.length">
        <carousel-3d :startIndex='similar.length - 2' :display='7' :perspective='40' :width="300" :height="600" :space='350' :inverse-scaling="500" id='carousel' >
      <slide v-for="(movie,i) in similar" :index='i' :key="i" id='slide'>
        <div>
          <img :src="movie.poster_path" :alt="movie.title" id='image'>
          <button @click="onClick(movie)" class="outline-button">{{movie.title}}</button>
        </div>
      </slide>
  </carousel-3d>
        </div>
        <div v-else class="mt-5">
          <h2 style="color:white;">관련 영화가 없습니다.</h2>
        </div>
      </div>
<b-modal tabindex="-1" id="modal-lg" size="lg" centered :title="movie.title">
            <b-card no-body class="overflow-hidden bg-dark" style="max-width: 100%;" >
          
              <hr>
              <b-row >
                <ul>
  
                  <li v-for="(movie_review,idx) in movie_reviews" :key='idx' p class="px-2">
                    <b-card :title="movie_review.auth" class="bg-dark text-white" >
                    <b-card-text>
                      <p class='txt_post' style="text-align:justify;" >{{movie_review.content}}</p>
                    </b-card-text>
                    <b-card-text class="mt-2">
                      <span style="font-size:16px; ">STAR RANK : </span><b-icon-star-fill style="color:yellow; font-size:25px; "></b-icon-star-fill><span style="text-transform:none; "> x {{movie_review.author_details.rating}} </span>
                      <p>Reporting date : {{movie_review.created_at}}</p>
                    </b-card-text>
                  </b-card>
                    </li>
                </ul>
              </b-row>
            </b-card>
        </b-modal>
</b-container>
</div>
</template>

<script>
import axios from 'axios'
// import { Carousel3d, Slide } from 'vue-carousel-3d'

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
  // components: {
    // Carousel3d,
    // Slide,
  // },
  data(){
    return {
      video_url:'https://www.youtube.com/embed/',
      fav_state:false,
      movie_reviews:[],
      similar:[],
      similar_state:false
    }
  },
  methods:{
    
     getMovieReview(movie){
      const key = 'e37c0ae71977e8ad20b5a3f6caa339a1'
      const movie_id = movie.id
      console.log(movie_id)

      axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/reviews?api_key=${key}&language=en-US&page=1`)
      .then(res=>{
        console.log(res.data)
        this.movie_reviews = res.data.results
        this.movie_reviews = this.movie_reviews.map(review=>{
          const item = {
            ...review,
            created_at: review.created_at.slice(0,10)
          }
          return item
        })
      })
    },
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
        console.log(res.data)
        this.check_favorite()
      })

    },
    getSimilar(){
      const key = 'e37c0ae71977e8ad20b5a3f6caa339a1'
      const movie_id = this.movie.id
      axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${key}&language=en-US&page=1`)
      .then(res=>{
        console.log(res.data.results)
        this.similar = res.data.results
        this.similar = this.similar.map(item=>{
          const temp = {
            ...item,
            poster_path: 'https://image.tmdb.org/t/p/w500'+item.poster_path
          }
          return temp
        })
        console.log(this.similar,'dsssssssssss')
      this.similar_state = true
      

      })
      .then(()=>{
        window.scrollTo(200, 700)
      })

    },
    onClick(movie){
      this.movie = movie
      this.getVideos()
      window.scrollTo(0,0)
      // this.$router.push({name:'MovieDetail',params:{movie:movie,page:'List'}})
    },
    check_favorite(){
      const config = this.setToken()
      axios.get(`http://127.0.0.1:8000/movie/${this.movie.id}/favorite_state/`,config)
      .then(res=>{
        console.log(res.data.state,'sdfsdfsdfsdfsdfsdf')
        this.fav_state = res.data.state
      })
    },
    readFavorite(movie){
      const config = this.setToken()
      axios.get(`http://127.0.0.1:8000/movie/${movie.id}/favorite_read_save/`,config)
      .then(res=>{
        console.log(res.data.state)
      })
    },
    getVideos(){
      this.video_url = 'https://www.youtube.com/embed/'
      const key = 'e37c0ae71977e8ad20b5a3f6caa339a1'
      const movie_id = this.movie.id
      console.log(movie_id,this.movie.poster_path)
      axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${key}&language=en-US`)
      .then(res=>{
        console.log(res.data.results[0].key)
        this.video_url = this.video_url + res.data.results[0].key
        console.log(this.video_url)
        this.check_favorite()
      })
    },
    Back(){
      if(this.page === 'List'){
        this.$router.push({name:'MovieList'})
      }else if (this.page === ' Recommand'){
        this.$router.push({name:'MovieRecommaned'})
      }
      else if(this.page === 'Favorite'){
        console.log('favorite로 돌아간다')
        this.$router.push({name:'Profile',params:{fav_state:true}})
      }
      else{
        this.$router.push({name:'Profile',params:{fav_state:false}})
      }
    }
  },
  created(){
  const token = localStorage.getItem('jwt')
  if (token){
    this.getVideos()
    
    }else{
      alert('로그인한 회원만 접근할 수 있습니다.')
      this.$router.push({name:'Login'})
     

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


a {
    position: relative;
    display: inline-block;
    padding: 1.3rem 1.3rem;
    margin: 1.3rem 0;
    color: #03e9f4;
    text-decoration: none;
    text-transform: uppercase;
    transition: 0.5s;
    letter-spacing: 4px;
    overflow: hidden;
    margin-right: 0.8em;
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
  float:right;
  margin: 0px 0.8rem;
  width: 70px;
  margin-top:1rem;
  cursor: pointer;
  margin-bottom: 2rem;
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

.txt_post {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* 라인수 */
    -webkit-box-orient: vertical;
    word-wrap:break-word; 
    line-height: 1.2em;
    height: 3.6em; /* line-height 가 1.2em 이고 3라인을 자르기 때문에 height는 1.2em * 3 = 3.6em */
  }
</style>