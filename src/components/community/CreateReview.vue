<template>
  <div>
    <p>CreateReview</p>
    <div>
      <label for="title">Title</label>
      <input type="text" v-model="title">
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
    <input type="number" id="number" v-model="rank">
  </div>
  <div>
    <label for="content">내용</label>
    <input type="text" id="content" v-model="content">
  </div>
  <button @click="sendImage">Submit</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CreateView',
  data() {
    return {
      files :null,
      title:'',
      movie_title:'',
      rank:0,
      content:'',
      like:0,

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
    sendImage(){
      const config = this.setToken()
      this.files = this.$refs.myfiles.files
      let info = new FormData()
      info.append('title',this.title)
      info.append('movie_title',this.movie_title)
      info.append('rank',this.rank)
      info.append('content',this.content)
      info.append('like_users', this.like)
      if (this.files===null){
        info.append('files',[])
      }
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

<style>

</style>