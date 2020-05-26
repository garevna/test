/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */

const state = {
  userInfo: {
    name: '',
    email: '',
    address: '',
    postcode: '',
    state: '',
    phone: '',
    building: '',
    apptNumber: '',
    promocode: '',
    message: ''
  },
  mailEndpoint: 'https://api.pineapple.net.au/email/landing',
  emailSubject: '',
  emailText: '',
  // states: ['VIC', 'NSW', 'ACT', 'QLD', 'SA', 'WA', 'TAS', 'NT'],
  // buildings: ['Aurora', 'QV1', 'Conservatory'],
  // promocodes: ['FREEINTERNETAURORA', 'FREEINTERNETCONSERVATORY', 'FREEINTERNETQV1'],
  messageForMail: '',
  fieldsToShow: [],
  errors: {
    name: false,
    email: false,
    address: false,
    postcode: false,
    state: false,
    phone: false,
    building: false,
    apptNumber: false,
    promocode: false,
    message: false
  }
}

const getters = {
  pages: (state, getters, rootState) => rootState.pages.filter(item => item !== 'Contact Us'),
  selectors: (state, getters, rootState) => rootState.selectors.filter(item => item !== '#contact')
}

const mutations = {
  UPDATE_USER_INFO: (state, payload) => { state.userInfo[payload.prop] = payload.value },
  UPDATE_EMAIL_SUBJECT: (state, payload) => { state.emailSubject = payload },
  UPDATE_EMAIL_TEXT: (state, payload) => { state.emailText = payload },
  SET_FIELDS_TO_SHOW: (state, payload) => { state.fieldsToShow = payload },
  CREATE_MESSAGE: (state) => {
    const phone = state.userInfo.phone ? `<h4>Phone: ${state.userInfo.phone}</h4>` : ''
    const address = state.userInfo.address ? `<p>Address: ${state.userInfo.address}</p>` : ''
    const postcode = state.userInfo.postcode ? `<p>Postcode: ${state.userInfo.postcode}</p>` : ''
    const __state = state.userInfo.state ? `<p>State: ${state.userInfo.state}</p>` : ''
    const building = state.userInfo.building ? `<p>Building: ${state.userInfo.building}</p>` : ''
    const apptNumber = state.userInfo.apptNumber ? `<p>Appt Number: ${state.userInfo.apptNumber}</p>` : ''
    const promocode = state.userInfo.promocode ? `<p>Promocode: ${state.userInfo.promocode}</p>` : ''
    state.messageForMail = `
      <p>${state.emailText}</p>
      <h3>Your name: ${state.userInfo.name}</h3>
      <h4>Your email: ${state.userInfo.email}</h4>
      ${phone}
      <fieldset>
        <legend>Details:</legend>
        ${address}
        ${postcode}
        ${__state}
        ${building}
        ${apptNumber}
        ${promocode}
      </fieldset>
      <h4>Your message:</h4>
      <p>${state.userInfo.message.split('\n').join('<br>')}</p>
    `
  },
  SET_ERROR: (state, payload) => {
    state.errors[payload.prop] = payload.value
  },
  CLEAR_ALL_FIELDS: (state) => {
    state.userInfo = {
      name: '',
      email: '',
      address: '',
      postcode: '',
      state: '',
      phone: '',
      building: '',
      apptNumber: '',
      promocode: '',
      message: ''
    }
    state.errors = {
      name: false,
      email: false,
      address: false,
      postcode: false,
      state: false,
      phone: false,
      building: false,
      apptNumber: false,
      promocode: false,
      message: false
    }
  }
}

const actions = {

  async SEND_EMAIL ({ state, commit }) {
    let error = state.fieldsToShow.filter(item => !state.userInfo[item]).length > 0
    if (error) return false
    for (const err in state.errors) {
      error = error || state.errors[err]
    }
    if (error) return false
    commit('CREATE_MESSAGE')
    const response = await (await fetch(state.mailEndpoint, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        subject: state.emailSubject,
        email: state.userInfo.email,
        message: state.messageForMail
      })
    })).json()
    commit('CLEAR_ALL_FIELDS')
    return true
  },
  async SEND_SIMPLE_MAIL ({ state }, data) {
    const response = await (await fetch(state.mailEndpoint, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })).json()
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
