export default function getDetectBrowserOption() {
  return {
    // https://i18n.nuxtjs.org/browser-language-detection/
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root', // recommended
      alwaysRedirect: true, // ??
    },
  }
}
