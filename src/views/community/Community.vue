<template>
  <div>
    <h1>Community</h1>
  <button @click="getReview">Get Review</button>
  <button @click="goToCreate">goToCreate</button>
  <hr>
  <p v-for="review in reviews" :key="review.id">
    <span>{{review.title}}</span>
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
    getReview(){
      axios.get('http://127.0.0.1:8000/community/')
      .then(res=>{
        console.log(res.data)
        for (const r of res.data){
          console.log(r)
          const resItm = {
            ...r,
            img : 'http://127.0.0.1:8000' + r.img
          }
          this.reviews.push(resItm)
        }
        console.log(this.reviews)
      })
    },
    goToCreate () {
      this.$router.push({name:'CreateReview'})
    }
  }
}
</script>

<style>

</style>