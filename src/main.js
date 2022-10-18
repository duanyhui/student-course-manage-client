import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

Vue.config.productionTip = false


// axios.defaults.baseURL = 'https://jd.atri.wiki';
// axios.defaults.baseURL = 'https://api.live2d.atri.wiki';
axios.defaults.baseURL = 'http://localhost:1008';
// axios.defaults.baseURL = 'http://192.168.6.15:1008';
//  axios.defaults.baseURL = 'http://124.222.122.147:1008/';

// Vue.prototype.$axios = axios;

// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
    config => {
      if (sessionStorage.getItem('token')) {
        config.headers.token = sessionStorage.getItem('token');
      }
      return config;
    },
);




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
