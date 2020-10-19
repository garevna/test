const state = {
  mainNavButtons: [],
  mainNavSectors: []
}

const getters = {
  contentEndpoint: (state, getters, rootState, rootGetters) => rootGetters.contentEndpoint
}

const mutations = {
  CLEAR_STORAGE: (state) => {
    state = {
      mainNavButtons: [],
      mainNavSectors: []
    }
  },
  UPDATE_NAV_BUTTONS: (state, payload) => {
    state.mainNavButtons = Object.assign([], payload.mainNavButtons)
    state.mainNavSectors = Object.assign([], payload.mainNavSectors)
  }
}

const actions = {
  async GET_PAGE_CONTENT (context, route) {
    context.commit('CLEAR_STORAGE')
    let content = JSON.parse(localStorage.getItem(route))
    if (!content || Date.now() - content.modified > 3600000) {
      content = await (await fetch(`${context.getters.contentEndpoint}/${route}`)).json()
      delete content.pages
      localStorage.setItem(route, JSON.stringify({
        modified: Date.now(),
        ...content
      }))
    }
    delete content.modified
    const {
      mainNavButtons,
      mainNavSectors,
      browserTabTitle,
      emailSubject,
      emailText,
      ...rest
    } = content
    context.commit('UPDATE_NAV_BUTTONS', { mainNavButtons, mainNavSectors })
    if (browserTabTitle) context.commit('UPDATE_BROWSER_TITLE', browserTabTitle, { root: true })
    if (emailSubject) context.commit('UPDATE_EMAIL_SUBJECT', emailSubject, { root: true })
    if (emailText) context.commit('UPDATE_EMAIL_TEXT', emailText, { root: true })

    for (const prop in rest) {
      if (!rest[prop] || Object.keys(rest[prop]).length === 0) continue
      context.commit('SET_PROPERTY', {
        object: state,
        propertyName: prop,
        value: rest[prop]
      }, { root: true })
    }

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
