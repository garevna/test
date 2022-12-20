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

Vue.prototype.getAddressBarStringByPageId = function (id) {
  const pages = this.$store.state.pages
  const page = pages.find(page => page.id === id)
  if (!page) return 'live'
  const { streetNumber, streetName, city, state, postcode } = page.address
  return `${streetNumber}_${streetName.split(' ').join('-')}_${city}_${state}_${postcode}`
}

Vue.prototype.getPageIdByAddressBarString = function (addressBar) {
  const pages = this.$store.state.pages
  const adresses = pages.map(page => page.address)
  const [number = '', street = '', city = '', state = '', postcode = ''] = addressBar.toString().split('_')
  const streetName = street.split('-').join(' ')
  const index = adresses
    .findIndex(address => address.streetNumber === number && address.streetName === streetName && address.city === city && address.state === state && address.postcode === postcode)
  return index < 0 ? null : pages[index].id
}

Vue.config.errorHandler = (err, vm, info) => {
  console.warn(err)
  console.warn(vm)
  console.warn(info)
  // err: error trace
  // vm: component in which error occured
  // info: Vue specific error information such as lifecycle hooks, events etc.

  // TODO: Perform any custom logic or log to server
}

window.onerror = function(message, source, lineno, colno, error) {
  console.warn(message)
  console.warn(source)
  console.warn(lineno, colno)
  console.warn(error)
}

const vue = new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
