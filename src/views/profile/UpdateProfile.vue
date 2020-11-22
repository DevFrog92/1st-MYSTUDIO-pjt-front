<template>
  <div v-if="profile">
    <h1>UpdateProfile</h1>
     <div>
      <label for="description">Description</label>
      <input type="text" v-model="description" >
    </div>
     <div>
      <label for="nickname">NickName</label>
      <input type="text" v-model="nickname" >
    </div>
    <div>
      <p>선호하는 장르 선택</p>
      <label for="genre">드라마</label>
      <input type="checkbox" value="1" v-model="genres.drama">
      <label for="genre">액션</label>
      <input type="checkbox" value="19" v-model="genres.actions">
      <label for="genre">판타지</label>
      <input type="checkbox" value="2" v-model="genres.fantasy">
      <label for="genre">애니메이션</label>
      <input type="checkbox" value="15" v-model="genres.animation">
      <label for="genre">공포</label>
      <input type="checkbox" value="4" v-model="genres.horo">
      <label for="genre">로멘스</label>
      <input type="checkbox" value="5" v-model="genres.romanse">
    </div>
    <button @click="updateProfile(profile)">Send</button>
  </div>
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
        description : this.profile.description,
        nickname: this.profile.nickname,
        genres :{
          drama : null,
          actions:null,
          fantasy:null,
          animation:null,
          horo:null,
          romanse:null
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
    updateProfile(profile){
      const config = this.setToken()
      let genreItem = ''
      for (const [key,value] of Object.entries(this.genres)){
        if (value){
          genreItem += `${key}/`
        }
      }
      console.log(genreItem)

      const profileItem = {
        ...profile,
        description : this.description,
        nickname : this.nickname,
        genre : genreItem
      }
      console.log(profileItem)
      axios.put('http://127.0.0.1:8000/community/updateprofile/',profileItem,config)
      .then(res=>{
        console.log(res)
      })
    }
  }


}
</script>

<style>

</style>