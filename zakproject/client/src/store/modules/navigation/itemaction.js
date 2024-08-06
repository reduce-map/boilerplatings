const state = {
  defaultDialog: {
    addItem: false,
    searchItem: false,
  },

  openDialog: {
    addItem: false,
    searchItem: false,
  }
}
const getters = {
  openAddItem(state) {
    return state.openDialog.addItem
  },
  openSearchItem(state) {
    return state.openDialog.searchItem;
  }
}
const actions = {
  openMenuItem(state, payload) {
    state.commit('changeDialog', payload);
  }
}

const mutations = {
  changeDialog(state, payload) {
    const {data} = payload
    const menuState = state.openDialog
    state.openDialog = {...menuState, ...state.defaultDialog, ...data}
  },
  closeAllItemComponents(){
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
