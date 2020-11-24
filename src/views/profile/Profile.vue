<template>
  <b-container fluid style="width:80%" class="p-0"> 
<div>
  <div>
    <div style="margin-top:3rem; " >
        <b-button v-b-toggle.sidebar-right>My profile</b-button>
        <b-sidebar id="sidebar-right" title="My profile" right shadow width="500px" z-index="1" backdrop>
          <div class="px-3 py-2">
            <b-img :src="'http://127.0.0.1:8000'+profile.img" fluid thumbnail class="mt-5 border-0" width="180"></b-img>
            <div>
            <b-btn @click="edit(profile)" class="mt-3">Update Profile</b-btn>
            </div>
            <hr>
            <h3>{{profile.username}} / {{profile.nickname}}</h3>
            <p>
              {{profile.description}}
            </p>
            <p>{{genre}}</p>
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
    <h1 style="margin:100px auto">프로필에서 최애 영화를 등록하면 영화 정보를 표시할 수 있습니다.</h1>
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
.row {
  margin-left: 0;
  margin-right: 0;
}

</style>