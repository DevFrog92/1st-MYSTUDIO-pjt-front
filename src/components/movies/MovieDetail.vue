<template >
<div style="background-color:black;">
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