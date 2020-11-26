<template>
  <b-container fluid style="width:60%;margin-top:9rem">
  <div id='body_CR' style='margin-top:3rem;'>

      <b-button v-b-toggle.sidebar-right class="btn6_search" style="border-radius: 0; background-color:transparent; font-size:12px; font-weight:bold;">Search Movie</b-button>
    <b-sidebar id="sidebar-right" title="" right shadow width="25rem" backdrop>
      <div class="px-3 py-2">
        
        <h2 style="font-weight:bold; margin-bottom:2rem; " class="search_movie">SEARCH MOVIE</h2>
        <input type="input" class="form__field" placeholder="영화제목을 입력해주세요" name="name" id='name'  style="color:black; text-align:center; " @keypress.enter="findMovie(movie_title_search)" required v-model="movie_title_search"/>
        <div class="d-flex justify-content-end mr-1">
          <button style="margin-top:20px;  margin-right:10px; display:block; " class="btn6_side" @click="findMovie(movie_title_search)">FIND</button>
        </div>
          

        <div v-if="search_list.length">

        <div v-for="(item,idx ) in search_list" :key="idx">
        <b-card no-body class="overflow-hidden" style="max-width: 540px; margin-top:20px;">
          <b-row no-gutters>
            <!-- <b-col md="6"> -->
              <b-card-body style="padding:12px;" >
                <b-card-text>
                  <h5 style="font-size:1.1rem; font-weight:bold; margin-top:5px;">{{item.title}}</h5>
                  <p style="font-size:0.8rem; margin:0px;">{{item.release_date}}</p>
                </b-card-text>
              </b-card-body>
            <!-- </b-col> -->
            <!-- <b-col md="6"> -->
              <div style="display:block;" class="justify-content-center">
              <b-card-img :src="'https://image.tmdb.org/t/p/w500'+item.poster_path" alt="Image" style="width:50%; margin:10px; " class="rounded-0"></b-card-img>
              </div>
            <!-- </b-col> -->
          </b-row>
          <div class="d-flex justify-content-center pb-2">
            <button class="btn6_sele"  @click="select(item)">SELECT</button>
          </div>
        </b-card>
      </div>
        </div>
        <div v-else>
          <p style="margin-top:150px; color:red; font-size:1rem;">입력하신 키워드의 영화를 찾지 못하였습니다. <br>영화 제목을 정확하게 입력하시면, <br>보다 정확한 결과를 받을 수 있습니다.</p>
        </div>
      
        </div>
    </b-sidebar>
    
    
      <div class="form__group field">
        <input type="text" class="form__field" v-model="content" placeholder="content" name="content" id='content' required />
        <label for="content" class="form__label">REVIEW</label>
      </div>
      <div class="form__group field">
        <input type="text" class="form__field" v-model="movie_title" placeholder="movie_title" name="movie_title" id='movie_title' required />
        <label for="movie_title" class="form__label">MOVIE TITLE</label>
      </div>
      <div class="form__group field">
        <input type="text" class="form__field" v-model="poster" placeholder="poster" name="content" id='content' required />
        <label for="content" class="form__label">POSTER</label>
      </div>
      <div class="form__group field" >
        <input type="number" class="form__field" v-model="rank" min="1" max="5" placeholder="number" name="number" id='number' required />
        <label for="number" class="form__label">SCORE</label>
      </div>
      <div class="form__group field">
        <input type="text" class="form__field" v-model="movie_id" placeholder="movie_id" name="content" id='content' required />
        <label for="content" class="form__label">MOVIE ID</label>
      </div>
  
    <div class="d-flex justify-content-end ">
      <button id="a" style="text-decoration:none; background-color:transparent; color:white; width:100px; margin-top:4rem; display:block;" @click="sendImage" class="btn6">  Submit  </button>
    </div>
  </div>
  </b-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CreateView',
  props:{
    temp:{
      type:Object
    }
  },
  data() {
    return {
      movie_title_search:null,
      files :null,
      title:'',
      movie_title:this.temp.movie_title,
      rank:this.temp.rank,
      content:this.temp.content,
      like:0,
      search_list:[],
      poster:this.temp.poster_path.slice(31),
      movie_id : this.temp.movie_id,

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
      console.log(this.poster)
      info.append('poster_path',this.poster)
      info.append('movie_id',this.movie_id)  
      axios.put(`http://127.0.0.1:8000/community/${this.temp.id}/`,info,config)
      .then(res=>{
        console.log(res.data)
        // const review = res.data
        this.$router.push({name:'Community'})
      })
    }
  },
  created(){
    const token = localStorage.getItem('jwt')
    if (!token){
       alert('로그인한 회원만 접근할 수 있습니다.')
      this.$router.push({name:'Home'})
    }else{
      console.log(this.temp.poster_path.slice(31))
    }
  }
} 
</script>

<style >
input::placeholder {
  color: red;
}

.container{
  margin:0px;
  padding:0px 0px;
}

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
    border-image: linear-gradient(to right,#6A16CD, #5411A4, #be29ec, #c616cd);
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
    /* padding: 4rem; */
    align-items: center;
    /* min-height: 100vh; */
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



.btn6_search, .btn6_search:link, .btn6_search:visited {
    padding: 13px 0;
    border: 1px solid grey;
    height:35px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-family: 'Noto Sans', sans-serif;
    transition: all .2s ease-in-out;
}

.btn6_search:hover, .btn6_search:link:hover, .btn6_search:visited:hover {
    background: linear-gradient(200deg,#bfbfbf, #8c8c8c);
    border: 1px solid grey;
    color: #fefefe;
    border-radius: 30px;
}

.search_movie{
  font-family: 'Noto Sans', sans-serif;
  color:#6A16CD
}


.btn6_side, .btn6_side:link, .btn6_side:visited {
    padding: 0px 0;
    width:75px;
    height:40px;
    font-family: 'Noto Sans', sans-serif;
    border: 3px solid grey;
    background:transparent;
    color: grey;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 15px;
    letter-spacing: 1px;
    transition: all .2s ease-in-out;
}

.btn6_side:hover, .btn6_side:link:hover, .btn6_side:visited:hover {
    /* background: linear-gradient(100deg,#6A16CD,#c616cd); */
    border: 3px solid #6A16CD;
    /* border-color: linear-gradient(to right,#6A16CD, #5411A4, #be29ec, #c616cd);; */
    border-image: linear-gradient(to right, #6A16CD, #5411A4, #be29ec, #c616cd);
    
    /* border-image-repeat: round; */
    border-image-slice: 1;
    color: #6A16CD;
    
}


.btn6_sele, .btn6_sele:link, .btn6_sele:visited {
    padding: 0px 0;
    width:75px;
    height:40px;
    font-family: 'Noto Sans', sans-serif;
    border: transparent;
    background:transparent;
    color: grey;
    font-weight:bold;
    text-transform: uppercase;
    font-size: 18px;
    letter-spacing: 1px;
    transition: all .2s ease-in-out;
}

.btn6_sele:hover, .btn6_sele:link:hover, .btn6_sele:visited:hover {
    color: #6A16CD;
    font-weight: bold;
    
}



</style>

