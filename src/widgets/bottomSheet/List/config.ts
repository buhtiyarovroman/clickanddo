import { EPublicationType } from '@/entities/Publication/models'
import { ESortType } from './types'

export const sortOptions = [
  { type: ESortType.rating, label: 'rating' },
  { type: ESortType.date, label: 'date' },
  { type: ESortType.activity, label: 'activity' },
]

export const typeOptions = [
  { type: EPublicationType.publication, label: 'publication' },
  { type: EPublicationType.skillbox, label: 'skill_box' },
  { type: EPublicationType.specialOffer, label: 'special_offer' },
]
