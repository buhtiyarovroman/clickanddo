import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { en, uk, sk } from './languages'

import { ELanguages } from './types'

const DEFAULT_LANG = ELanguages.en

export const defaultNS = DEFAULT_LANG
export const resources = {
  en: { translation: en },
  sk: { translation: sk },
  uk: { translation: uk },
}

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  returnNull: false,
  fallbackLng: DEFAULT_LANG,
})

export default i18n
