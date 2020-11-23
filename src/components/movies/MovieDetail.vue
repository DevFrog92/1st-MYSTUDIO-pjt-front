<template>
<div>
  <b-container id='detail-container'  >
    <b-row class="mb-5">
    <b-embed
     type="iframe"
    aspect="16by9"
    :src="video_url"
    allowfullscreen>
    </b-embed>  
    </b-row>
    <b-row>
    <b-col class="p-0">
    <b-card :img-src="movie.poster_path" img-alt="Card image" img-left class="mb-3">
      <!-- <b-card-text> -->
        <b-jumbotron class="bg-white">
        <template #header ><h2 style="font-weight: bold;">{{movie.title}}</h2></template>
        <p class="mt-5" style="font-size:20px;">{{movie.overview}}</p>


        <hr class="my-4">

        <p>Popularity : {{movie.popularity}}</p>
        <p>Release Date : {{movie.release_date}}</p>
        <p>Vote Average : {{movie.vote_average}}</p>

        <b-button variant="primary" href="#" class="mr-5">Do Something</b-button>
        <b-button variant="success" href="#">Do Something Else</b-button>
      </b-jumbotron>
      <!-- </b-card-text> -->
    </b-card>
    </b-col>    
    </b-row>
  </b-container>
    <b-button style="font-size:30px; margin:5px" @click="Back">Back</b-button>
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
#detail-container{
  margin-top: 120px;
  padding: 0;
}

#header{
  font-size: 50px;
}
</style>