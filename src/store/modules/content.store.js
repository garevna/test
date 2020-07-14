/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */

const state = {
  browserTabTitle: 'Melbourne CBD',
  emailSubject: 'Connect Melbourne CBD',
  emailText: 'Thank you for your interest in Pineapple NET! A member of our team will be in touch shortly.',
  mainNavButtons: [],
  mainNavSectors: [],
  top: null,
  greenSection: null,
  plans: null,
  list: null,
  howToConnect: null,
  testimonials: null,
  faq: null
}

const getters = {
  contentEndpoint: (state, getters, rootState) => `${rootState.host}/content`
}

const mutations = {
  UPDATE_NAV_BUTTONS: (state, payload) => {
    state.mainNavButtons = payload.mainNavButtons
    state.mainNavSectors = payload.mainNavSectors
  },
  UPDATE_ALL: (state, payload) => {
    for (const field in payload) {
      state[field] = payload[field]
    }
  }
}

const actions = {
  async GET_CONTENT ({ getters, commit }, route) {
    const content = await (await fetch(`${getters.contentEndpoint}/${route}`)).json()
    commit('UPDATE_NAV_BUTTONS', { mainNavButtons: content.mainNavButtons, mainNavSectors: content.mainNavSectors })
    commit('contact/UPDATE_EMAIL_SUBJECT', content.emailSubject, { root: true })
    commit('contact/UPDATE_EMAIL_TEXT', content.emailText, { root: true })
    const browserTabTitle = content.browserTabTitle
    for (const field of ['mainNavButtons', 'mainNavSectors', 'browserTabTitle', 'emailSubject', 'emailText']) {
      if (content[field]) delete content[field]
    }
    commit('UPDATE_ALL', content)
    return browserTabTitle
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
