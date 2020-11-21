<template>
  <div v-if="review">
    <h1>Detail</h1>
    <span @click="edit(review)">{{review}}</span>
    <button @click="deleteReview(review)">DELETE</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name:'DetailReview',
  props:{
    review :{
      type :Object,
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
    edit(review){
      this.$router.push({name:'UpdateReview',params: {review}})
    },
    deleteReview(review){
      const config = this.setToken()
      axios.delete(`http://127.0.0.1:8000/community/${review.id}/`,config)
      .then(res=>{
        console.log(res)
        this.$router.push({name:'Community'})
        // this.$emit('deletetodo')
      })
      .catch(err=>{
        console.log(err)
      })
    },
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