import Vue from 'vue'
import VModal from 'vue-js-modal'

Vue.use(VModal)
Vue.component('RouterLink', {
    template: `<a><slot></slot></a>`,
})
