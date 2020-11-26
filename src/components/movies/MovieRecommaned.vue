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
    <div v-if="genre_name" >
      <h1 class="m-5">
      <span v-for="(name,idx) in genre_name" :key='idx'>
         <b-btn @click="onclick(name)"><h3>{{name.toUpperCase()}} </h3></b-btn>| 
      </span>
      </h1>
    </div>
    <div v-if="show_movie_list.length">
  









    <div class="container" style="padding-top:5rem">
      <div class="button-wrapper mt-5">
      </div>
      <Stack
              :column-min-width="300"
              :gutter-width="15"
              :gutter-height="15"
              monitor-images-loaded
      >
        <Stack-item
                v-for="(image, i) in show_movie_list"
                :key="i"
                style="transition: transform 300ms"
        >
          <div class="img">
              <img @click="btnClick(image)" v-b-modal.modal-lg :src="'https://image.tmdb.org/t/p/w500'+image.poster_path" :alt="image.movie_title" />
            <div class="content">
            </div>
              
          </div>
        </Stack-item>
      </Stack>
      <div v-if="temp">
        <b-modal tabindex="-1" id="modal-lg" size="lg" centered :title="temp.movie_title">
            <b-card no-body class="overflow-hidden" style="max-width: 100%;">
              <b-row no-gutters>
                <b-embed
                  type="iframe"
                  aspect="16by9"
                  :src="video_url"
                  allowfullscreen>
                  </b-embed>  
              <p><b-btn class="p-1 m-4" @click="likeReview(temp)">좋아요</b-btn> {{count}} 명이 이 글을 좋아합니다.</p>
              </b-row>
              <hr>
              <b-row>
                <ul>
                  <li v-for="(movie_review,idx) in movie_reviews" :key='idx'>
                    <b-card :title="movie_review.auth" >
                    <b-card-text>
                      <p>{{movie_review.content}}</p>
                    </b-card-text>
                    <b-card-text>
                      {{movie_review.author_details.rating}}
                      <p>Reporting date : {{movie_review.created_at}}</p>
                    </b-card-text>
                    <a href="#" class="card-link">Card link</a>
                    <b-link href="#" class="card-link">Another link</b-link>
                  </b-card>
                    </li>
                </ul>
              </b-row>
            </b-card>
        </b-modal>

        <!-- <b-modal tabindex="-1" id="modal-xl" size="xl" centered :title="temp.movie_title">
            <b-card no-body class="overflow-hidden" style="max-width: 100%;">
              <b-row no-gutters>
                <b-col md="4">
                  <b-card-img :src="'https://image.tmdb.org/t/p/w500'+temp.poster_path" alt="Image" class="rounded-0" id='cardimg'></b-card-img>
                </b-col>
                <b-col md="8">
                  <div class="m-3 ">
                    <div class="d-flex justify-content-between mb-3">
                    <h2 class="m-0">{{temp.movie_title}} <span>{{temp.rank}}</span> </h2>
                    <h5 class="m-0 pt-3" >Written by : {{temp.username}}</h5>
                    </div>
                    <b-card-text >
                      <p>{{temp.content}}</p>
                      <div class="d-flex justify-content-end">
                      <p style="margin-right:0;">Reporting date : {{temp.created_at}}</p>
                      </div>
                    </b-card-text>
                    <hr>
                    <div class="d-flex justify-content-between"><b-form-input style="width:85%;height:50px;" @keypress.enter="createComment(temp)" v-model="comment"></b-form-input><b-button class="p-1" @click="createComment(temp)">Submit</b-button></div>
                    <hr>
                      <div v-if="updating">
                    <ol>
                      <li v-for="(comment,idx) in comment_list" :key='idx'>
                          <div class="d-flex justify-content-between">
                          <div>
                          <p class="mx-3 d-inline">{{comment.content}}</p>
                          </div>
                          <div>
                          <p class="mb-0 d-inline"><span class="d-block"> By : {{comment.username}} </span><span> created at : {{comment.created_at}}</span></p>
                          <b-btn class="p-1" @click="commentUpdate(comment)">UPDATE</b-btn>
                          <b-btn class="p-1" @click="commentDelete(comment)">DELETE</b-btn>
                          </div>
                          </div>
                      </li>
                    </ol>
                      </div>
                      <div v-else>
                      <div class="d-flex justify-content-between"><b-form-input v-model='comment_update' style="width:85%;height:50px;" @keypress.enter="updateComment(comment)"></b-form-input><b-button class="p-1" @click="updateComment(comment)">Submit</b-button></div>  
                      </div>
                  </div>
                </b-col>
              <p><b-btn class="p-1" @click="likeReview(temp)">좋아요</b-btn> {{count}} 명이 이 글을 좋아합니다.</p>
              </b-row>
              <star-rating :config="config"></star-rating>
            </b-card>

          </b-modal> -->
      </div>
    </div>










    </div>
    <div v-else>
      <h1>현재 추천할 영화가 없습니다.</h1>
    </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ScaleLoader from 'vue-spinner/src/ScaleLoader'
import { Stack, StackItem } from "vue-stack-grid"

export default {
  name : 'MovieRecommaned',
  components:{
    ScaleLoader,
    Stack, 
    StackItem,
  },
  data (){
    return {
      color: '#6c5ce7' ,
      comment:null,
     comment_list:[],
     count:null,
     liked:null,
      temp:null,
      size: '500px',
      loading:false,
      show_movie_list:[],
      video_url :'https://www.youtube.com/embed/',
      genre : [],
      movie_reviews:[],
      updating:true,
      recommand : this.$store.state.recommand,
      genre_name : this.$store.state.genre_name,
      genre_id : {'drama':18,'fantasy':14,'horror':27,'romance':10749,'adventure':12,'thriller':53,
    'comedy':35,'mystery':9648,'war':10752,'action':28,'sf':878,'animation':16,'crime':80,'documentary':99,
    'family':10751,'history':36,'music':10402},
    config: {
            rating: 3,
            style: {
                fullStarColor: '#ed8a19',
                emptyStarColor: '#737373',
                starWidth: 30,
                starHeight: 30
            }
        }
    }
  },
  methods:{
    getVideos(temp){
      this.video_url = 'https://www.youtube.com/embed/'
      const key = 'e37c0ae71977e8ad20b5a3f6caa339a1'
      const movie_id = temp.id
      console.log(movie_id)
      axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${key}&language=en-US`)
      .then(res=>{
        console.log('성공ㅇㅇㅇㅇㅇㅇㅇㅇ')
        console.log(res.data,'dddddddddddddddddddd')
        console.log(res.data.results[0].key)
        this.video_url = this.video_url + res.data.results[0].key
        console.log(this.video_url,'dddddddddddddddddddd')
      })
    },
    getMovieReview(temp){
      const key = 'e37c0ae71977e8ad20b5a3f6caa339a1'
      const movie_id = temp.id
      console.log(movie_id)
      
      axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/reviews?api_key=${key}&language=en-US&page=1`)
      .then(res=>{
        console.log(res.data)
        this.movie_reviews = res.data.results
        this.movie_reviews = this.movie_reviews.map(review=>{
          const item = {
            ...review,
            created_at: review.created_at.slice(0,10)
          }
          return item
        })
      })
    },
    
     commentDelete(comment){
      const config = this.setToken()
      axios.delete(`http://127.0.0.1:8000/community/${comment.id}/delete_comment/`,config)
      .then(res=>{
        console.log(res.data)
        this.readComment(this.temp)
      })
    },
    commentUpdate(comment){
      console.log(comment)
      console.log('upatecomment')
      this.temp_comment_id = comment.id
      this.comment_update = comment.content
      this.updating = false
    },
    updateComment(comment){
      console.log(comment)
      const config = this.setToken()
      const commentItem = new FormData()
      commentItem.append('content',this.comment_update)
      axios.put(`http://127.0.0.1:8000/community/review/${this.temp_comment_id}/delete_update_comment/`,commentItem,config)
      .then(()=>{
        this.readComment(this.temp)
        this.comment = ''
        this.updating = true
        
      })
    },
    imageClick(image){
      console.log(image)
      this.temp = image
      this.getlike(this.temp)
      this.readComment(this.temp)
    },
    readComment(temp){
      const config = this.setToken()
      axios.get(`http://127.0.0.1:8000/community/review/${temp.id}/read_create_comment/`,config)
      .then(res=>{
        this.comment_list = res.data
        this.comment_list = this.comment_list.map(comment=>{
          const item = {
            ...comment,
            created_at : comment.created_at.slice(0,10)
          }
          return item
        })
      })
    },
    createComment(temp){
      const config = this.setToken()
      const commentItem = new FormData()
      commentItem.append('content',this.comment)
      axios.post(`http://127.0.0.1:8000/community/review/${temp.id}/read_create_comment/`,commentItem,config)
      .then(()=>{
        this.readComment(this.temp)
        this.comment = ''
        
      })
    },
    likeReview(temp){
      const config = this.setToken()
      axios.post(`http://127.0.0.1:8000/community/${temp.id}/like/`,{},config)
      .then(res=>{
        console.log('ㄴㅇㄹㄴㅇㄹ',res.data)
        this.getlike(this.temp)
      })
    },
    getlike(temp){
      const config = this.setToken()
      axios.get(`http://127.0.0.1:8000/community/${temp.id}/like/`,config)
      .then(res=>{
        this.count = res.data.count
        this.liked = res.data.liked
      })
    },
    btnClick(image){
      this.temp = image
      console.log(image,'dddddddddddddddddddddddddddddddddddddddddddddddddddddddd')
      this.video_url = 'https://www.youtube.com/embed/'
      // this.getlike(this.temp)
      this.getVideos(this.temp)
      this.getMovieReview(this.temp)
    },
    onClickDetail(movie){
      console.log(movie)
      const movieItem ={
        ...movie,
        poster_path: 'https://image.tmdb.org/t/p/w500' + movie.poster_path
      }
      this.$router.push({name:'MovieDetail',params:{movie:movieItem,page:'Recommand'}})

    },
    onclick(name){
      console.log(name)
      this.show_movie_list = this.recommand[name]
      console.log(this.show_movie_list)
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
      this.$store.dispatch('removeList',[])
      this.$store.dispatch('removeName',[])
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
    console.log(this.genre_name,'dfgdfgfd')
    for (const key of this.genre_name){
      if(this.recommand[key].length > this.show_movie_list.length ){
        this.show_movie_list = this.recommand[key]
      }
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

.container { 
    width: 80vw; 
    margin: 0 auto; 
} 
.button-wrapper { 
    display: flex; 
    justify-content: center; 
    margin-bottom: 25px; 
} 
.btn { 
    font-size: 1rem; 
    background-color: #42b983; 
    color: white; padding: 10px 20px;
}

.btn:not(:last-child) { 
    margin-right: 10px;
    margin-left: 10px;
}

img { 
    width: 100%; 
    height: auto; 
    opacity: 0.7;
    border: 3px solid purple;	
    border-image: linear-gradient(to right,#6A16CD, #5411A4, #be29ec,	#c616cd);
    border-image-slice: 1;
    /* border-radius: 0.8rem;  */
  }

#cardimg{
  opacity: 1;
}

.img{
position: relative;
background-size: cover;
}

.img-cover{
   position: absolute;
   height: 100%;
   width: 100%;
   background-color: rgba(0, 0, 0, 0.7);                                                     
   z-index:1;
}

.img .content{
 position: absolute;
 top:50px;
 left:20%;
 transform: translate(-50%, -50%);                                                                   
 font-size:2rem;
 color:white;
 z-index: 2;
 text-align: center;
}
</style>