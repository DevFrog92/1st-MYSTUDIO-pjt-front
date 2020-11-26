<template>
  <div class="favorite_cards">
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
              <img class="this_image" @click="imageClick(image)" v-b-modal.modal-xl :src="image.poster_path" :alt="image.movie_title" />
            <div class="content">
              <b-btn  @click="btnClick(image)" v-b-modal.modal-lg>{{image.username}}</b-btn>
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

        <b-modal tabindex="-1" id="modal-xl" size="xl" centered :title="temp.movie_title">
            <b-card no-body class="overflow-hidden" style="max-width: 100%;">
              <b-row no-gutters>
                <b-col md="4">
                  <b-card-img :src="temp.poster_path" alt="Image" class="rounded-0" id='cardimg'></b-card-img>
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

          </b-modal>
      </div>
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
    favorite(movie){
      console.log(movie)
      const config = this.setToken()
      const movieItem = new FormData()
      movieItem.append('movie_title',movie.title)
      movieItem.append('poster_path',movie.poster_path)
      movieItem.append('movie_id',movie.id)
      movieItem.append('overview',movie.overview)
      movieItem.append('genre',movie.genre_ids)

      axios.post(`http://127.0.0.1:8000/movie/${movie.id}/favorite_read_save/`,movieItem,config)
      .then(res=>{
        console.log(res.data)
        this.readAllFavorite()
      })

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

img { 
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