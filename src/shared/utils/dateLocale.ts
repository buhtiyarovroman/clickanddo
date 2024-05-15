import { enUS, uk } from 'date-fns/locale'

export const dateLocale: Record<string, Locale> = {
  en: {
    ...enUS,
  },
  uk: {
    ...uk,
  },
}
