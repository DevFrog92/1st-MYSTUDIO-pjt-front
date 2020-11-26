<template>
  <div class="favorite_cards " style="margin-top:100px;" >
     <div class="button-wrapper mt-5">
      </div>
      <Stack
              :column-min-width="300"
              :gutter-width="15"
              :gutter-height="15"
              monitor-images-loaded
      >
        <Stack-item
                v-for="(image, i) in favorite_list"
                :key="i"
                style="transition: transform 300ms"
        >
          <div class="img">
              <img class="img-1" @click="OnClick(image)" v-b-modal.modal-xl :src="image.poster_path" :alt="image.movie_title" />
     
              
          </div>
        </Stack-item>
      </Stack>

  </div>
</template>

<script>
import axios from 'axios'
import { Stack, StackItem } from "vue-stack-grid";
export default {
  name:"FavoriteMovies",
  components: { 
    Stack, 
    StackItem 
},
  data(){
    return {
      favorite_list:[],
      fav_state:false
    }
    },
    methods:{
      OnClick(movie){
        console.log(movie)
      const key = 'e37c0ae71977e8ad20b5a3f6caa339a1'
      axios.get(`https://api.themoviedb.org/3/movie/${movie.movie_id}?api_key=${key}&language=ko-KR`)
      .then(res=>{
        const item = res.data
        item.poster_path = 'https://image.tmdb.org/t/p/w500' + res.data.poster_path
        this.$router.push({name:'MovieDetail',params:{movie:res.data,page:'Favorite'}})
      })
      },
      readAllFavorite(){
    const config = this.setToken()
    axios.get(`http://127.0.0.1:8000/movie/favorite_read_all/`,config)
    .then(res=>{
      console.log(res.data,'favorite')
      this.favorite_list = res.data
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
   
    },
    created(){
  const token = localStorage.getItem('jwt')
  if (token){
    this.readAllFavorite()
    
    }else{
      alert('로그인한 회원만 접근할 수 있습니다.')
     this.$router.push({name:'Home'})

    }
  }
  }
</script>

<style scpoed>

#favorite_cards .container { 
    width: 80vw; 
    margin: 0 auto; 
} 
#favorite_cards .button-wrapper { 
    display: flex; 
    justify-content: center; 
    margin-bottom: 25px; 
} 
#favorite_cards .btn { 
    font-size: 1rem; 
    background-color: #42b983; 
    color: white; padding: 10px 20px;
}

#favorite_cards .btn:not(:last-child) { 
    margin-right: 10px;
    margin-left: 10px;
}

.img-1 { 
    width: 100%; 
    height: auto; 
    opacity: 0.7;
    border: 3px solid purple;	
    border-image: linear-gradient(to right,#6A16CD, #5411A4, #be29ec,	#c616cd);
    border-image-slice: 1;
    /* border-radius: 0.8rem;  */
  }

#favorite_cards #cardimg{
  opacity: 1;
}

#favorite_cards .img{
position: relative;
/* background-image: url(https://jaguar.ssl.cdn.sdlmedia.com/636353687510047376OV.jpg?v=24);                                                                */
/* height: 100vh; */
background-size: cover;
}

#favorite_cards .img-cover{
   position: absolute;
   height: 100%;
   width: 100%;
   background-color: rgba(0, 0, 0, 0.7);                                                     
   z-index:1;
}

#favorite_cards .img .content{
 position: absolute;
 top:50px;
 left:20%;
 transform: translate(-50%, -50%);                                                                   
 font-size:2rem;
 color:white;
 z-index: 2;
 text-align: center;
}

#favorite_cards #modal-center {
  height: auto;
  /* width: 700px; */
  min-height: 100%;
  border-radius: 15px; 
}

#favorite_cards #app{
  background-color: black;
}

	
#favorite_cards .cta {
    position: relative;
    margin: auto;
    padding: 19px 22px;
    transition: all .2s ease;
}

#favorite_cards .cta:before {
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

#favorite_cards .cta span {
    position: relative;
    font-size: 16px;
    line-height: 18px;
    font-weight: 900;
    letter-spacing: .25em;
    text-transform: uppercase;
    vertical-align: middle;
}

#favorite_cards .cta svg {
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
}

#favorite_cards .cta:hover:before {
    width: 100%;
    background:#690fcf91;
}

#favorite_cards .cta:hover svg {
    transform: translateX(0);
}

#favorite_cards .cta:active {
    transform: scale(0.96);
}

</style>