import { TFunction } from 'i18next'
import { ELanguages } from '@/app/i18n'

const LANGUAGES_LIST = [
  {
    value: ELanguages.en,
    label: 'english',
  },
  {
    value: ELanguages.uk,
    label: 'ukrainian',
  },
  {
    value: ELanguages.sk,
    label: 'slovak',
  },
]

export const getLanguages = ({
  t,
  keys,
}: {
  t: TFunction
  keys: () => IterableIterator<number>
}) => {
  return LANGUAGES_LIST.map(el => {
    return {
      ...el,
      label: t(el.label as keyof typeof keys),
    }
  })
}
