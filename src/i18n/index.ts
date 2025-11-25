import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import it from './locales/it.json'

// Detect browser language
const getBrowserLocale = (): string => {
  const navigatorLocale = navigator.language || (navigator as any).userLanguage
  
  // Extract the language code (e.g., 'en' from 'en-US', 'it' from 'it-IT')
  const languageCode = navigatorLocale.split('-')[0]
  
  // Check if we have translations for this language
  const supportedLocales = ['en', 'it']
  return supportedLocales.includes(languageCode) ? languageCode : 'en'
}

const i18n = createI18n({
  legacy: false,
  locale: getBrowserLocale(),
  fallbackLocale: 'en',
  messages: {
    en,
    it,
  },
})

export default i18n
