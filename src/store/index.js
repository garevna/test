import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    host: 'https://api.pineapple.net.au',
    generalInfoEndpoint: 'https://api.pineapple.net.au/content/general',
    contentEndpoint: 'https://api.pineapple.net.au/content',
    mailEndpoint: 'https://api.pineapple.net.au/email/landing',
    emailSubject: '',
    emailText: 'Thank you for your interest in Pineapple NET! A member of our team will be in touch shortly.',
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    plan: 'residential',
    mainContentHeight: 0,
    footerHeight: 0
  },

  modules,

  getters: {
    pageHeight: (state) => state.mainContentHeight + state.footerHeight - 36
  },

  mutations: {
    UPDATE_MAIN_CONTENT_HEIGHT: (state, payload) => { state.mainContentHeight = payload },
    UPDATE_FOOTER_HEIGHT: (state, payload) => { state.footerHeight = payload },
    UPDATE_EMAIL_SUBJECT: (state, payload) => { state.emailSubject = payload },
    UPDATE_EMAIL_TEXT: (state, payload) => { state.emailText = payload },
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

    async GET_GENERAL_INFO ({ state, commit }) {
      const generalInfo = await (await fetch(state.generalInfoEndpoint)).json()
      for (const field in generalInfo) {
        commit('SET_PROPERTY', {
          object: state,
          propertyName: field,
          value: generalInfo[field]
        })
      }
    }
  }
})
