const state = {
  defaultDialog: {
    addSubscribe: false,
    searchSubscribe: false,
  },

  openDialog: {
    addSubscribe: false,
    searchSubscribe: false,
  }
}
const getters = {
  openAddItem(state) {
    return state.openDialog.addSubscribe
  },
  openSearchItem(state) {
    return state.openDialog.searchSubscribe
  }
}
const actions = {
  openMenuSubscribe(state, payload) {
    state.commit('changeDialog', payload);
  }
}

const mutations = {
  changeDialog(state, payload) {
    const {data} = payload
    const menuState = state.openDialog
    state.openDialog = {...menuState, ...state.defaultDialog, ...data}
  },
  closeAllSubscribeComponents(){
    state.openDialog = {...state.defaultDialog}
  },
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
