const state = {
  notVisible: {
    menuClient: false,
    menuItem: false,
    menuSubscribe: false
  },

  visible: {
    menuClient: true,
    menuItem: false,
    menuSubscribe: false
  }
}
const getters = {
  visibleMenu(state) {
    return state.visible
  },
}
const actions = {
  changeVisibleMenu(state, payload) {
    state.commit('changeVisibleMenu', payload);
  }
}

const mutations = {
  changeVisibleMenu(state, payload) {
    const {data} = payload
    const menuState = state.visible
    state.visible = {...menuState, ...state.notVisible, ...data}
  }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
