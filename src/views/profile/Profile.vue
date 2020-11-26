<template>
  <b-container fluid style="width:80%" class="p-0 profile"> 
<div>
  <div>
    <div style="padding-top:5rem " >

        <a v-b-toggle.sidebar-right class="cta" style="text-decoration:none; color:white; cursor: pointer; background-color:black;">
          <span>+ MY PROFILE</span></a>
        <b-sidebar id="sidebar-right" bg-variant="black" right shadow width="500px" z-index="1" backdrop style="color:white background-color:black;">
          <img class="image_logo" src="http://127.0.0.1:8000/api/logo/logowhite.png" style="width:100px; float:right; margin-right:30px;"> 
          
          <div class="px-3 py-2">
          <div class="d-flex justify-content-center pt-5">
            <div class="profile_wrapper" > 
              <div class="gradation_animate"></div> 
              <div class="image_wrapper"> 
                <img class="image_pro" src="http://127.0.0.1:8000/api/profile/ogu.png"> 
              </div> 
            </div>
          </div>

            <div style="float:right; display:block;">
              <button class="btn6_sele2"  @click="edit(profile)">Update Profile</button>
            </div>
            

            <div style="display:block; margin-top:60px; color:#6A16CD; text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;">
            <span style="display:inline; font-size:28px;">{{profile.nickname}} </span><p style="display:inline; font-size:23px;">({{profile.username}})</p>
            </div>


            <div style="display:block; margin-top:22px">
            <span style="display:inline; float:left; margin-left:20px; font-size:21px;">DESCRIPTION</span>
            <br>
            <p style="display:block; font-size:17px; margin-top:10px;">{{profile.description}}</p>
            </div>

            <div style="display:block; margin-top:22px">
            <span style="display:inline; float:left; margin-left:20px; font-size:21px;">MY FAVORITE GENRE</span>
            <br>
            <p style="display:block; font-size:17px; margin-top:10px;">{{genre}}</p>
            </div>

          </div>
        </b-sidebar>
      </div>
  </div>
  



  <div v-if="best_movies.best_movie_title_1 !== null || best_movies.best_movie_title_2 !== null || best_movies.best_movie_title_3 !== null" >
    
    <FavoriteMovies />
    <div v-if="0">

    <BestThreeMovies />
    </div>
<!-- <div id="movie_card" v-for="(movie,idx) in best_movies" :key="idx">

<div class="movie_card" id="bright">
  <div class="info_section">
    <div class="movie_header">
      <img class="locandina" :src="'https://image.tmdb.org/t/p/w500'+movie.poster_path"/>
      <h1>{{movie.title}}</h1>
      <h4>2017, David Ayer</h4>
      <span class="minutes">117 min</span>
      <p class="type">Action, Crime, Fantasy</p>
    </div>
    <div class="movie_desc">
      <p class="text">
        Set in a world where fantasy creatures live side by side with humans. A human cop is forced to work with an Orc to find a weapon everyone is prepared to kill for. 
      </p>
    </div>
    <div class="movie_social">
      <ul>
        <li><i class="material-icons">share</i></li>
        <li><i class="material-icons"></i></li>
        <li><i class="material-icons">chat_bubble</i></li>
      </ul>
    </div>
  </div>
  <div class="blur_back" :style="{ 'background-image': 'url(' + 'https://image.tmdb.org/t/p/w500'+movie.poster_path + ')' }" style="background-size: 50%;" ></div>
</div>
</div> -->









  </div>
  <div v-else>
    <h2 style="margin:200px auto; font-family: 'Noto Sans', sans-serif; font-weight:bold; color:white;">MY PROFILE을 등록하시면 나만의 영화 PAGE를 만들 수 있습니다.</h2>
  </div>
</div>

    </b-container>
</template>

<script>
import axios from 'axios'
import BestThreeMovies from '@/views/profile/BestThreeMovies'
import FavoriteMovies from '@/views/profile/FavoriteMovies'

export default {
  name:'Profile',
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
  components:{
    BestThreeMovies,
    FavoriteMovies
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
    findMyBest(movie_id,num){
      const key = 'e37c0ae71977e8ad20b5a3f6caa339a1'
      console.log(this.profile)
      console.log(movie_id)
      axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${key}&language=ko-KR`)
      .then(res=>{
        console.log('findMyBest',res.data,num)
        this.best_movies[num] = res.data
        console.log(num,this.best_movies[num])
      })
        axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${key}&language=en-US`)
      .then(res=>{
        console.log(res.data.results[0].key)
        this.best_movie_videos[num] = this.video_url + res.data.results[0].key
        
      }) 

      console.log(this.best_movies,'best Moviese')
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
    edit(profile){
      this.$router.push({name:'UpdateProfile',params:{profile}})
    }
    
  },
  computed:{
    resetProfile(){
      return this.profile
    }
  },
  created(){
    const token = localStorage.getItem('jwt')
    if (token){
      this.getProfile()
    }else{
      alert('로그인한 회원만 접근할 수 있습니다.')
      this.$router.push({name:'Home'})
    }
  }
}
</script>

<style scoped>
sidebar-body{
  background-color:black;
}
.profile{
  font-family: 'Noto Sans', sans-serif;
  text-transform: uppercase;
}

.row {
  margin-left: 0;
  margin-right: 0;
}

.cta {
    position: relative;
    margin: auto;
    padding: 15px 22px;
    transition: all .2s ease;
}

.cta:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    border-radius: 28px;
    background:#6b16cd4b;
    width: 56px;
    height: 56px;
    transition: all .3s ease;
}

.cta span {
    position: relative;
    font-size: 16px;
    line-height: 18px;
    font-weight: 900;
    letter-spacing: .25em;
    text-transform: uppercase;
    vertical-align: middle;
}

/* .cta svg {
    position: relative;
    top: 0;
    margin-left: 10px;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke: #111;
    stroke-width: 2;
    transform: translateX(-5px);
    transition: all .3s ease;
} */

.cta:hover:before {
    width: 100%;
    background:#690fcf91;
}
/* 
.cta:hover svg {
    transform: translateX(0);
} */

.cta:active {
    transform: scale(0.96);
}

.profile_wrapper {
  float: left; 
  width: 300px; 
  height: 300px; 
  margin: 40px 0px 0 80px; 
  position: relative; 
} 

.gradation_animate {
  position: absolute;
  top: 0px; 
  left: 0px; 
  width: 300px; 
  height: 300px; 
  border-radius: 50%; 
  background: url(http://127.0.0.1:8000/api/profile/purple300.png) no-repeat; 
  -webkit-animation:spin 2s infinite linear; 
  -moz-animation:spin 2s infinite linear;
   -ms-animation:spin 2s infinite linear; 
  animation: spin 2s linear infinite; 

  } 
@-webkit-keyframes spin { 100%{ -webkit-transform: rotate(360deg); } }
@-moz-keyframes spin { 100%{ -moz-transform: rotate(360deg); } } 
@-ms-keyframes spin { 100%{ -ms-transform: rotate(360deg); } }
@keyframes spin { 100%{ transform: rotate(360deg); } }

.image_wrapper { 
    position: relative; 
    overflow: hidden; 
    width: 290px; 
    height: 290px; 
    border-radius: 50%; 
    top: 3px; 
    left: 3px; 
    } 
.image_pro {
  position: absolute; 
  top: -98%; 
  left: -97%; 
  right: -99%; 
  bottom: -100%; 
  margin: auto; 
  height: 92px; 
  min-width: 100%; 
  min-height: 100%; 
  }


.btn6_sele2, .btn6_sele2:link, .btn6_sele2:visited {
    padding: 10px 0;
    width:180px;
    height:40px;
    font-family: 'Noto Sans', sans-serif;
    border: transparent;
    background:transparent;
    color: grey;
    font-weight:bold;
    text-transform: uppercase;
    font-size: 18px;
    letter-spacing: 0.5px;
    transition: all .2s ease-in-out;
}

.btn6_sele2:hover, .btn6_sele2:link:hover, .btn6_sele2:visited:hover {
    color: #6A16CD;
    font-weight: bold;
}


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
    z-index: 2;
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
    height: 120px;
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
    z-index: 1;
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


</style>