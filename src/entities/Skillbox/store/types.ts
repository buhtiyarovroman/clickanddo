import { THashTag } from './../../User/models/common'
import { TInterest } from './../../Interests/models/common'
import { TCategory } from '@/entities/Category/models'

export type TCreateSkillBoxData = {
  id: string
  title: string
  category: Pick<TCategory, 'title' | '_id'>
  interest: Pick<TInterest, 'title' | '_id'>
  hashtag: THashTag[]
  initialPrice: number
  discount?: string
  priceAfterDiscount: number
  duration: string
  expirationDate: Date
  photos: string[]
  description: string
  currency: `${ECurrency}`
  location: number[]
  locationRange: string
  address: string
  hideLikes: boolean
  imageHeight?: number
  imageWidth?: number
}

export type TInitialSpecialOfferState = {
  createSkillBox: TCreateSkillBoxData
  loading: boolean
}

export enum ECurrency {
  USD = 'USD',
  PLN = 'PLN',
  UAH = 'UAH',
  EUR = 'EUR',
}
