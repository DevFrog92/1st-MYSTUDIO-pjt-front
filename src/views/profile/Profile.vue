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


  <div v-if="profile.best_movie_title" style="background-color:gray;">
      <h1 style="margin-top:50px;">나의 최애 영화</h1>
      <b-row >


  <div style="margin-top:100px; margin-bottom:100px">
  <b-media left-align vertical-align="center">
    <template #aside>
      <b-img class="mx-2" :src="'https://image.tmdb.org/t/p/w500' +myBest.poster_path" blank-color="#ccc" width="300" alt="placeholder"></b-img>
    </template>
    <h1 class="mt-0 mb-1 ml-3" style="text-align:left; font-weight:bold;">{{myBest.title}}</h1>
    <p class="mb-0 ml-2 mr-4 mt-5" style="font-size:1.4rem; text-align:justify;">
      {{myBest.overview}}
    </p>
  </b-media>
  </div>


      </b-row>
      <b-embed
    type="iframe"
    aspect="16by9"
    :src="video_url"
    allowfullscreen
  ></b-embed>
    </div>
  <div v-else>
    <h2 style="margin:200px auto; font-family: 'Noto Sans', sans-serif; font-weight:bold; color:white;">MY PROFILE을 등록하시면 나만의 영화 PAGE를 만들 수 있습니다.</h2>
  </div>
</div>

    </b-container>
</template>

<script>
import axios from 'axios'

export default {
  name:'Profile',
  data(){
    return {
      profile:null,
      genre : null,
      myBest:null,
      video_url:'https://www.youtube.com/embed/',
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
    findMyBest(profile){
      const key = 'e37c0ae71977e8ad20b5a3f6caa339a1'
      console.log(this.profile)
      console.log(profile.best_movie_id)
      axios.get(`https://api.themoviedb.org/3/movie/${profile.best_movie_id}?api_key=${key}&language=ko-KR`)
      .then(res=>{
        console.log('findMyBest',res.data)
        this.myBest = res.data
      })
        axios.get(`https://api.themoviedb.org/3/movie/${profile.best_movie_id}/videos?api_key=${key}&language=en-US`)
      .then(res=>{
        console.log(res.data.results[0].key)
        this.video_url = this.video_url + res.data.results[0].key
        console.log(this.video_url)
      })
    },
    getProfile(){
      const config = this.setToken()
      axios.get('http://127.0.0.1:8000/community/profile/',config)
      .then(res=>{
        console.log(res.data.results)
      this.readProfile()

      })

    },
    readProfile(){
      const config = this.setToken()
      axios.post('http://127.0.0.1:8000/community/profile/',{},config)
      .then(res=>{
        console.log(res)
        this.profile = res.data
        this.genre = res.data.genre
        console.log(this.profile)
        console.log(this.genre)
        if (this.profile.best_movie_title){
          this.findMyBest(this.profile)
        }else{
          console.log('안돌아간다')
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

</style>