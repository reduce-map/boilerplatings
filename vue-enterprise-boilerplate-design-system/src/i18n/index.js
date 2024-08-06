import VueI18n from 'vue-i18n'
import Vue from 'vue'
import messages from './locale'

Vue.use(VueI18n)

export default new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages,
})
