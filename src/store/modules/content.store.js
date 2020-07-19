const state = {}

const getters = {
  contentEndpoint: (state, getters, rootState) => rootState.contentEndpoint
}

const mutations = {
  UPDATE_NAV_BUTTONS: (state, payload) => {
    state.mainNavButtons = payload.mainNavButtons
    state.mainNavSectors = payload.mainNavSectors
  }
}

const actions = {
  async GET_PAGE_CONTENT ({ state, getters, commit }, route) {
    const content = await (await fetch(`${getters.contentEndpoint}/${route}`)).json()
    const { mainNavButtons, mainNavSectors, browserTabTitle, emailSubject, emailText, ...rest } = content
    commit('UPDATE_NAV_BUTTONS', { mainNavButtons, mainNavSectors })
    commit('UPDATE_EMAIL_SUBJECT', emailSubject, { root: true })
    commit('UPDATE_EMAIL_TEXT', emailText, { root: true })

    for (const prop in rest) {
      if (Object.keys(rest[prop]).length === 0) continue
      commit('SET_PROPERTY', {
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
