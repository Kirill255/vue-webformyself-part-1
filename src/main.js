import 'bootstrap/dist/css/bootstrap.min.css';
import "nprogress/nprogress.css"
import "./assets/css/styles.css";

import Vue from 'vue'
import App from './App.vue'


import { router } from './router';

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
