<template>
  <div>
    <button @click="createRoadMap">로드맵 생성</button>
    <button @click="requestRoadMap">로드맵 가지고 오기</button>
    <hr>
    <span @click="watchedMovie"><img :src="url" alt=""></span>
    <div v-if="info">
    <p>{{info.howlsmovingcastle}}</p>
    <p>{{info.Kikisdeliveryservice}}</p>
    <p>{{info.spiritedaway}}</p>
    <p>{{info.princessmononoke}}</p>
    <p>{{info.myneighbortotoro}}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'Map',
  data(){
    return {
      url : '',
      info: null
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
    createRoadMap(){
      const config = this.setToken()
      axios.get('http://127.0.0.1:8000/movie/create/',config)
      .then(res=>{
        console.log(res)
      })
    },
    requestRoadMap(){
      const config = this.setToken()
      axios.get('http://127.0.0.1:8000/movie/',config)
      .then(res=>{
        console.log(res)
        this.info = res.data.data
        console.log(this.info)
        if (res.data.url !== ''){
          this.url = res.data.url
        }
      })
    },
    watchedMovie (){
      const config = this.setToken()
      const test = new FormData()
      test.append('howlsmovingcastle','True')
      console.log(test)
      axios.post('http://127.0.0.1:8000/movie/watch/',test,config)
      .then(res=>{
        console.log(res)
      })
    }
  }
}
</script>

<style>

</style>