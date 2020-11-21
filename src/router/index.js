import Vue from 'vue'
import VueRouter from 'vue-router'
import Community from '@/views/community/Community'
import CreateReview from '@/components/community/CreateReview'
import DetailReview from '@/components/community/DetailReview'
import UpdateReview from '@/components/community/UpdateReview'
import MovieDetail from '@/components/movies/MovieDetail'
import Signup from '@/views/accounts/Signup'
import Login from '@/views/accounts/Login'
import LoadMap from '@/views/profile/LoadMap'
import Home from '@/views/Home'
// import App from '@/App'
import MovieList from '@/views/movie/MovieList'
Vue.use(VueRouter)

const routes = [
  {
    path:'/map',
    name:'LoadMap',
    component:LoadMap
  },
  {
    path:'/community',
    name:'Community',
    component:Community
  },
  {
    path:'/community',
    name:'Community',
    component:Community
  },
  {
    path:'/moviedetail',
    name:'MovieDetail',
    component:MovieDetail,
    props:true
  },
  {
    path:'/movielist',
    name:'MovieList',
    component:MovieList
  },
  {
    path:'/createreview',
    name:'CreateReview',
    component:CreateReview
  },
  {
    path:'/detailreview',
    name:'DetailReview',
    component:DetailReview,
    props: true
  },
  {
    path:'/updatereview',
    name:'UpdateReview',
    component:UpdateReview,
    props: true
  },
  {
    path: '/signup',
    name:'Signup',
    component:Signup
  },
  {
    path: '/login',
    name:'Login',
    component:Login
  },
  {
    path: '/home',
    name:'Home',
    component:Home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
