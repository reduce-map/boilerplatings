import Vue from 'vue'
import router from './router'
import store from './store'

import App from '@/App.vue'

import CheckboxRadio from 'vue-checkbox-radio'
import VTooltip from 'v-tooltip'
import AsyncComputed from 'vue-async-computed'

import { setToken } from '@/api/token'

Vue.use(VTooltip)
Vue.use(AsyncComputed)
Vue.use(CheckboxRadio)

Vue.config.productionTip = false

setToken('MYTESTTOKEN')

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
