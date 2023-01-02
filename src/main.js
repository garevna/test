/* eslint-disable */

import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import 'pineapple-styles/css/fonts.scss'
import 'pineapple-styles/css/variables.scss'

import {
  getAddressBarStringByPageId,
  getPageIdByAddressBarString,
  serviceWorkerConfig
} from './helpers'

Vue.config.productionTip = false

Object.assign(Vue.prototype, {
  getAddressBarStringByPageId,
  getPageIdByAddressBarString,
  serviceWorkerConfig
})

Vue.config.errorHandler = (err, component, info) => {
  console.warn(err, '\n', component, '\n', info)
  // Perform any custom logic or log to server
}

window.onerror = function(message, source, lineno, colno, error) {
  console.warn(message, '\n', source, '\n', lineno, colno, '\n', error)
}

const vue = new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
