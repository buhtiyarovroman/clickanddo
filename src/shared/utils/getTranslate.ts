import { TTranslateValue } from '@/entities/Category/models'
import i18next from 'i18next'

export const getTranslate = (value: TTranslateValue[]) => {
  return (
    value.find(el => el.lang === i18next.language)?.value ||
    value[0]?.value ||
    ''
  )
}
