<template>
  <div>
  <div id='body_CR'>
      <b-button v-b-toggle.sidebar-right>Search Movie</b-button>
    <b-sidebar id="sidebar-right" title="" right shadow width="25rem"  backdrop>
      <div class="px-3 py-2">
        <h2 style="font-weight:bold; margin-bottom:2rem;">Movie search</h2>
        <input type="input" class="form__field" placeholder="Name" name="name" id='name'  @keypress.enter="findMovie(movie_title_search)" required v-model="movie_title_search"/>
        <b-btn style="margin-top:40px;" @click="findMovie(movie_title_search)">Find</b-btn>
        <div v-if="search_list.length">

        <div v-for="(item,idx ) in search_list" :key="idx">
        <b-card no-body class="overflow-hidden" style="max-width: 540px; margin:20px auto">
          <b-row no-gutters>
            <b-col md="6">
              <b-card-img :src="'https://image.tmdb.org/t/p/w500'+item.poster_path" alt="Image" class="rounded-0"></b-card-img>
            </b-col>
            <b-col md="6">
              <b-card-body title="Horizontal Card">
                <b-card-text>
                  <h5>{{item.title}}</h5>
                  <p>{{item.overview}}</p>
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
          <b-btn  variant="primary" block  @click="select(item)">Select</b-btn>
        </b-card>
      </div>
        </div>
        <div v-else>
          <p style="margin-top:50px; font-size:1rem;">입력하신 키워드의 영화를 찾지 못하였습니다. 영화 제목을 정확하게 입력하면, 보다 정확한 결과를 받을 수 있습니다.</p>
        </div>
      </div>
    </b-sidebar>

    <div class="form__group field">
      <input type="text" class="form__field" v-model="content" placeholder="content" name="content" id='content' required />
      <label for="content" class="form__label">한줄평</label>
    </div>
    <div class="form__group field">
      <input type="text" class="form__field" v-model="movie_title" placeholder="movie_title" name="movie_title" id='movie_title' required />
      <label for="movie_title" class="form__label">movie_title</label>
    </div>
    <div class="form__group field">
      <input type="text" class="form__field" v-model="poster" placeholder="poster" name="content" id='content' required />
      <label for="content" class="form__label">포스터 경로</label>
    </div>

    <div class="form__group field" >
      <input type="number" class="form__field" v-model="rank" min="1" max="5" placeholder="number" name="number" id='number' required />
      <label for="number" class="form__label">평점</label>
    </div>

    <div class="form__group field">
      <input type="text" class="form__field" v-model="movie_id" placeholder="movie_id" name="content" id='content' required />
      <label for="content" class="form__label">영화 아이디</label>
    </div>

  
  <!-- <b-button style="margin-top:30px;" @click="sendImage">Submit</b-button> -->
  <span id="a" style="text-decoration:none; color:white; width:100px; margin-top:4rem;" @click="sendImage" class="btn6">  Submit  </span>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'UpdateReview',
  props:{
    review:{
      type:Object,
    }
  },
  data() {
    return {
      movie_title_search:this.review.movie_title,
      files :null,
      title:this.review.title,
      movie_title:this.review.movie_title,
      rank:this.review.rank,
      user:this.review.user,
      content:this.review.content,
      like:this.review.like,
      movie_id:this.review.movie_id,
      poster:this.review.poster_path,
      search_list:[],

    }
  }, 
  methods:{
     setToken(){
      const token = localStorage.getItem('jwt')
      const config = {
        headers: {
          Authorization:`JWT ${token}`,
          // 'Content-Type': 'multipart/form-data',
        }
      }
      return config
    },
    updateReview(review){
      const config = this.setToken()
      const username = this.$store.state.auth
      console.log(username)
      const reviewItem = {
        ...review,
        title: this.title,
        user:username
      }
      console.log(reviewItem)
      console.log()
      // console.log(event.target.data)
      // this.files = this.$refs.myfiles.files
      // let info = new FormData()
      // info.append('user',this.user)
      // info.append('title',this.title)
      // info.append('movie_title',this.movie_title)
      // info.append('rank',this.rank)
      // info.append('content',this.content)
      // info.append('like_users', this.like)
      // // info.append('files', this.files[0])
      // if (this.files===null){
      //   info.append('files',[])
      // }
      axios.put(`http://127.0.0.1:8000/community/${review.id}/`,reviewItem,config)
      .then(res=>{
        console.log(res.data)
        const review = res.data
        this.$router.push({name:'DetailReview',params: {review}})
      })
    }
  },
  created(){
    const token = localStorage.getItem('jwt')
    if (!token){
       alert('로그인한 회원만 접근할 수 있습니다.')
      this.$router.push({name:'Home'})
    }else{
      console.log('created',typeof this.review)
      if (typeof this.review === undefined){
      this.files = null
      this.review.title = ''
      this.review.movie_title = ''
      this.review.rank = ''
      this.review.content = ''
      this.review.like =''
      }
    }
  }
}
</script>

<style>
.form__group {
    position: relative;
    padding: 15px 0 0;
    margin-top: 10px;
    width: 50%;
}

.form__field {
    font-family: inherit;
    width: 100%;
    border: 0;
    border-bottom: 2px solid #9b9b9b;
    outline: 0;
    font-size: 1.3rem;
    color:white;
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;
}

.form__field::placeholder {
    color: transparent;
}

.form__field:placeholder-shown ~ .form__label {
    font-size: 1.3rem;
    cursor: text;
    top: 20px;
}

.form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: #9b9b9b;

}

.form__field:focus {
    padding-bottom: 6px;
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right,#6A16CD, #5411A4, #be29ec,     #c616cd);
    border-image-slice: 1;
}

.form__field:focus ~ .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color:#6A16CD;
    font-weight: 700;
}

.form__field:required, .form__field:invalid {
    box-shadow: none;

}

#body_CR {
    font-family: 'Poppins', sans-serif;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    padding: 9rem;
    align-items: center;
    min-height: 100vh;
    font-size: 1.5rem;
    background-color:black;
}



.btn6, .btn6:link, .btn6:visited {
    padding: 13px 0;
    border: 1px solid #6A16CD;
    color: #6A16CD;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 2px;
    transition: all .2s ease-in-out;
}

.btn6:hover, .btn6:link:hover, .btn6:visited:hover {
    background: linear-gradient(100deg,#6A16CD,#c616cd);
    border: 1px solid #6A16CD;
    color: #fefefe;
    border-radius: 30px;
}
</style>