/* eslint-disable */

import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import 'pineapple-styles/css/fonts.scss'
import 'pineapple-styles/css/variables.scss'

Vue.config.productionTip = false

const vue = new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
