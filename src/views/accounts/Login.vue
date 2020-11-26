<template>

  <div class="top-div">
    <div class="box_login">
      <form>
        <span class="text-center">login</span>
      <div class="input-container">
        <input type="text" id="username"  v-model="credentials.username" required=""/>
        <label for="username">ID</label>		
      </div>
      <div class="input-container">		
        <input type="password" id="password" v-model="credentials.password" @keypress.enter='login(credentials)' required=""/>
        <label for="password">PASSWORD</label>
      </div>
        <span id="a_login" style="text-decoration:none; color:white; cursor: pointer;" @click="login(credentials)" class="btn6_login">LOGIN</span>
        
        <span id="a_signup" style="text-decoration:none; color:white; cursor: pointer;" @click="signup(credentials)" class="btn6_login">SIGNUP</span>
    
    </form>	
    </div>
  </div>

</template>

<script>
import axios from 'axios'

export default {
  name:'Login',
  data(){
    return {
      credentials :{
        username : '',
        password : ''
      }
    }
  },
  methods:{
    login({username,password}){
      axios.post('http://127.0.0.1:8000/rest-auth/login/',{username,password})
      .then(res=>{ 
        console.log(res.data)
        console.log(res.data.user.username)
        localStorage.setItem('jwt',res.data.token)
        this.$emit('login')
        this.$router.push({name:'MovieList'})
        this.$store.dispatch('login',res.data.user.username)
      })
      .catch(err=>{
        alert('존재하지 않는 사용자 입니다. 회원가입 후 이용해 주세요.')
        console.log(err,'error 다 임마')
        this.$router.push({name:'Signup'})
      })
    },
    signup(){
      this.$router.push({name:'Signup'})
    }
  },
  created(){
    const token = localStorage.getItem('jwt')
    if (token){
       alert('로그인한 회원은 접근할 수 없습니다')
      this.$router.push({name:'MovieList'})
    }
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css?family=Noto+Sans:400,400i,700,700i&subset=greek-ext');

.top-div{
	background-image: url("http://127.0.0.1:8000/api/background.png");
	background-position: center;
    background-origin: content-box;
    background-repeat: no-repeat;
    background-size: cover;
	min-height:100vh;
	font-family: 'Noto Sans', sans-serif;
}
.text-center{
	color:#fff;	
	text-transform:uppercase;
    font-size: 25px;
    margin: -23px 0 70px 0;
    display: block;
    text-align: center;
}
.box_login{
	position:absolute;
	left:50%;
	top:50%;
	transform: translate(-50%,-50%);
    background-color: rgba(0, 0, 0, 0.89);
	border-radius:3px;
	padding:70px 100px;
}
.input-container{
	position:relative;
	margin-bottom:25px;
}
.input-container label{
	position:absolute;
	top:0px;
	left:0px;
	font-size:16px;
	color:#fff;	
  pointer-event:none;
	transition: all 0.5s ease-in-out;
}
.input-container input{ 
  border:0;
  border-bottom:1px solid #555;  
  background:transparent;
  width:100%;
  padding:8px 0 5px 0;
  font-size:16px;
  color:#fff;
}
.input-container input:focus{ 
  border:none;	
  outline:none;
  border-bottom:2px solid #6A16CD;	
  border-image: linear-gradient(to right,#6A16CD, #5411A4, #be29ec,	#c616cd);
  border-image-slice: 1;
}


.input-container input:focus ~ label,
.input-container input:valid ~ label{
	top:-12px;
	font-size:12px;
	
}


#a_login {
    width: 100px;
    height:40px;
    padding: 10px 0px 2px 2px;
    font-size: 12px;
    display: inline-block;
    margin: 20px;
    
}

.btn6_login, .btn6_login:link, .btn6_login:visited {
    padding: 13px 0;
    border: 1px solid #6A16CD;
    color: #6A16CD;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 2px;
    transition: all .2s ease-in-out;
}

.btn6_login:hover, .btn6_login:link:hover, .btn6_login:visited:hover {
    background: linear-gradient(100deg,#6A16CD,#c616cd);
    border: 1px solid #6A16CD;
    color: #fefefe;
    border-radius: 30px;
}


#a_signup {
    width: 100px;
    height:40px;
    padding: 10px 0px 2px 2px;
    font-size: 12px;
    display: inline-block;
    margin: 20px ;
}
</style>