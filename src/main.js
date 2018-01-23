// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueLocalStorage from 'vue-localstorage'
Vue.use(VueLocalStorage)
Vue.use(Vuetify, {
  theme: {
    primary: 'rgb(49, 146, 179)',
    secondary: 'rgb(231, 100, 37)',
    green: 'rgb(77, 184, 87)',
    error: 'rgb(197, 51, 60)',
    yellow: 'rgb(239, 176, 49)'
  }
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
