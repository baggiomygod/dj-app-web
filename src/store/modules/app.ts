const state: Store.IApp = {
  token: ''
}

const mutations = {
  SET_TOKEN: (state: Store.IApp, token: string) => {
    state.token = token
  }
}

const actions = {
  setTokenAction({ commit }: any, token: string) {
    commit('SET_TOKEN', token)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
