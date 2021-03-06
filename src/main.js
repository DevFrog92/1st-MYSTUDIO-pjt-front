import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Carousel3d from 'vue-carousel-3d';
import StarRating from 'vue-dynamic-star-rating'
Vue.component('star-rating', StarRating);
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(Carousel3d)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
