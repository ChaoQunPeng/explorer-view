import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ConvertAccessPath from './plugin/convertAccessPath' // 引入
Vue.use(ConvertAccessPath) 

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')

// Vue.filters('convertAccessPath', (data) => {
//   debugger
//   const host = Vue.$store.state.host;
//   const d = data.replace("D:\\Movies\\", host);
//   return d;
// });