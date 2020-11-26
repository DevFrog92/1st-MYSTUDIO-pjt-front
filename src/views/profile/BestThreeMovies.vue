<template>
<div v-if="best_movies.first !== null || best_movies.second !== null || best_movies.third !== null" >
  <div id="movie_card" v-for="(movie,idx) in best_movies" :key="idx">
  <div v-if="movie">
<div class="movie_card" id="bright" @click="OnClick(movie)">
  <div class="info_section">
    <div class="movie_header">
      <img class="locandina mr-0" :src="movie.poster_path"/>
      <h2 class="mb-3" style="font-weight:bold;">{{movie.title}}</h2>
      <h5 class="mb-4">{{movie.release_date}}, David Ayer</h5>
            <span class="minutes d-inline" style="margin-top:1px">
        <img  :src="'https://image.tmdb.org/t/p/original'+movie.production_companies[0].logo_path" width="20%" alt="">
        </span>
      <p class="type">{{movie.production_companies[0].name}}{{movie.poster_path}}</p>
    </div>
    <div class="movie_desc mt-5">
      <p class="txt_post ">
        {{movie.overview}} 
      </p>
    </div>
    <div class="movie_social">
    </div>
</div>
  <div class="blur_back" :style="{ 'background-image': 'url(' + movie.poster_path + ')' }" style="background-size: 50%;" ></div>
  </div>
</div>
</div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name:'BestThreeMovies',
  data(){
    return {
      profile:null,
      genre : null,
      myBest:null,
      video_url:'https://www.youtube.com/embed/',
      best_movies:{
        first:null,
        second:null,
        third:null,
      },
      best_movie_videos:{
        fisrt:null,
        second:null,
        third:null,
      },
    }
  },
  methods:{
    OnClick(movie){
      console.log(movie.poster_path)
        this.$router.push({name:'MovieDetail',params:{movie:movie,page:'Best'}})
      },
    findMyBest(movie_id,num){
      const key = 'e37c0ae71977e8ad20b5a3f6caa339a1'
      console.log(this.profile)
      console.log(movie_id)
      axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${key}&language=ko-KR`)
      .then(res=>{
        console.log('findMyBest',res.data,num)
        this.best_movies[num] = res.data
        this.best_movies[num].poster_path = 'https://image.tmdb.org/t/p/w500' + this.best_movies[num].poster_path
        console.log(num,this.best_movies[num])
      })
        axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${key}&language=en-US`)
      .then(res=>{
        console.log(res.data.results[0].key)
        this.best_movie_videos[num] = this.video_url + res.data.results[0].key
        
      }) 

      console.log(this.best_movies,'best Moviese')
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
    getProfile(){
      const config = this.setToken()
      axios.get('http://127.0.0.1:8000/community/profile/',config)
      .then(res=>{
        console.log(res.data.results,'ddddddddddddd')
      this.readProfile()

      })

    },
    readProfile(){
      const config = this.setToken()
      axios.post('http://127.0.0.1:8000/community/profile/',{},config)
      .then(res=>{
        console.log(res,'ffffffffffffffffffffffffffffff')
        this.profile = res.data
      
        this.genre = res.data.genre
        console.log(this.profile)
        console.log(this.genre)

        if (this.profile.best_movie_title_1){
          this.findMyBest(this.profile.best_movie_id_1,'first')
        }
        if (this.profile.best_movie_title_2){
          this.findMyBest(this.profile.best_movie_id_2,'second')
        }
        if (this.profile.best_movie_title_3){
          this.findMyBest(this.profile.best_movie_id_3,'third')
        }
        console.log('ererer',this.profile)

      })
    },

  },
  created(){
    const token = localStorage.getItem('jwt')
    if (token){
      this.getProfile()
    }else{
      alert('로그인한 회원만 접근할 수 있습니다.')
      this.$router.push({name:'Login'})
      
    }
  }

}
</script>

<style scoped>

/* ########################################################### */
@import url("https://fonts.googleapis.com/css?family=Montserrat:300,400,700,800");
* {
    box-sizing: border-box;
    margin: 0;
}

/* #movie_card html, body {
    margin: 0;
    background: white;
    font-family: 'Montserrat', helvetica, arial, sans-serif;
    font-size: 14px;
    font-weight: 400;
} */
 .txt_post {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5; /* 라인수 */
    -webkit-box-orient: vertical;
    word-wrap:break-word; 
    line-height: 1.2em;
    height: 5.9em; /* line-height 가 1.2em 이고 3라인을 자르기 때문에 height는 1.2em * 3 = 3.6em */
    text-align: left;
  }

#movie_card  .movie_card {
    position: relative;
    display: block;
    width: 800px;
    height: 350px;
    margin: 80px auto;
    overflow: hidden;
    border-radius: 10px;
    transition: all 0.4s;
    box-shadow: 0px 0px 120px -25px rgba(0, 0, 0, 0.5);
}

#movie_card .movie_card:hover {
    transform: scale(1.02);
    box-shadow: 0px 0px 80px -25px rgba(0, 0, 0, 0.5);
    transition: all 0.4s;
}

#movie_card .movie_card .info_section {
    position: relative;
    width: 100%;
    height: 100%;
    background-blend-mode: multiply;
    z-index: 0;
    border-radius: 10px;
}

#movie_card .movie_card .info_section .movie_header {
    position: relative;
    padding: 25px;
    height: 40%;
}

#movie_card .movie_card .info_section .movie_header h1 {
    color: black;
    font-weight: 400;
}

#movie_card .movie_card .info_section .movie_header h4 {
    color: #555;
    font-weight: 400;
}

#movie_card .movie_card .info_section .movie_header .minutes {
    display: inline-block;
    margin-top: 15px;
    color: #555;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.05);
}

#movie_card .movie_card .info_section .movie_header .type {
    display: inline-block;
    color: #959595;
    margin-left: 10px;
}

#movie_card .movie_card .info_section .movie_header .locandina {
    position: relative;
    float: left;
    margin-right: 20px;
    height: 150px;
    box-shadow: 0 0 20px -10px rgba(0, 0, 0, 0.5);
}

#movie_card .movie_card .info_section .movie_desc {
    padding: 25px;
    height: 50%;
}

#movie_card .movie_card .info_section .movie_desc .text {
    color: #545454;
}

#movie_card .movie_card .info_section .movie_social {
    height: 10%;
    padding-left: 15px;
    padding-bottom: 20px;
}

#movie_card .movie_card .info_section .movie_social ul {
    list-style: none;
    padding: 0;
}

#movie_card .movie_card .info_section .movie_social ul li {
    display: inline-block;
    color: rgba(0, 0, 0, 0.3);
    transition: color 0.3s;
    transition-delay: 0.15s;
    margin: 0 10px;
}

#movie_card .movie_card .info_section .movie_social ul li:hover {
    transition: color 0.3s;
    color: rgba(0, 0, 0, 0.7);
}

#movie_card .movie_card .info_section .movie_social ul li i {
    font-size: 19px;
    cursor: pointer;
}

#movie_card .movie_card .blur_back {
    position: absolute;
    top: 0;
    z-index: -1;
    height: 100%;
    right: 0;
    background-size: cover;
    border-radius: 11px;
}

@media screen and (min-width: 768px) {
    .movie_header {
        width: 65%;
    }
    .movie_desc {
        width: 50%;
    }
    .info_section {
        background: linear-gradient(to right, #e5e6e6 50%, transparent 100%);
    }
    .blur_back {
        width: 80%;
        background-position: -100% 10% !important;
    }
}

@media screen and (max-width: 768px) {
    .movie_card {
        width: 95%;
        margin: 70px auto;
        min-height: 350px;
        height: auto;
    }
    .blur_back {
        width: 100%;
        background-position: 50% 50% !important;
    }
    .movie_header {
        width: 100%;
        margin-top: 85px;
    }
    .movie_desc {
        width: 100%;
    }
    .info_section {
        background: linear-gradient(to top, #e5e6e6 50%, transparent 100%);
        display: inline-grid;
    }
}


/* ------------------------------ */



</style>