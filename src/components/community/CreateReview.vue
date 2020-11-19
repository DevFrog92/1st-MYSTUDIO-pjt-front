<template>
  <div>
    <p>CreateReview</p>
    <div>
      <label for="title">Title</label>
      <input type="text" v-model="title">
    </div>
    <div>
      <label for="movieTitle">Movie Title</label>
      <input type="text" v-model="movieTitle" id="movieTitle">
    </div>
    <div>
      <input type="file"
        id="avatar" name="avatar"
        accept="image/png, image/jpeg"
        ref="myfiles"
        >
        <button @click="sendImage">Send Image</button>
    </div>
  <div>
    <label for="number">평점</label>
    <input type="number" id="number" v-model="rank">
  </div>
  <div>
    <label for="content">내용</label>
    <input type="text" id="content" v-model="content">
  </div>
  <div>
    <label for="user">user</label>
    <input type="text" id="user" v-model="user">
  </div>
      
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
      movieTitle:'',
      rank:0,
      user:'Anonymous ',
      content:'',

    }
  },
  methods:{
    sendImage(){
      // console.log(event.target.data)
      this.files = this.$refs.myfiles.files
      console.log(this.files[0])
      let info = new FormData()
      info.append('files', this.files[0])
      info.append('user',this.user)
      info.append('title',this.title)
      info.append('content',this.content)
      info.append('movieTitle',this.movieTitle)
      info.append('rank',this.rank)
      if (this.files===null){
        info.append('files',[])
      }
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data', // Content-Type을 변경해야 파일이 전송됨
          // 'Authorization': `token ${token}`
          }
      }
      axios.post('http://127.0.0.1:8000/community/analyze_image/',info,config)
      .then(res=>{
        console.log(res.data)
      })
    }
  }
} 
</script>

<style>

</style>