import { t } from 'i18next'
import { TLevelData } from './types'

export const levelData: TLevelData[] = [
  {
    title: t('lang_level.base'),
    description: t('lang_level.base_description'),
    value: 1,
  },
  {
    title: t('lang_level.carrier'),
    description: t('lang_level.carrier_description'),
    value: 2,
  },
  {
    title: t('lang_level.conversational'),
    description: t('lang_level.conversational_description'),
    value: 3,
  },

  {
    title: t('lang_level.native'),
    description: t('lang_level.native_description'),
    value: 4,
  },
]
