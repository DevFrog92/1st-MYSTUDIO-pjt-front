<template>
  <b-container fluid style="width:65%">
      <div>
    <b-button v-b-toggle.sidebar-right>Toggle Sidebar</b-button>
    <b-sidebar id="sidebar-right" title="Sidebar" right shadow width="700px">
      <div class="px-3 py-2">
        <h1>Movie search</h1>
        <input type="text" v-model="title" @keypress.enter="findMovie(title)">
        <b-btn @click="findMovie(title)">Find</b-btn>
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
          <b-btn @click="select(item)">Select</b-btn>
        </b-card>
      </div>
      </div>
    </b-sidebar>
  </div>
  <div v-if="profile" id='body'>
    <div class="form__group field">
  <input type="input" class="form__field" placeholder="Name" name="name" id='name' required v-model="nickname"/>
  <label for="name" class="form__label">NickName</label>
  </div>
    <div class="form__group field">
  <input type="input" class="form__field" placeholder="Name" name="name" id='name' required v-model="description"/>
  <label for="name" class="form__label">Description</label>
  </div>
    <div class="form__group field">
  <input type="input" class="form__field" placeholder="Name" name="name" id='name' required v-model="best_movie_title"/>
  <label for="name" class="form__label">Best Movie Title</label>
  </div>
    <div class="form__group field">
  <input type="input" class="form__field" placeholder="Name" name="name" id='name' required v-model="best_movie_id"/>
  <label for="name" class="form__label">Best Movie id</label>
  </div>
    <div id="checked">
       <div class="row d-flex justify-content-center mt-100">
     <div class="col">
         <div class="card">
             <div class="card-body">
                 <h4 class="card-title">선호 영화 장르 선택(3개이상)</h4>
                 <div > 
                   <p style="font-size:20px; text-align:justify;">
                   <label> <input type="checkbox" class="option-input checkbox"  v-model='genres.sf' /> SF </label> 
                   <label> <input type="checkbox" class="option-input checkbox"  v-model='genres.war'/> War </label> 
                   <label> <input type="checkbox" class="option-input checkbox"  v-model='genres.music'/> Music </label> 
                    <label> <input type="checkbox" class="option-input checkbox" v-model='genres.drama' /> Drama </label> 
                   <label> <input type="checkbox" class="option-input checkbox"  v-model='genres.crime'/> Crime </label> 
                   <label> <input type="checkbox" class="option-input checkbox"  v-model='genres.horror'/> Horror </label> 
                   <label> <input type="checkbox" class="option-input checkbox"  v-model='genres.family'/> Family </label> 
                   <label> <input type="checkbox" class="option-input checkbox"  v-model='genres.comedy'/> Comedy </label> 
                   <label> <input type="checkbox" class="option-input checkbox"  v-model='genres.action'/> Action </label> 
                   </p>
                   <hr>
                   <p style="font-size:20px; text-align:justify;">
                   <label> <input type="checkbox" class="option-input checkbox"  v-model='genres.history'/> History </label> 
                   <label > <input type="checkbox" class="option-input checkbox" v-model='genres.fantasy' /> Fantasy </label> 
                   <label> <input type="checkbox" class="option-input checkbox" v-model='genres.romance' /> Romance </label> 
                   <label> <input type="checkbox" class="option-input checkbox"  v-model='genres.thriller'/> Thriller </label>
                   <label> <input type="checkbox" class="option-input checkbox"  v-model='genres.mystery'/> Mystery </label> 
                   <label> <input type="checkbox" class="option-input checkbox" v-model='genres.animation' /> Animation </label> 
                   <label> <input type="checkbox" class="option-input checkbox" v-model='genres.adventure' /> Adventure </label> 
                   <label> <input type="checkbox" class="option-input checkbox"  v-model='genres.documentary'/> Documentary </label> 
                   </p>
                   <hr>
                </div>
             </div>
         </div>
     </div>
 </div>

    </div>
      <b-button @click="updateProfile(profile)" class="mt-4">Send</b-button>
  
  </div>
  </b-container>
</template>

<script>
import axios from 'axios'
export default {
  name:'UpdateProfile',
  props:{
    profile:{
      type:Object,
    }
  },
  data(){
    return {
        title:'',
        search_list:[],
        description : this.profile.description,
        nickname: this.profile.nickname,
        best_movie_id : this.profile.best_movie_id,
        best_movie_title:this.profile.best_movie_title,
        genres :{
          drama : null,
          action:null,
          fantasy:null,
          animation:null,
          horror:null,
          romance:null,
          adventure:null,
          thriller:null,
          comedy:null,
          mystery:null,
          war:null,
          sf:null,
          crime:null,
          documentary:null,
          family:null,
          history:null,
          music:null,
        }
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
    select(item){
      console.log(item)
      this.best_movie_title = item.title
      this.best_movie_id = item.id
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
    updateProfile(profile){
      console.log(profile)
      console.log(this.genres)
      const config = this.setToken()
      let genreItem = ''
      for (const [key,value] of Object.entries(this.genres)){
        if (value){
          genreItem += `${key}/`
        }
      }
      console.log('sdfsdfsd',genreItem)

      const profileItem = {
        ...profile,
        description : this.description,
        nickname : this.nickname,
        genre : genreItem,
        best_movie_id : this.best_movie_id,
        best_movie_title : this.best_movie_title
      }
      console.log(profileItem)
      axios.put('http://127.0.0.1:8000/community/updateprofile/',profileItem,config)
      .then(res=>{
        console.log(res)
      })
    }
  },
  created(){
    const token = localStorage.getItem('jwt')
    if (token){
      console.log('로그인한 유저')
    }else{
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
    width: 50%;
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
    justify-content: center;
    align-items: left;
    min-height: 100vh;
    font-size: 1.5rem;
    background-color:white;
}



.mt-100 {
    margin-top: 100px
}

.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid #d2d2dc;
    border-radius: 0
}

.card .card-body {
    padding: 1.25rem 1.75rem
}

.card-body {
    flex: 1 1 auto;
    padding: 1.25rem
}

.card .card-title {
    color: #000000;
    margin-bottom: 0.625rem;
    text-transform: capitalize;
    font-size: 0.875rem;
    font-weight: 500
}

.card .card-description {
    margin-bottom: .875rem;
    font-weight: 400;
    color: #76838f
}

p {
    font-size: 0.875rem;
    margin-bottom: .5rem;
    line-height: 1.5rem
}

@keyframes click-wave {
    0% {
        height: 40px;
        width: 40px;
        opacity: 0.15;
        position: relative
    }

    100% {
        height: 200px;
        width: 200px;
        margin-left: -80px;
        margin-top: -80px;
        opacity: 0
    }
}

.option-input {
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    -o-appearance: none;
    appearance: none;
    position: relative;
    top: 13.33333px;
    right: 0;
    bottom: 0;
    left: 0;
    height: 40px;
    width: 40px;
    transition: all 0.15s ease-out 0s;
    background: #cbd1d8;
    border: none;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    margin-right: 0.5rem;
    outline: none;
    position: relative;
    z-index: 1000
}

.option-input:hover {
    background: #9faab7
}

.option-input:checked {
    background: #E91E63
}

.option-input:checked::before {
    height: 40px;
    width: 40px;
    position: absolute;
    content: "\f111";
    font-family: "Font Awesome 5 Free";
    display: inline-block;
    font-size: 26.66667px;
    text-align: center;
    line-height: 40px
}

.option-input:checked::after {
    -webkit-animation: click-wave 0.25s;
    -moz-animation: click-wave 0.25s;
    animation: click-wave 0.25s;
    background: #E91E63;
    content: '';
    display: block;
    position: relative;
    z-index: 100
}

.option-input.radio {
    border-radius: 50%
}

.option-input.radio::after {
    border-radius: 50%
}

label {
  margin-right: 40px;
}
</style>