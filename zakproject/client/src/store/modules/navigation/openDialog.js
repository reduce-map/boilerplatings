const state = {
  open: false
}
const getters = {
  stateDialog(state) {
    return state.open
  },

}
const actions = {
  openDialog(state) {
    state.commit('openDialog')
  },
  closeDialog(state) {
    state.commit('closeDialog')
  },
  closeAllComponents({ dispatch, commit}) {
    commit('navigation/clientaction/closeAllClientComponents',null,{root:true});
    commit('navigation/itemaction/closeAllItemComponents',null,{root:true});
    commit('navigation/subscribeaction/closeAllSubscribeComponents',null,{root:true});
  }
}

const mutations = {
  closeDialog(state) {
    state.open = false
  },
  openDialog(state) {
    state.open = true
  }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
