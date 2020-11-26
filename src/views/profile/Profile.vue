<template>
  <b-container fluid style="width:80%" class="p-0 profile"> 
<div>
  <div>
    <div style="padding-top:5rem; " class="mt-5" >
        <div class="d-flex justify-content-start">
          <div style="margin-right:300px;">
        <a v-b-toggle.sidebar-right class="cta" style="text-decoration:none; color:white; cursor: pointer; background-color:black;">
          <span>+ MY PROFILE</span></a>
          </div>
          <div class="sign" id="head_title" v-if="state_of_fav">
        <span class="fast-flicker">f</span>avo<span class="flicker">r</span>ite
          </div>
          <div class="sign" id="head_title" v-else>
        <span class="fast-flicker">b</span>est<span class="flicker">m</span>ovie
          </div>
          

        </div>
        <b-sidebar id="sidebar-right" bg-variant="" right shadow width="450px" z-index="1" backdrop style="color:white background-color:black;">
          
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
            <span style="display:inline; color:white; float:left; margin-left:20px; font-size:21px;">DESCRIPTION</span>
            <br>
            <p style="display:block; color:white; font-size:17px; margin-top:10px;">{{profile.description}}</p>
            </div>

            <div style="display:block; margin-top:22px">
            <span style="display:inline; color:white; float:left; margin-left:20px; font-size:21px;">MY FAVORITE GENRE</span>
            <br>
            <p style="display:block; color:white; font-size:17px; margin-top:10px;">{{genre}}</p>
            </div>
            <div>
              <div class="btn_new" @click="goMovieRecommaned">
                  <svg width="277" height="62">
                    <defs>
                        <linearGradient id="grad1">
                            <stop offset="0%" stop-color="#FF8282"/>
                            <stop offset="100%" stop-color="#E178ED" />
                        </linearGradient>
                    </defs>
                    <rect x="5" y="5" rx="25" fill="none" stroke="url(#grad1)" width="266" height="50"></rect>
                  </svg>
                  <span>MOVIE RECOMMEND</span>
                </div>
            </div>


            <div>
                              <div class="btn_new" @click="goToBest">
                  <svg width="277" height="62">
                    <defs>
                        <linearGradient id="grad1">
                            <stop offset="0%" stop-color="#FF8282"/>
                            <stop offset="100%" stop-color="#E178ED" />
                        </linearGradient>
                    </defs>
                    <rect x="5" y="5" rx="25" fill="none" stroke="url(#grad1)" width="266" height="50"></rect>
                  </svg>
                  <span>BEST MOVIE</span>
                </div>
            </div>
            
            <div>
              <div class="btn_new" @click="goToFavorite">
                  <svg width="277" height="62">
                    <defs>
                        <linearGradient id="grad1">
                            <stop offset="0%" stop-color="#FF8282"/>
                            <stop offset="100%" stop-color="#E178ED" />
                        </linearGradient>
                    </defs>
                    <rect x="5" y="5" rx="25" fill="none" stroke="url(#grad1)" width="266" height="50"></rect>
                  </svg>
                  <span>FAVORITE MOVIE</span>
                </div>
            </div>


          </div>
        </b-sidebar>
      </div>
  </div>
  



  <div v-if="best_movies.best_movie_title_1 !== null || best_movies.best_movie_title_2 !== null || best_movies.best_movie_title_3 !== null" >
    
    <div v-if="state_of_fav">
    <FavoriteMovies />
    </div>
    <div v-else>
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
  props:{
    fav_state :{
      type: Boolean,
    }
  },
  data(){
    return {
      profile:null,
      genre : null,
      myBest:null,
      state_of_fav:this.fav_state,
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
    goMovieRecommaned(){
      this.$router.push({name:'MovieRecommaned'})
    },
    goToFavorite(){
      this.state_of_fav = true
      console.log('state_of_fav',this.state_of_fav)
      // this.$router.push({name:'Profile'})
    },
    goToBest(){
      this.state_of_fav = false
      console.log('state_of_fav',this.state_of_fav)

      // this.$router.push({name:'Profile'})
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
      this.state_of_fav = this.fav_state
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
      console.log(this.fav_state)
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



.btn_new {
    /* margin-top: calc(50% + 25px); */
    margin-top: 2rem;
    position: relative;
    display: inline-block;
    width: 277px;
    height: 50px;
    font-size: 1em;
    font-weight: bold;
    line-height: 60px;
    text-align: center;
    text-transform: uppercase;
    background-color: transparent;
    cursor: pointer;
    text-decoration:none;
    font-family: 'Roboto', sans-serif;
    font-weight:900;
    font-size:17px;
    letter-spacing: 0.045em;
}

.btn_new svg {
    position: absolute;
    top: 0;
    left: 0;
}

.btn_new svg rect {
    /* //stroke: #EC0033; */
    stroke-width: 4;
    stroke-dasharray: 353, 0;
    stroke-dashoffset: 0;
    -webkit-transition: all 600ms ease;
    transition: all 600ms ease;
}

.btn_new span{
  background: rgb(255,130,130);
  background: -moz-linear-gradient(left,  rgba(255,130,130,1) 0%, rgba(225,120,237,1) 100%);
  background: -webkit-linear-gradient(left,  rgba(255,130,130,1) 0%,rgba(225,120,237,1) 100%);
  background: linear-gradient(to right,  rgba(255,130,130,1) 0%,rgba(225,120,237,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff8282', endColorstr='#e178ed',GradientType=1 );
  
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.btn_new:hover svg rect {
    stroke-width: 4;
    stroke-dasharray: 196, 543;
    stroke-dashoffset: 437;
}


.raise:hover,
.raise:focus {
    box-shadow: 0 0.5em 0.5em -0.4em var(--hover);
    transform: translateY(-0.25em);
}


.raise {
    --color: #a972cb;
    --hover: #c616cd;
}


button {
    color: var(--color);
    transition: 0.25s;
}

button:hover, button:focus {
    border-color: var(--hover);
    color: #fff;
}


button {
    background: none;
    border: 1px solid;
    font: inherit;
    line-height: 1;
    margin: 0.5em;
    padding: 10px;
}


/* --------------------------------------- */

@font-face {
    font-family: Clip;
    src: url("https://acupoftee.github.io/fonts/Clip.ttf");
}

/* body {
    background-color: #141114;
    background-image: linear-gradient(335deg, black 23px, transparent 23px), linear-gradient(155deg, black 23px, transparent 23px), linear-gradient(335deg, black 23px, transparent 23px), linear-gradient(155deg, black 23px, transparent 23px);
    background-size: 58px 58px;
    background-position: 0px 2px, 4px 35px, 29px 31px, 34px 6px;
} */

.sign {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    height: 40%;
    background-image: radial-gradient(ellipse 50% 35% at 50% 50%, #6b1839, transparent);
    transform: translate(-50%, -50%);
    letter-spacing: 2;
    left: 50%;
    /* top: 50%; */
    font-family: "Clip";
    text-transform: uppercase;
    font-size: 6em;
    color: #ffe6ff;
    text-shadow: 0 0 0.6rem #ffe6ff, 0 0 1.5rem #ff65bd, -0.2rem 0.1rem 1rem #ff65bd, 0.2rem 0.1rem 1rem #ff65bd, 0 -0.5rem 2rem #ff2483, 0 0.5rem 3rem #ff2483;
    animation: shine 2s forwards, flicker 3s infinite;
}

@keyframes blink {
    0%,
    22%,
    36%,
    75% {
        color: #ffe6ff;
        text-shadow: 0 0 0.6rem #ffe6ff, 0 0 1.5rem #ff65bd, -0.2rem 0.1rem 1rem #ff65bd, 0.2rem 0.1rem 1rem #ff65bd, 0 -0.5rem 2rem #ff2483, 0 0.5rem 3rem #ff2483;
    }
    28%,
    33% {
        color: #ff65bd;
        text-shadow: none;
    }
    82%,
    97% {
        color: #ff2483;
        text-shadow: none;
    }
}

#head_title .flicker {
    animation: shine 2s forwards, blink 3s 2s infinite;
}

#head_title .fast-flicker {
    animation: shine 2s forwards, blink 10s 1s infinite;
}

@keyframes shine {
    0% {
        color: #6b1839;
        text-shadow: none;
    }
    100% {
        color: #ffe6ff;
        text-shadow: 0 0 0.6rem #ffe6ff, 0 0 1.5rem #ff65bd, -0.2rem 0.1rem 1rem #ff65bd, 0.2rem 0.1rem 1rem #ff65bd, 0 -0.5rem 2rem #ff2483, 0 0.5rem 3rem #ff2483;
    }
}

@keyframes flicker {
    from {
        opacity: 1;
    }
    4% {
        opacity: 0.9;
    }
    6% {
        opacity: 0.85;
    }
    8% {
        opacity: 0.95;
    }
    10% {
        opacity: 0.9;
    }
    11% {
        opacity: 0.922;
    }
    12% {
        opacity: 0.9;
    }
    14% {
        opacity: 0.95;
    }
    16% {
        opacity: 0.98;
    }
    17% {
        opacity: 0.9;
    }
    19% {
        opacity: 0.93;
    }
    20% {
        opacity: 0.99;
    }
    24% {
        opacity: 1;
    }
    26% {
        opacity: 0.94;
    }
    28% {
        opacity: 0.98;
    }
    37% {
        opacity: 0.93;
    }
    38% {
        opacity: 0.5;
    }
    39% {
        opacity: 0.96;
    }
    42% {
        opacity: 1;
    }
    44% {
        opacity: 0.97;
    }
    46% {
        opacity: 0.94;
    }
    56% {
        opacity: 0.9;
    }
    58% {
        opacity: 0.9;
    }
    60% {
        opacity: 0.99;
    }
    68% {
        opacity: 1;
    }
    70% {
        opacity: 0.9;
    }
    72% {
        opacity: 0.95;
    }
    93% {
        opacity: 0.93;
    }
    95% {
        opacity: 0.95;
    }
    97% {
        opacity: 0.93;
    }
    to {
        opacity: 1;
    }
}



</style>