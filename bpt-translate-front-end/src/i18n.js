import Vue from 'vue'
import VueI18n from 'vue-i18n'
import axios from 'axios'
import moment from 'moment'
import { getLocale, setLocale } from '@utils/user-info.js'
import { DEFAULT_LANGUAGE, FALLBACK_LANGUAGE } from '@constants/translations.js'

import { locale as localeIview } from 'view-design'
import viewRu from 'view-design/dist/locale/ru-RU'
import viewEn from 'view-design/dist/locale/en-US'

Vue.use(VueI18n)

const locale = getLocale() || DEFAULT_LANGUAGE
const i18n = new VueI18n({
    fallbackLocale: FALLBACK_LANGUAGE,
})
const loadedLanguages = []

const setI18nLanguage = lang => {
    i18n.locale = lang
    axios.defaults.headers.common['Accept-Language'] = lang
    document.querySelector('html').setAttribute('lang', lang)
    return lang
}

const loadIviewi18n = lang => {
    if (lang === 'ru') {
        localeIview(viewRu)
    } else if (lang === 'en') {
        localeIview(viewEn)
    } else {
        localeIview(viewRu)
    }
}

const loadMomenti18n = lang => {
    let momentLang = ''

    if (lang === 'ru') {
        momentLang = 'ru'
    } else if (lang === 'en') {
        momentLang = 'en-au'
    } else {
        momentLang = 'ru'
    }

    import(
        /* webpackChunkName: "moment-lang-[request]" */ `moment/locale/${momentLang}`
    ).then(() => moment.locale(momentLang))
}

const loadLanguageAsync = lang => {
    // If the same language
    // if (i18n.locale === lang) {
    //     return Promise.resolve(setI18nLanguage(lang))
    // }

    // If the language was already loaded
    if (loadedLanguages.includes(lang)) {
        return Promise.resolve(setI18nLanguage(lang))
    }

    // If the language hasn't been loaded yet

    console.log(lang)

    return import(
        /* webpackChunkName: "lang-[request]" */ `@/lang/${lang}.js`
    ).then(messages => {
        i18n.setLocaleMessage(lang, messages.default)

        setLocale(lang)
        loadIviewi18n(lang)
        loadMomenti18n(lang)

        loadedLanguages.push(lang)

        return setI18nLanguage(lang)
    })
}

loadLanguageAsync(locale)

export { i18n, loadLanguageAsync }
