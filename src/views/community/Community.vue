<template>
  <div>
    <h1>Community</h1>
  <button @click="goToCreate">goToCreate</button>
  <hr>
  <p v-for="review in reviews" :key="review.id">
    <span @click="detail(review)">{{review.title}}</span>
    <img :src='review.img' :alt="imagePath">
    
  </p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'Community',
  components:{
  },
  data(){
    return {
      reviews :[],
      imagePath:'',
      
    }
  },
  methods:{
    setToken(){
      const token = localStorage.getItem('jwt')
      const config = {
        headers: {
          Authorization:`JWT ${token}`
        }
      }
      return config
    },
    getReview(){
      this.reviews = []
      const config = this.setToken()
      axios.get('http://127.0.0.1:8000/community/',config)
      .then(res=>{
        for (const r of res.data){
          const resItm = {
            ...r,
            img : 'http://127.0.0.1:8000' + r.img
          }
          this.reviews.push(resItm)
        }
        console.log(res.data)
      })
    },
    goToCreate () {
      const token = localStorage.getItem('jwt')
      if (token){
        this.$router.push({name:'CreateReview'})
      }else{
        alert('로그인한 회원만 접근할 수 있습니다.')
        this.$router.push({name:'Home'})
      }
    },
    detail(review){
      this.$router.push({name:'DetailReview',params: {review}})
    }
  },
  created(){
    const token = localStorage.getItem('jwt')
    if (token){
    this.getReview()
    }else{
      alert('로그인한 회원만 접근할 수 있습니다.')
      this.$router.push({name:'Home'})
    }
  }
}
</script>

<style>

</style>