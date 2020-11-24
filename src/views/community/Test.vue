<template>
  <div id="app">
    <div class="container mt-5">
      <div class="button-wrapper">
      </div>
      <Stack
              :column-min-width="300"
              :gutter-width="15"
              :gutter-height="15"
              monitor-images-loaded
      >
        <Stack-item
                v-for="(image, i) in reviews"
                :key="i"
                style="transition: transform 300ms"
        >
          <div class="img">
            <div class="content">
              <h1>Text</h1>
            </div>
              <img @click="imageClick(image)" v-b-modal.modal-xl :src="image.poster_path" :alt="image.movie_title" />
              
          </div>
        </Stack-item>
      </Stack>
      <div v-if="temp">
        <b-modal tabindex="-1" id="modal-xl" size="xl" centered :title="temp.movie_title">
            <b-card no-body class="overflow-hidden" style="max-width: 100%;">
              <b-row no-gutters>
                <b-col md="4">
                  <b-card-img :src="temp.poster_path" alt="Image" class="rounded-0" id='cardimg'></b-card-img>
                </b-col>
                <b-col md="8">
                  <div class="m-3 ">
                    <h2>{{temp.movie_title}} <span>{{temp.rank}}</span> </h2>
                    <b-card-text>
                      {{temp.content}}
                      <p>{{temp.created_at}}</p>
                    </b-card-text>
                    <hr>
                    <div class="d-flex justify-content-between"><b-form-input style="width:85%;height:50px;" @keypress.enter="createComment(temp)" v-model="comment"></b-form-input><b-button @click="createComment(temp)">Submit</b-button></div>
                    <hr>
                    <ol>
                      <li v-for="(comment,idx) in comment_list" :key='idx'><div class="d-flex justify-content-between"><p class="mx-3">{{comment.content}}</p><p class="mx-3">By : {{comment.username}}</p><b-btn @click="commentDelete(comment)">DELETE</b-btn></div></li>
                    </ol>
                  </div>
                </b-col>
              <p><b-btn @click="likeReview(temp)">좋아요</b-btn> {{count}} 명이 이 글을 좋아합니다.</p>
              </b-row>
            </b-card>
          </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import { Stack, StackItem } from "vue-stack-grid"
export default {
  name :'Test',
  data() {
   return {
     images: [] ,
     reviews :[],
     temp:null,
     comment:null,
     comment_list:[],
     count:null,
     liked:null,
   }
  },
  components: { 
    Stack, 
    StackItem 
  },
  methods:{
    setToken(){
      const token = localStorage.getItem('jwt')
      const config = {
        headers: {
          Authorization:`JWT ${token}`
        }
      }
      return config
    },
    commentDelete(comment){
      const config = this.setToken()
      axios.delete(`http://127.0.0.1:8000/community/${comment.id}/delete_comment/`,config)
      .then(res=>{
        console.log(res.data)
        this.readComment(this.temp)
      })
    },
    readComment(temp){
      const config = this.setToken()
      axios.get(`http://127.0.0.1:8000/community/review/${temp.id}/read_create_comment/`,config)
      .then(res=>{
        this.comment_list = res.data
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
    imageClick(image){
      console.log(image)
      this.temp = image
      this.getlike(this.temp)
      this.readComment(this.temp)
    },
    searchUnsplash(topic) { 
    this.images = []; 
    axios.get( `https://api.unsplash.com/search/photos?query=${topic}&per_page=20`, 
    { 
        headers: { 
           Authorization: " Client-ID ZHS0GflBeSXFQJF7m-d4XoxtD4ioc698K6-oxlhgwP8", 
           "Accept-Version": "v1" 
        } 
    }) 
    .then(response => { 
        this.images = response.data.results;
        console.log(this.images)
    })
    .catch(() => { 
       this.images = []; 
    }); 
    },
    getReview(){
      this.reviews = []
      const config = this.setToken()
      axios.get('http://127.0.0.1:8000/community/',config)
      .then(res=>{
        for (const r of res.data){
          const resItm = {
            ...r,
            poster_path : 'https://image.tmdb.org/t/p/w500' + r.poster_path
          }
          this.reviews.push(resItm)
        }
        console.log(this.reviews)
      })
    },
  },
  created(){
    const token = localStorage.getItem('jwt')
    if (token){
    this.getReview()
    }else{
      alert('로그인한 회원만 접근할 수 있습니다.')
      this.$router.push({name:'Home'})
    }
  }
}
</script>

<style scoped>
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
    font-size: 18px; 
    background-color: #42b983; 
    color: white; padding: 10px 20px;
}

.btn:not(:last-child) { 
    margin-right: 10px; 
}

img { 
    width: 100%; 
    height: auto; 
    border-radius: 12px; 
    opacity: 0.7;
}

#cardimg{
  opacity: 1;
}

.img{
position: relative;
/* background-image: url(https://jaguar.ssl.cdn.sdlmedia.com/636353687510047376OV.jpg?v=24);                                                                */
/* height: 100vh; */
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
 top:8%;
 left:15%;
 transform: translate(-50%, -50%);                                                                   
 font-size:5rem;
 color:white;
 z-index: 2;
 text-align: center;
}

#modal-center {
  height: auto;
  /* width: 700px; */
  min-height: 100%;
  border-radius: 15px; 
}

</style>