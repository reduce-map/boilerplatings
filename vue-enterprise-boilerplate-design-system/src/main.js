import Vue from 'vue'
import App from './app'
import router from '@router'
import store from '@state/store'
import '@components/_globals'
import i18n from './i18n'
import veeValidate from 'vee-validate'
import { locale } from 'iview'
import lang from 'iview/dist/locale/en-US'
// import CSS
import 'material-design-icons/iconfont/material-icons.css'
import 'iview/dist/styles/iview.css'
import 'vue-multiselect/dist/vue-multiselect.min.css'

import underscore from 'underscore'
import deepClone from 'underscore.deepclone'
// Extend Underscore
underscore.mixin(deepClone)
// set language for Iview
locale(lang)

Vue.use(veeValidate)

// Don't warn about using the dev version of Vue in development.
Vue.config.productionTip = process.env.NODE_ENV === 'production'

// If running inside Cypress...
if (window.Cypress) {
    // Ensure tests fail when Vue emits an error.
    Vue.config.errorHandler = window.Cypress.cy.onUncaughtException
}

const app = new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
}).$mount('#app')

// If running inside Cypress...
if (window.Cypress) {
    // Attach the app to the window, which can be useful
    // for manually setting state in Cypress commands
    // such as `cy.logIn()`.
    window.__app__ = app
}
// i18n import on demand
// import(`@/i18n/locale/${window.navigator.language}`).then(msg => {
//     i18n.setLocaleMessage(`${window.navigator.language}`, msg.default)
// })
