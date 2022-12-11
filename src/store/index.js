import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    host: 'https://api.pineapple.net.au',
    mailEndpoint: 'https://portal.staging.dgtek.net/send-email',
    emailTarget: 'sales@pineapple.net.au',
    browserTabTitle: '',
    emailSubject: '',
    emailText: 'Thank you for your interest in Pineapple NET! A member of our team will be in touch shortly.',
    pages: [],
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    plan: 'residential',
    mainContentHeight: 0,
    footerHeight: 0
  },

  modules,

  getters: {
    generalInfoEndpoint: (state) => `${state.host}/content/general`,
    contentEndpoint: (state) => `${state.host}/content`,
    homeContentEndpoint: (state) => `${state.host}/content/live`,
    pagesEndpoint: (state) => `${state.host}/content/live-pages`,
    mailEndpoint: state => state.mailEndpoint,
    pageHeight: (state) => state.mainContentHeight + state.footerHeight - 36,
    getPagesByPostcode: postcode => state => state.pages.filter(page => page.address.postcode === postcode),
    getPagesByStreetName: streetName => state => state.pages.filter(page => page.address.streetName === streetName),
    getPageByaddress: address => state => state.pages
      .find(page => page.address.postcode === address.postcode && page.address.streetName === address.streetName && page.address.streetNumber === address.streetNumber)
  },

  mutations: {
    UPDATE_MAIN_CONTENT_HEIGHT: (state, payload) => { state.mainContentHeight = payload },
    UPDATE_FOOTER_HEIGHT: (state, payload) => { state.footerHeight = payload },
    UPDATE_BROWSER_TITLE: (state, payload) => { state.browserTabTitle = payload },
    UPDATE_EMAIL_SUBJECT: (state, payload) => { state.emailSubject = payload },
    UPDATE_EMAIL_TEXT: (state, payload) => { state.emailText = payload },
    UPDATE_PAGES: (state, payload) => { state.pages = payload },
    CHANGE_VIEWPORT: (state) => {
      state.viewportWidth = window.innerWidth
      state.viewportHeight = window.innerHeight
    },
    CHANGE_PLAN: (state, plan) => { state.plan = plan },

    SET_PROPERTY: (state, payload) => {
      Vue.set(payload.object, payload.propertyName, payload.value)
    },
    DELETE_PROPERTY: (state, payload) => {
      Vue.delete(payload.object, payload.propertyName)
    }
  },

  actions: {

    async GET_GENERAL_INFO ({ state, getters, commit }) {
      let generalInfo = JSON.parse(localStorage.getItem('generalInfo'))
      if (!generalInfo || Date.now() - generalInfo.modified > 3600000) {
        generalInfo = await (await fetch(getters.generalInfoEndpoint)).json()
        localStorage.setItem('generalInfo', JSON.stringify({
          modified: Date.now(),
          ...generalInfo
        }))
      }
      delete generalInfo.modified
      for (const field in generalInfo) {
        commit('SET_PROPERTY', {
          object: state,
          propertyName: field,
          value: generalInfo[field]
        })
      }
    },

    async GET_COMMON_DATA ({ state, getters, commit }) {
      let commonData = JSON.parse(localStorage.getItem('common-data'))
      if (!commonData || Date.now() - commonData.modified > 3600000) {
        commonData = await (await fetch(getters.homeContentEndpoint)).json()
        const [browserTabTitle, emailSubject, emailText] = commonData
        localStorage.setItem('common-data', JSON.stringify({
          modified: Date.now(),
          browserTabTitle,
          emailSubject,
          emailText
        }))
      }
      commonData = JSON.parse(localStorage.getItem('common-data'))
      delete commonData.modified
      for (const prop in commonData) {
        commit('SET_PROPERTY', {
          object: state,
          propertyName: prop,
          value: commonData[prop]
        })
      }
    },

    async GET_PAGES ({ state, getters, commit }) {
      let { modified, pages } = JSON.parse(localStorage.getItem('live-pages')) || {}
      if (!pages || Date.now() - modified > 1800000) {
        pages = await (await fetch(getters.pagesEndpoint)).json()
        localStorage.setItem('live-pages', JSON.stringify({
          modified: Date.now(),
          pages
        }))
      }
      commit('UPDATE_PAGES', pages.filter(page => !page.hidden))
    }
  }
})
