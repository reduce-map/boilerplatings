import Vue from 'vue'
import App from './app.vue'
import router from '@router'
import store from '@state/store'

import { i18n } from './i18n.js'

import './main.globals.js'
import './vee-validate.js'

// Don't warn about using the dev version of Vue in development.
Vue.config.productionTip = process.env.NODE_ENV === 'production'

new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
}).$mount('#app')
