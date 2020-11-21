<template>
  <div v-if="review">
    <p>CreateReview</p>
    <div>
      <label for="title">Title</label>
      <input type="text" v-model="title" >
    </div>
    <div>
      <label for="movie_title">Movie Title</label>
      <input type="text" v-model="movie_title" id="movie_title">
    </div>
    <div>
      <input type="file"
        id="avatar" name="avatar"
        accept="image/png, image/jpeg"
        ref="myfiles"
        >
    </div>
  <div>
    <label for="number">평점</label>
    <input type="number" id="number" v-model="rank" >
  </div>
  <div>
    <label for="content">내용</label>
    <input type="text" id="content" v-model="content">
  </div>
      <button @click="updateReview(review)">updateReview</button>
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
      files :null,
      title:this.review.title,
      movie_title:this.review.movie_title,
      rank:this.review.rank,
      user:this.review.user,
      content:this.review.content,
      like:this.review.like,
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

</style>