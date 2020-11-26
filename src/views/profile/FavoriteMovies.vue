<template>
  <div>
    <button @click='readAllFavorite'>readAllFavorite</button>







<div class="">
      <stack
              :column-min-width="300"
              :gutter-width="15"
              :gutter-height="15"
              monitor-images-loaded
      >
        <stack-item
                v-for="(image, i) in favorite_list"
                :key="i"
                style="transition: transform 300ms"
        >
        
        <!-- <div class="m-3"> -->
<!-- 
                <div class="container" id="card-movies-you">
              <div class="cellphone-container">    
                  <div class="movie " style="margin:100px">       
                    <div class="menu"><i class="material-icons"></i></div>
                    <div class="movie-img"></div>
                    <div class="text-movie-cont">
                      <div class="mr-grid">
                        <div class="col1">
                          <h1>Interstellar</h1>
                          <ul class="movie-gen">
                            <li>PG-13  /</li>
                            <li>2h 49min  /</li>
                            <li>Adventure, Drama, Sci-Fi,</li>
                          </ul>
                        </div>
                      </div>
                      <div class="mr-grid summary-row">
                        <div class="col2">
                          <h5>SUMMARY</h5>
                        </div>
                        <div class="col2">
                          <ul class="movie-likes">
                            <li><i class="material-icons">&#xE813;</i>124</li>
                            <li><i class="material-icons">&#xE813;</i>3</li>
                          </ul>
                        </div>
                      </div>
                      <div class="mr-grid">
                        <div class="col1">
                          <p class="movie-description">A group of elderly people are giving interviews about having lived in a climate of crop blight and constant dust reminiscent of The Great 
                          Depression of the 1930's. The first one seen is an elderly woman stating her father was a farmer, but did not start out that way. </p>
                        </div>
                      </div>
                      <div class="mr-grid actors-row">
                        <div class="col1">
                          <p class="movie-actors">Matthew McConaughey, Anne Hathaway, Jessica Chastain</p>
                        </div>
                      </div>
                      <div class="mr-grid action-row">
                        <div class="col2"><div class="watch-btn"><h3><i class="material-icons">&#xE037;</i>WATCH TRAILER</h3></div>
                        </div>
                        <div class="col6 action-btn"><i class="material-icons">&#xE161;</i>
                        </div>
                        <div class="col6 action-btn"><i class="material-icons">&#xE866;</i>
                        </div>
                        <div class="col6 action-btn"><i class="material-icons">&#xE80D;</i>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
        </div> -->
          <div class="wrapper">
	<div class="main_card">
		<div class="card_left">
			<div class="card_datails">
				<h1>Mission: Impossible – Fallout</h1>
				<div class="card_cat">
					<p class="PG">PG - 13</p>
					<p class="year">2018</p>
					<p class="genre">Action | Adventure </p>
					<p class="time">2h 28m</p>
				</div>
				<p class="disc">Ethan Hunt and his IMF team, along with some familiar allies, race against time after a mission gone wrong.</p>
				<a href="https://www.imdb.com/title/tt4912910/" target="_blank">Read More</a>
			<div class="social-btn">
        <!-- WATCH TRAILER-->
				<button>
					<i class="fas fa-play"></i> SEE TRAILER
				</button>
				<!-- GET-->
				<button>
					<i class="fas fa-download"></i> DOWNLOAD
				</button>
				<!--USERS RATINGS-->
				<button>
					<i class="fas fa-thumbs-up"></i> 97%
				</button>
				<!--BOOKMARK-->
				<button>
					<i class="fas fa-star"></i>
				</button>
			</div>	
			</div>
		</div>
		<div class="card_right">
			<div class="img_container">
				<img src="https://upload.wikimedia.org/wikipedia/en/f/ff/MI_%E2%80%93_Fallout.jpg" alt="">
				</div>
				<div class="play_btn">
					<a href="https://www.imdb.com/title/tt4912910/" target="_blank">
						<i class="fas fa-play-circle"></i>
					</a>
				</div>
			</div>
		</div>
	</div>



<!-- FOLLOW -->
<a class="Follow" href="https://codepen.io/ZaynAlaoudi/" target="blank_"></a>



          <!-- <img :src="image.poster_path" :alt="image.alt_description" /> -->
        </stack-item>
      </stack>
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


#pinterest .container { 
    width: 80vw; 
    margin: 0 auto; 
} 

#card-movies-you img { 
    width: 100%; 
    height: auto; 
    border-radius: 12px; 
}
#pinterest #card-movies-you { 
    width: 100%; 
    height: auto; 
    border-radius: 12px;
    
}


</style>