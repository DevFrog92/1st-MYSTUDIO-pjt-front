<template>
  <div id="app" style="background-color:black;">

    <div class="container" style="padding-top:5rem">
      <a style="text-decoration:none; color:white; cursor: pointer;" class="cta" @click="goToCreate">
  <span> + Review</span>
</a> 
      <div class="button-wrapper mt-5">
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
              <img @click="imageClick(image)" v-b-modal.modal-xl :src="image.poster_path" :alt="image.movie_title" />
            <div class="content">
              <b-btn  @click="btnClick(image)" v-b-modal.modal-lg>{{image.username}}</b-btn>
            </div>
            
              
          </div>
        </Stack-item>
      </Stack>


      <div v-if="temp">
        <b-modal tabindex="-1" id="modal-lg" size="lg" centered :title="temp.movie_title" >
            <b-card no-body class="overflow-hidden" style="max-width: 100%;">
              
              <b-row no-gutters >
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
                    <!-- 가져가지 마세요!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! -->
                    <h2 style="font-family: 'Noto Sans', sans-serif; font-size:10px;">{{movie.title}}</h2>
                    <b-card-text>
                      <p>{{movie_review.content}}</p>
                    </b-card-text>
                    <b-card-text>
                      {{movie_review.author_details.rating}}
                      <p>Reporting date : {{movie_review.created_at}}</p>
                    </b-card-text>
                    <a href="#" class="card-link">Card link</a>
                    <b-link href="#" class="card-link">Another link</b-link>
              
                    </li>
                </ul>
              </b-row>

          
            </b-card>
        </b-modal>


        <b-modal tabindex="-1" id="modal-xl" size="lg" centered :title="temp.movie_title">
            <b-card no-body class="overflow-hidden" style="max-width: 100%;">
              <div style=" font-family:'Noto Sans', sans-serif; text-transform: uppercase;">
              <b-row no-gutters>
                    <div class="m-0 pt-4" style="height:70px; width:100%; text-align:center; font-size:22px; font-weight:bold; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black; color:white;" >{{temp.username}}의  '{{temp.movie_title}}'  REVIEW</div>
                <!-- <b-col md="4"> -->
                  <div class="d-flex ">
                    <div style="display:inline-block;">
                  <b-card-img :src="temp.poster_path" alt="Image" class="rounded-0" id='cardimg' style="width:180px; margin:8px 25px;  "></b-card-img>
                    </div>

                    <div style="display:inline-block; margin-top:40px"  >
                     <span style="font-size:16px; ">STAR RANK : </span><b-icon-star-fill style="color:yellow; font-size:25px; "></b-icon-star-fill><span style="text-transform:none; "> x {{temp.rank}} </span> 
                      <br>
                      <h6 style="font-size:16px; margin-top:25px;">REVIEW</h6>
                      <h6 style="text-indent:10px; font-size:19px; font-weight:bold;">{{temp.content}}</h6>
                      <br>
                      <p  @click="likeReview(temp)" style="color:#6A16CD; font-size:20px; margin-top:20px;cursor:pointer;"><b-icon-heart-fill></b-icon-heart-fill> <span style="color:black; font-size:15px; font-weight:bold; "> {{count}} 명이 이 글을 좋아합니다.</span></p>
                      <h6 style="font-size:14px; margin-top:5px; ;">posting date : {{temp.created_at}}</h6>
                      
                    </div>
                <!-- </b-col> -->
                  </div>
                <b-col md="8">
                  <div class="m-3 ">
                  
                    
                    <div class="d-flex justify-content-between"><b-form-input style="width:85%;height:50px;" @keypress.enter="createComment(temp)" v-model="comment"></b-form-input><b-button class="p-1" @click="createComment(temp)">Submit</b-button></div>
                    
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
                           <!-- <div class="d-flex justify-content-end mr-1">
          <button style="margin-top:20px;  margin-right:10px; display:block; " class="btn6_side" @click="findMovie(title)">FIND</button>
        </div> -->
                      <div class="d-flex justify-content-between"><b-form-input v-model='comment_update' style="width:85%;height:50px;" @keypress.enter="updateComment(comment)"></b-form-input><button class="p-1 btn6_side" @click="updateComment(comment)">Submit</button></div>  
                      </div>
                  </div>
                </b-col>
              </b-row>
              </div>

              <!-- <star-rating :config="config"></star-rating> -->
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
     updating:true,
     comment_update:null,
     temp_comment:null,
     video_url :'https://www.youtube.com/embed/',
     movie_reviews:[],
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
  components: { 
    Stack, 
    StackItem,
  },
  methods:{
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
    commentUpdate(comment){
      console.log(comment)
      console.log('upatecomment')
      this.temp_comment_id = comment.id
      this.comment_update = comment.content
      this.updating = false
    },
    setToken(){
      const token = localStorage.getItem('jwt')
      const config = {
        headers: {
          Authorization:`JWT ${token}`
        }
      }
      return config
    },
    goToCreate () {
      const token = localStorage.getItem('jwt')
      if (token){
        this.$router.push({name:'CreateReview'})
      }else{
        alert('로그인한 회원만 접근할 수 있습니다.')
        this.$router.push({name:'Home'})
      }
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
    imageClick(image){
      console.log(image)
      this.temp = image
      this.getlike(this.temp)
      this.readComment(this.temp)
    },
    btnClick(image){
      this.temp = image
      this.video_url = 'https://www.youtube.com/embed/'
      this.getlike(this.temp)
      this.getVideos(this.temp)
      this.getMovieReview(this.temp)
    },
    getVideos(temp){
      const key = 'e37c0ae71977e8ad20b5a3f6caa339a1'
      const movie_id = temp.movie_id
      console.log(movie_id)
      axios.get(`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${key}&language=en-US`)
      .then(res=>{
        console.log(res.data)
        console.log(res.data.results[0].key)
        this.video_url = this.video_url + res.data.results[0].key
        console.log(this.video_url)
      })
    },
    getMovieReview(temp){
      const key = 'e37c0ae71977e8ad20b5a3f6caa339a1'
      const movie_id = temp.movie_id
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
            poster_path : 'https://image.tmdb.org/t/p/w500' + r.poster_path,
            created_at : r.created_at.slice(0,10)
          }
          this.reviews.push(resItm)
        }
        console.log(this.reviews)
      })
    },
    updateReview(temp){
      this.$router.push({name:'UpdateReview',params: {review:temp}})
    }
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
 top:50px;
 left:20%;
 transform: translate(-50%, -50%);                                                                   
 font-size:2rem;
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

#app{
  background-color: black;
}

	
.cta {
    position: relative;
    margin: auto;
    padding: 19px 22px;
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

.cta svg {
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

.cta:hover:before {
    width: 100%;
    background:#690fcf91;
}

.cta:hover svg {
    transform: translateX(0);
}

.cta:active {
    transform: scale(0.96);
}
</style>