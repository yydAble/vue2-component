import Vue from 'vue'
import App from './App.vue'
import router from './router'
Vue.config.productionTip = false
import Alert from './components/alert/alert.js'
Vue.prototype.$Alert = Alert
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
