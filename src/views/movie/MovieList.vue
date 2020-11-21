<template>
  <div>
    <h1>MovieList</h1>
    <button @click="getList">get list</button>
    <hr>
    <div v-for="movie in popular_movie_list"  :key="movie.id">
      <div @click="moveToDetail(movie)">
      <p>{{movie.title}}</p>
      <img :src="movie.poster_path" :alt="movie.title">
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name:'MovieList',
  data(){
    return {
      popular_movie_list:[],
      latest_movie_list:[],
      imageUrl : 'https://image.tmdb.org/t/p/w500'
    }
  },
  methods:{
    moveToDetail(movie){
      this.$router.push({name:'MovieDetail',params: {movie}})
    },
    getList(){
      const d = new Date()
      const dd = d.toLocaleDateString()
      console.log(dd.slice(0,4))
      console.log(dd.slice(6,8))
      console.log(dd.slice(10,12))
      console.log(`${dd.slice(0,4)}${dd.slice(6,8)}${dd.slice(10,12)}`)
      // const key = 'd5df98dce7e875e3412570f19506940d'
      const key = 'e37c0ae71977e8ad20b5a3f6caa339a1'
      console.log(key)
      // now = datetime.datetime.now()
      // delta = datetime.timedelta(days=-1)
      // yesterday = now + delta
      // const yesterday_str = `${dd.slice(0,4)}0101`
      
      // http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${key}&targetDt=${yesterday_str}
      axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=ko-KR`)
      .then(res=>{
        console.log('성공')
        console.log(res.data.results)
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
        console.log(res.data.results)
        this.latest_movie_list =res.data.results
      })
      

      // result = requests.get(url=url,params=param)
      // box_office_json_object = result.json()

    }
  },
  created(){
    const token = localStorage.getItem('jwt')
    if (token){
      this.getList()
      }else{
       alert('로그인한 회원만 접근할 수 있습니다.')
      this.$router.push({name:'Home'})
  }
  }
}
</script>

<style>

</style>