import VModal from 'vue-js-modal'
import Notifications from 'vue-notification'
import Vue from 'vue'
import { locale } from 'view-design'
import lang from 'view-design/dist/locale/en-US'
import VTooltip from 'v-tooltip'

// https://www.iviewui.com/docs/guide/i18n-en
locale(lang)

Vue.use(VModal, { dialog: true })
Vue.use(Notifications)
Vue.use(VTooltip)
