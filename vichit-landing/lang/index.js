import pages from './config/pages'
import locales from './config/locales'
import getDetectBrowserOption from './config/detect-browser-language'
export default function getI18NConfig() {
  return {
    lazy: true,
    ...getDetectBrowserOption(),
    ...locales(),
    ...pages(),
  }
}
