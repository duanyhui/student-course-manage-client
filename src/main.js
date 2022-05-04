import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

Vue.config.productionTip = false


axios.defaults.baseURL='http://192.168.66.88:8080';
// Vue.prototype.$axios = axios;



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
