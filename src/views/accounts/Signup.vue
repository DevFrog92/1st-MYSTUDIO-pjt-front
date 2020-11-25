<template>

  <div class="top-div">
    <div>
      <img src="http://127.0.0.1:8000/api/Logo/Logo.png" width="20%" alt="Logo">
    </div>
    <div class="box_signup">
      <form>
        <span class="text-center">Signup</span>
      <div class="input-container_2">
        <input type="text" id="username"  v-model="credentials.username" required=""/>
        <label for="username">ID</label>		
      </div>
      <div class="input-container_2">		
        <input type="password" id="password1" v-model="credentials.password1"  required=""/>
        <label for="password1">PASSWORD</label>
      </div>
      <div class="input-container_2">		
        <input type="password" id="password2" v-model="credentials.password2" @keypress.enter='signup(credentials)' required=""/>
        <label for="password2">PASSWORD CHECK</label>
      </div>
        <span id="a_signup" style="text-decoration:none; color:white; cursor: pointer;" @click="signup(credentials)" click="login(credentials)" class="btn6_login">SIGNUP</span>
    </form>	
    </div>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  name:'Signup',
  data(){
    return {
      credentials:{
        username :'',
        password1 : '',
        password2:''
      }
    }
  },
  methods:{
    signup({username,password1,password2}){
      const userData = {
        username,
        password1,
        password2
      }
      console.log(userData)
      if (password1 === password2){
        axios.post('http://127.0.0.1:8000/rest-auth/registration/',userData)
        .then(()=>{
          this.$router.push({name:'Login'})
        })
        .catch(()=>{
          alert('존재하는 계정입니다.')
          this.$router.push({name:'Login'})

        })
      }else{
        alert('작성된 비밀번호가 다릅니다.')
      }
    }
  },
  created(){
    const token = localStorage.getItem('jwt')
    if (token){
       alert('로그인한 회원은 접근할 수 있습니다.')
      this.$router.push({name:'Home'})
    }
  }
  
}
</script>

<style>


@import url('https://fonts.googleapis.com/css?family=Noto+Sans:400,400i,700,700i&subset=greek-ext');

.top-div{
	bbackground-image: url("http://127.0.0.1:8000/api/background.png");
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
.box_signup{
	position:absolute;
	left:50%;
	top:50%;
	transform: translate(-50%,-50%);
    background-color: rgba(0, 0, 0, 0.89);
	border-radius:3px;
	padding:70px 150px;
}
.input-container_2{
	position:relative;
	margin-bottom:25px;
}
.input-container_2 label{
	position:absolute;
	top:0px;
	left:0px;
	font-size:16px;
	color:#fff;	
  pointer-event:none;
	transition: all 0.5s ease-in-out;
}
.input-container_2 input{ 
  border:0;
  border-bottom:1px solid #555;  
  background:transparent;
  width:100%;
  padding:8px 0 5px 0;
  font-size:16px;
  color:#fff;
}
.input-container_2 input:focus{ 
  border:none;	
  outline:none;
  border-bottom:2px solid #6A16CD;	
  border-image: linear-gradient(to right,#6A16CD, #5411A4, #be29ec,	#c616cd);
  border-image-slice: 1;
}


.input-container_2 input:focus ~ label,
.input-container_2 input:valid ~ label{
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

</style>