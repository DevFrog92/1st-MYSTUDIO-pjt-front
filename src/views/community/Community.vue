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
              <span  @click="btnClick(image)" class="btn_ML third" v-b-modal.modal-lg>Preview</span>
            </div>
            
              
          </div>
        </Stack-item>
      </Stack>


      <div v-if="temp">
        <b-modal tabindex="-1" id="modal-lg" size="lg" centered :title="temp.movie_title" >
            <b-card no-body class="overflow-hidden bg-dark " style="max-width: 100%;color:white;" >
              
              <b-row no-gutters >
                <b-embed
                  type="iframe"
                  aspect="16by9"
                  :src="video_url"
                  allowfullscreen>
                  </b-embed>  
              <p @click="likeReview(temp)" style="color:#6A16CD; font-size:20px; margin-top:20px;cursor:pointer; margin-left:15px">
                        <span v-if="liked" class="mr-1">
                        <b-icon-heart-fill></b-icon-heart-fill> 

                        </span>
                        <span v-else class="mr-1" >
                        <b-icon-heart></b-icon-heart> 

                        </span>
                        <span style="color:black; font-size:15px; font-weight:bold; color:white;"> {{count}} 명이 이 글을 좋아합니다.</span>
                        </p>
              </b-row>
              <hr>
              <b-row class='bg-dark'>
                <ul>
                  <li v-for="(movie_review,idx) in movie_reviews" :key='idx' style=" list-style-type : none">
                    <!-- 가져가지 마세요!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! -->
                    <b-card-text  >
                      <p class="txt_post" style="width:97%;text-align:justify;">{{movie_review.content}}</p>
                    </b-card-text>
                    <b-card-text >
                      <span style="font-size:16px; ">STAR RANK : </span><span style="text-transform:none; ">{{movie_review.author_details.rating}} x <b-icon-star-fill style="color:yellow; font-size:25px; "></b-icon-star-fill> </span>
                      
                      <p>Reporting date : {{movie_review.created_at}}</p>
                    </b-card-text>
              
                    </li>
                </ul>
              </b-row>

          
            </b-card>
        </b-modal>


        <b-modal tabindex="-1" id="modal-xl" size="lg" centered :title="temp.movie_title">
            <b-card no-body class="overflow-hidden " style="max-width: 100%;">
              <div style=" font-family:'Noto Sans', sans-serif; text-transform: uppercase;">
              <b-row no-gutters>
                    <div class="m-0 pt-4" style="height:70px; width:100%; text-align:center; font-size:22px; font-weight:bold; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black; color:white; letter-spacing:1.5px;" >{{temp.username}}의  '{{temp.movie_title}}'  REVIEW</div>
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
                      <p @click="likeReview(temp)" style="color:#6A16CD; font-size:20px; margin-top:20px;cursor:pointer;">
                        <span v-if="liked" class="mr-1">
                        <b-icon-heart-fill></b-icon-heart-fill> 

                        </span>
                        <span v-else class="mr-1" >
                        <b-icon-heart></b-icon-heart> 

                        </span>
                        <span style="color:black; font-size:15px; font-weight:bold; "> {{count}} 명이 이 글을 좋아합니다.</span>
                        </p>
                      <h6 style="font-size:14px; margin-top:5px; ;">posting date : {{temp.created_at}}</h6>
                      
                    </div>
                <!-- </b-col> -->
                  </div>
                
                  <div>
                  
                    
                      <div style=" margin-left: 55px; margin-top:10px;">
                      <h6 style="font-size:15px; font-weight:bold; color:#6A16CD;"><b-icon-chat-right-dots></b-icon-chat-right-dots> comment</h6></div>
                      <input v-model='comment' type="text" class="choose" style="width:550px;height:40px; margin-left:75px;"  @keypress.enter="createComment(temp)"><button class="p-1 btn6_side2"  @click="createComment(comment)">Submit</button>  
                      
                    
                    
                      <div v-if="updating">
                        <div style="margin-left:50px; margin-top:9px">

                    <ul style="list-style:none;">
                      <li v-for="(comment,idx) in comment_list" :key='idx'>
                         
                          <div>
                          <p class="mb-0 d-inline"> <b-icon-arrow-return-right style="color:#6A16CD; font-weight:bold; font-size:20px;"></b-icon-arrow-return-right><span style="font-size:13px; margin-left:7px;"> created at : {{comment.created_at}}</span></p>
                          <button class="btn6_sele3" style="margin-left:5px;" @click="commentUpdate(comment)">EDIT</button>
                          <button class="btn6_sele3" @click="commentDelete(comment)">DELETE</button>
                          </div>
                          <div class="d-block" style=" margin-left:10px;">
                          <p class="mx-3 d-inline" style="color:#6A16CD"><span style="font-size:15px; font-weight:bold;">  {{comment.username}} : </span><span style="width:"> {{comment.content}}</span></p>
                          </div>
                          
                      </li>
                    </ul>
                        </div>
                      </div>
                      <div v-else>
                      <input v-model='comment_update' type="text" class="choose" style="width:550px;height:40px; margin-left:75px;"  @keypress.enter="updateComment(comment)"><button class="p-1 btn6_side2"  @click="updateComment(comment)">Submit</button>                        
                      </div>
                  </div>
                
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
      axios.delete(`http://127.0.0.1:8000/community/review/${comment.id}/delete_update_comment/`,config)
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
        console.log(res.data)
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
.choose {
    border:1px solid grey;
    margin-right:3px;
    border-radius:2px;
}
.choose:focus {
  outline:1px solid #b382ec;
    border-radius:2px;
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


.btn6_side2, .btn6_side2:link, .btn6_side2:visited {
    padding: 0px 0;
    width:75px;
    height:40px;
    margin-left:2px;
    font-family: 'Noto Sans', sans-serif;
  
    background:transparent;
  
    font-weight: 700;
    text-transform: uppercase;
    font-size: 13px;
    letter-spacing: 1px;
    transition: all .2s ease-in-out;
     border: 3px solid #6A16CD;
    border-image: linear-gradient(to right, #6A16CD, #5411A4, #be29ec, #c616cd);
    border-image-slice: 1;
    color: #6A16CD;
}

.btn6_side2:hover, .btn6_side2:link:hover, .btn6_side2:visited:hover {
    border: 3px solid #6A16CD;
    border-image: linear-gradient(to right, #6A16CD, #5411A4, #be29ec, #c616cd);
    border-image-slice: 1;
    color: #6A16CD;
     color: grey;
       border: 3px solid grey;
}



.btn6_sele3, .btn6_sele3:link, .btn6_sele3:visited {
    padding: 10px 0;
    width:50px;
    height:20px;
    font-family: 'Noto Sans', sans-serif;
    border: transparent;
    background:transparent;
    color: grey;
    font-weight:bold;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 0.5px;
    transition: all .2s ease-in-out;
}

.btn6_sele3:hover, .btn6_sele3:link:hover, .btn6_sele3:visited:hover {
    color: #6A16CD;
    font-weight: bold;
}



.btn_ML {
    box-sizing: border-box;
    width:70%;
    appearance: none;
    background-color: transparent;
    border: 1px solid #fff;
    border-radius: 0.6em;
    cursor: pointer;
    display: inline-block;
    align-self: center;
    font-size: 0.9rem;
    font-weight: 400;
    line-height: 1;
    margin: 20px;
    padding: 20px 10px;
    text-decoration: none;
    text-align: center;
    text-transform: uppercase;
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
}

.btn_ML:hover, .btn_ML:focus {
    color: #fff;
    outline: 0;
}


.txt_post {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* 라인수 */
    -webkit-box-orient: vertical;
    word-wrap:break-word; 
    line-height: 1.2em;
    height: 3.6em; /* line-height 가 1.2em 이고 3라인을 자르기 때문에 height는 1.2em * 3 = 3.6em */
  }
</style>