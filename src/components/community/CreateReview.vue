<template>
  <div>
    <p>CreateReview</p>
  <div id='body'>
    <div>
      <label for="movie_title">Movie Title</label>
      <input type="text" v-model="movie_title" id="movie_title">
    </div>
  <div>
    <label for="number">평점</label>
    <input type="number" id="number" min="1" max="5" v-model="rank">
  </div>
  <div>
    <label for="content">한줄평</label>
    <input type="text" id="content" v-model="content">
  </div>
  <div>
    <label for="content">포스터 경로</label>
    <input type="text" id="content" v-model="poster">
  </div>
  <div>
    <label for="content">영화 아이디</label>
    <input type="text" id="content" v-model="movie_id">
  </div>
    <b-button class="mt-3" v-b-toggle.sidebar-right>영화 찾기</b-button>
    <b-sidebar id="sidebar-right" title="" right shadow width="500px"  backdrop>
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
  <b-button style="margin-top:30px;" @click="sendImage">Submit</b-button>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CreateView',
  data() {
    return {
      movie_title_search:null,
      files :null,
      title:'',
      movie_title:'',
      rank:0,
      content:'',
      like:0,
      search_list:[],
      poster:null,
      movie_id : null,

    }
  },
  methods:{
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
    select(item){
      console.log(item)
      this.movie_title = item.title
      this.poster = item.poster_path
      this.movie_id = item.id
      // 
    },
    findMovie(title){
      console.log(title)
      const key = 'e37c0ae71977e8ad20b5a3f6caa339a1'
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=ko-KR&query=${title}&page=1&include_adult=false`)
      .then(res=>{
        console.log(res.data)
        this.search_list = res.data.results
        this.title = ''
      })
    },
    sendImage(){
      const config = this.setToken()
      let info = new FormData()
      info.append('movie_title',this.movie_title)
      info.append('rank',this.rank)
      info.append('content',this.content)
      info.append('poster_path',this.poster)
      info.append('movie_id',this.movie_id)  
      axios.post('http://127.0.0.1:8000/community/',info,config)
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
    }
  }
} 
</script>

<style scoped>
.form__group {
    position: relative;
    padding: 15px 0 0;
    margin-top: 10px;
    width: 100%;
}

.form__field {
    font-family: inherit;
    width: 100%;
    border: 0;
    border-bottom: 2px solid #9b9b9b;
    outline: 0;
    font-size: 1.6rem;
    color:black;
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
    font-size: 2rem;
    color: #9b9b9b;
}

.form__field:focus {
    padding-bottom: 6px;
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right, #11998e, #38ef7d);
    border-image-slice: 1;
}

.form__field:focus ~ .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: #11998e;
    font-weight: 700;
}

/* reset input */
.form__field:required, .form__field:invalid {
    box-shadow: none;
}

/* demo */
#body {
    font-family: 'Poppins', sans-serif;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    min-height: 100vh;
    font-size: 1.5rem;
    margin-top: 100px ;
    background-color:white;
}
</style>