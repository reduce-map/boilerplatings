import Vue from 'vue'
import VModal from 'vue-js-modal'

Vue.use(VModal)
Vue.component('RouterLink', {
    template: `<a href="#"><slot></slot></a>`,
})

// import global theme to styleguide
import './src/theme.scss'
