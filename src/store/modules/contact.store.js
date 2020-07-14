/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */

const state = {
  mailEndpoint: 'https://api.pineapple.net.au/email/landing',
  emailSubject: 'Ultra-Fast Fibre To Your Home',
  emailText: 'Thank you for your interest in Pineapple NET! A member of our team will be in touch shortly.',
  messageForMail: '',
  contactFormFields: {}
}

const getters = {
  pages: (state, getters, rootState) => rootState.pages.filter(item => item !== 'Contact Us'),
  selectors: (state, getters, rootState) => rootState.selectors.filter(item => item !== '#contact'),
  types: (state, getters, rootState) => rootState.fieldTypes,
  validators: (state, getters, rootState) => rootState.validators
}

const mutations = {
  UPDATE_USER_INFO: (state, payload) => { state.contactFormFields[payload.num].value = payload.value },
  UPDATE_EMAIL_SUBJECT: (state, payload) => { state.emailSubject = payload },
  UPDATE_EMAIL_TEXT: (state, payload) => { state.emailText = payload },
  UPDATE_FIELD: (state, payload) => {
    state.contactFormFields[payload.num][payload.prop] = payload.value
  },
  SET_ERROR: (state, payload) => {
    state.contactFormFields[payload.num].error = payload.value
  },
  CLEAR_ALL_FIELDS: (state) => {
    for (const field of state.contactFormFields) {
      field.value = ''
      field.error = false
    }
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
