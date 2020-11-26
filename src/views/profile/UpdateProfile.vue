<template>
  <b-container fluid style="width:65%; margin-top:70px;" class="word">
     
  <div v-if="profile" style="background-color:black;">
  <b-row>

  <b-col>
  <div class="form__group field">
  <input type="text" class="form__field" placeholder="nickname" name="nickname" id='nickname' v-model="nickname" required />
  <label for="nickname" class="form__label">NickName</label>
  </div>
    <div class="form__group field mt-3">
  <input type="text" class="form__field" placeholder="description" name="description" id='description' v-model="description" required />
  <label for="description" class="form__label">Description</label>
  </div>
    <div class="form__group field mt-3">
  <input type="text" class="form__field" placeholder="besttitle" name="besttitle" id='besttitle' v-model="best_movie_title_1" required />
  <label for="besttitle" class="form__label">Best No.1 Movie Title</label>
  </div>
    <div class="form__group field mt-3">
  <input type="text" class="form__field" placeholder="besttitle" name="besttitle" id='besttitle' v-model="best_movie_title_2" required />
  <label for="besttitle" class="form__label">Best No.2 Movie Title</label>
  </div>
    <div class="form__group field mt-3">
  <input type="text" class="form__field" placeholder="besttitle" name="besttitle" id='besttitle' v-model="best_movie_title_3" required />
  <label for="besttitle" class="form__label">Best No.3 Movie Title</label>
  </div>
  </b-col>
  <b-col style="position:relative;">
    <div style="position:absolute; top:50%; left:40%">

      <b-button v-b-toggle.sidebar-right class="btn6_search" style="border-radius: 0; background-color:transparent; font-size:12px; font-weight:bold;">Search Movie</b-button>
    <b-sidebar id="sidebar-right" title="" right shadow width="25rem" backdrop>
      <div class="px-3 py-2">
        
        <h2 style="font-weight:bold; margin-bottom:2rem; " class="search_movie">SEARCH MOVIE</h2>
        <input type="input" class="form__field" placeholder="영화제목을 입력해주세요" name="name" id='name'  style="color:black; text-align:center; " @keypress.enter="findMovie(title)" required v-model="title"/>
        <div class="d-flex justify-content-end mr-1">
          <button style="margin-top:20px;  margin-right:10px; display:block; " class="btn6_side" @click="findMovie(title)">FIND</button>
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
    
    </div>

  </b-col>
  </b-row>
    <div id="checked" >
       <div class=" d-flex justify-content-center mt-100">
     <!-- <div class="col"/> -->
         <div class="card2">
             <div class="card-body2" style="background-color:black; color:white">
                 <p style="font-weight:bold; font-size:27px;"> CHOOSE FAVORITE MOVIE GENRE</p>
                 <p style="color:red;">please choose three or more</p> 
                 <hr>
                 <div > 
                   <p style="font-size:1rem; text-align:justify;">
                   <div style="width:150px; display:inline-block"> <input type="checkbox" class="option-input checkbox"  v-model='genres.sf' /> SF </div> 
                   <div style="width:150px; display:inline-block"> <input type="checkbox" class="option-input checkbox"  v-model='genres.war'/> War </div> 
                   <div style="width:150px; display:inline-block"> <input type="checkbox" class="option-input checkbox"  v-model='genres.music'/> Music </div> 
                    <div style="width:150px; display:inline-block"> <input type="checkbox" class="option-input checkbox" v-model='genres.drama' /> Drama </div> 
                   <div style="width:150px; display:inline-block"> <input type="checkbox" class="option-input checkbox"  v-model='genres.crime'/> Crime </div> 
                   <div style="width:150px; display:inline-block"> <input type="checkbox" class="option-input checkbox"  v-model='genres.horror'/> Horror </div> 
                   <div style="width:150px; display:inline-block"> <input type="checkbox" class="option-input checkbox"  v-model='genres.family'/> Family </div> 
                   <div style="width:150px; display:inline-block"> <input type="checkbox" class="option-input checkbox"  v-model='genres.comedy'/> Comedy </div> 
                   <div style="width:150px; display:inline-block"> <input type="checkbox" class="option-input checkbox"  v-model='genres.action'/> Action </div> 
                   <div style="width:150px; display:inline-block"> <input type="checkbox" class="option-input checkbox"  v-model='genres.history'/> History </div> 
                   <div style="width:150px; display:inline-block" > <input type="checkbox" class="option-input checkbox" v-model='genres.fantasy' /> Fantasy </div> 
                   <div style="width:150px; display:inline-block"> <input type="checkbox" class="option-input checkbox" v-model='genres.romance' /> Romance </div> 
                   <div style="width:150px; display:inline-block"> <input type="checkbox" class="option-input checkbox"  v-model='genres.thriller'/> Thriller </div>
                   <div style="width:150px; display:inline-block"> <input type="checkbox" class="option-input checkbox"  v-model='genres.mystery'/> Mystery </div> 
                   <div style="width:150px; display:inline-block"> <input type="checkbox" class="option-input checkbox" v-model='genres.animation' /> Animation </div> 
                   <div style="width:150px; display:inline-block"> <input type="checkbox" class="option-input checkbox" v-model='genres.adventure' /> Adventure </div> 
                   <div style="width:160px; display:inline-block"> <input type="checkbox" class="option-input checkbox"  v-model='genres.documentary'/> Documentary </div> 
                  
                   
                   <p style="font-size:1rem; text-align:justify;">
                   </p>
                   <hr>
                </div>
             </div>
         <!-- </div> -->
     </div>
 </div>

    </div>
    <div class="d-flex justify-content-end ">
      <button id="a" style="text-decoration:none; background-color:transparent; font-size:15px; color:white; width:100px; margin-top:0.8rem; display:block;" @click="updateProfile(profile)" class="btn6">  SEND  </button>
    </div>
  
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
        best_movie_id_1 : this.profile.best_movie_id_1,
        best_movie_title_1:this.profile.best_movie_title_1,
        best_movie_id_2 : this.profile.best_movie_id_2,
        best_movie_title_2:this.profile.best_movie_title_2,
        best_movie_id_3 : this.profile.best_movie_id_3,
        best_movie_title_3:this.profile.best_movie_title_3,
        
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
      if (!this.best_movie_title_1) {
        this.best_movie_title_1 = item.title
        this.best_movie_id_1 = item.id
        console.log('1번',item,this.best_movie_title_1,this.best_movie_id_1,item.id)
      } 
      else if(!this.best_movie_title_2) {
        console.log('2번',item)
        this.best_movie_title_2 = item.title
        this.best_movie_id_2 = item.id
      }else{
        console.log('3번',item)
        this.best_movie_title_3 = item.title
        this.best_movie_id_3 = item.id
      }
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
        best_movie_id_1 : this.best_movie_id_1,
        best_movie_title_1:this.best_movie_title_1,
        best_movie_id_2 : this.best_movie_id_2,
        best_movie_title_2:this.best_movie_title_2,
        best_movie_id_3 : this.best_movie_id_3,
        best_movie_title_3:this.best_movie_title_3,
      }
      console.log(profileItem,'sdfsdfsdsdsdfsdfsfsfsd')
      axios.put('http://127.0.0.1:8000/community/updateprofile/',profileItem,config)
      .then(res=>{
        console.log(res)
        this.$router.push({name:'Profile'})
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
.word{
  font-family: 'Noto Sans', sans-serif;
  text-transform: uppercase;
}

input::placeholder {
  color: red;
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
    color: #6A16CD;
    font-weight: 700;
}

/* reset input */
.form__field:required, .form__field:invalid {
    box-shadow: none;
}

/* demo
#body {
    font-family: 'Poppins', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    min-height: 100vh;
    font-size: 1.5rem;
    background-color:white;
} */



.mt-100 {
    margin-top: 70px
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
    border-radius: 0;
    
   
    
}

.card .card-body {
    padding: 1.25rem 1.75rem;
}

.card-body {
    flex: 1 1 auto;
    padding: 1.25rem;
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
.card2 {
  /* width:1000px; */
  padding-top:20px;
border: 3px solid #6A16CD;
    border-image: linear-gradient(to right, #6A16CD, #5411A4, #be29ec, #c616cd);
    border-image-slice: 1;

}
.card2 {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    /* background-color: #fff; */
    background-clip: border-box;
    /* border: 1px solid #d2d2dc; */
    /* border-radius: 0; */
    
   
    
}

.card2 .card-body2 {
    padding: 1.25rem 1.75rem;
}

.card-body2 {
    flex: 1 1 auto;
    padding: 1.25rem;
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
    background: #9932cc
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
    background: #9932cc;
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
