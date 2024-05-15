import { THashTag } from './../../User/models/common'
import { TInterest } from './../../Interests/models/common'
import { TCategory } from '@/entities/Category/models'

export type TCreateSpecialOfferData = {
  id: string
  title: string
  hashtag: THashTag[]
  priceFrom: number
  priceTo: number
  duration: string
  expirationDate: Date
  photos: string[]
  description: string
  currency: `${Currency}`
  imageWidth: number
  imageHeight: number
  address: string
  hideLikes: boolean
}

export type TInitialSpecialOfferState = {
  createSpecialOffer: TCreateSpecialOfferData
  loading: boolean
}

export enum Currency {
  USD = 'USD',
  PLN = 'PLN',
  UAH = 'UAH',
  EUR = 'EUR',
}
