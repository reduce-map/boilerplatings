const state = {
  defaultDialog: {
    addClient: false,
    searchClient: false,
  },

  openDialog: {
    addClient: false,
    searchClient: false,
  }
}
const getters = {
  openAddClient(state) {
    return state.openDialog.addClient
  },
  openSearchClient(state) {
    return state.openDialog.searchClient;
  },
  defaultDialog(state) {
    return state.defaultDialog;
  },
}
const actions = {
  openMenuClient(state, payload) {
    state.commit('changeDialog', payload);
  }
}

const mutations = {
  changeDialog(state, payload) {
    const {data} = payload
    const menuState = state.openDialog
    state.openDialog = {...menuState, ...state.defaultDialog, ...data}
  },

  closeAllClientComponents(){
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
