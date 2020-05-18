import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { translations } from 'src/i18n'

Vue.use(VueI18n)

const i18n = new VueI18n(translations)

export default ({ app }) => {
  app.i18n = i18n
}

export { i18n }
