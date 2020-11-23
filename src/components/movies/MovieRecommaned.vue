<template>
  <div>
    <div class="mt-5">
    <b-btn @click="recommendMovie" class="my-5 p-1 text-align-center" style="font-size:40px;">A movie just for you!</b-btn>
    <div v-if="loading">
      <h1>Searching...</h1>
    </div>
    <hr>
    <div v-if="loading" class='center'>
      <p><scale-loader :loading="loading" :color="color" :size="size" id='loader'></scale-loader></p>
    </div>
    <div v-if="show_movie_list.length">
      <h1 class="m-5">
      <span v-for="(name,idx) in genre_name" :key='idx'>
         <b-btn @click="onclick(name)"><h3>{{name.toUpperCase()}} </h3></b-btn>| 
      </span>
      </h1>
      <carousel-3d :startIndex='0' :display='7' :perspective='40' :width="400" :height="700" :space='500' :inverse-scaling="500" id='carousel' >
      <slide v-for="(item,i) in show_movie_list" :index='i' :key="i" id='slide' >
        <div>
          <img :src="'https://image.tmdb.org/t/p/w500'+item.poster_path" :alt="item.poster_path" id='image'>
          <b-btn id='btn' @click="onClickDetail(item)">{{item.title}}</b-btn>
        </div>
      </slide>
    </carousel-3d>

    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ScaleLoader from 'vue-spinner/src/ScaleLoader'
export default {
  name : 'MovieRecommaned',
  components:{
    ScaleLoader,
  },
  data (){
    return {
      color: '#6c5ce7' ,
      size: '500px',
      loading:false,
      show_movie_list:[],
      genre : [],
      recommand : this.$store.state.recommand,
      genre_name : this.$store.state.genre_name,
      genre_id : {'drama':18,'fantasy':14,'horror':27,'romance':10749,'adventure':12,'thriller':53,
    'comedy':35,'mystery':9648,'war':10752,'action':28,'sf':878,'animation':16,'crime':80,'documentary':99,
    'family':10751,'history':36,'music':10402}
    }
  },
  methods:{
    onClickDetail(movie){
      console.log(movie)
      const movieItem ={
        ...movie,
        poster_path: 'https://image.tmdb.org/t/p/w500' + movie.poster_path
      }
      this.$router.push({name:'MovieDetail',params:{movie:movieItem,page:'Recommand'}})

    },
    onclick(name){
      this.show_movie_list = this.recommand[name]
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
    readProfile(){
      const config = this.setToken()                   
      axios.post('http://127.0.0.1:8000/community/profile/',{},config)
      .then(res=>{
        const genreItem = res.data.genre.split('/')
        genreItem.pop()
      for(const item of genreItem){
        this.genre.push(this.genre_id[item])
      }
      console.log(this.genre.length)
      if (this.genre.length===0){
        this.genre = [18,14,27,10749] 
      }
      console.log(typeof this.recommand)
      })
    },
    recommendMovie(){
      this.recommand = []
      this.show_movie_list=[]
      this.genre_name = []
      this.loading = true
      const config = this.setToken()
      const params = new FormData()
      params.append('genre',this.genre)
      axios.post('http://127.0.0.1:8000/movie/recommend/',params,config)
      .then(res=>{
        this.recommand = res.data.data
        this.genre_name = res.data.data2
        this.show_movie_list = this.recommand[this.genre_name[0]]
        this.$store.dispatch('addList',this.recommand)
        this.$store.dispatch('addName',this.genre_name)
        console.log(this.recommand)
        console.log(this.genre_name)
        this.loading = false
        console.log(this.show_movie_list,'333333')
      })

    }
  },
  created(){
    const token = localStorage.getItem('jwt')
  if (token){
    console.log('생성한다')
    this.readProfile()
    console.log(this.$store.state.recommand)
    console.log(this.$store.state.genre_name)
    this.recommand = this.$store.state.recommand
    this.genre_name = this.$store.state.genre_name
    console.log(this.recommand,'dfgdfgfd')
    for (const key in this.recommand){
      this.show_movie_list = this.recommand[key]
      break
    }    
    console.log(this.show_movie_list,'dddd')
    }else{
      alert('로그인한 회원만 접근할 수 있습니다.')
     this.$router.push({name:'Home'})

    }
  }
}
</script>

<style scoped>
.center {
  position: relative;
  margin: 100px 0;
}
#loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
</style>