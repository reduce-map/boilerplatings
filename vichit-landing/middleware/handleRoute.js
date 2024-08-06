export default function ({ store, route }) {
  store.commit('store/setRoute', route.name)
}
